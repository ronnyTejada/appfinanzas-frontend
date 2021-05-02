import Vue from "vue";
const moment = require("moment");
import Cookies from 'js-cookie'
import { ApiService } from "./api";
const shortid = require("shortid");


import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    dialogCart: false,
    dialogGramos: false,
    itemSelected: {},
    historialVentas: [],
    deudas: [],
    categories: ['todos'],
    user: Cookies.get('token'),
    negocios: [],
    negocioSelected: null,
    dialogNewNeg: false,
    dialogNegocios: false,
    items: [],
    clientes: [],
    masVendidos: [],
    topClientes: []
  },
  getters: {
    isUserLogged(state) {
      if (state.user) {
        return state.user
      } else {
        return null
      }
    }
  },
  mutations: {
    setUser(state, token) {
      state.user = token
      console.log(state.user)

    },
    setNegocios(state, token) {
      ApiService.getNegocios(token).then((res) => {
        //  this.$store.state.negocios = [];
        res.data.map((n) => {
          state.negocios.push(n);
        });
        if (state.negocios.length === 0) {
          state.dialogNewNeg = true;
        }
        console.log(state.negocios)
        state.negocioSelected = state.negocios.filter(n=>n.selected===true);
        state.negocioSelected=state.negocioSelected[0]
        state.negocioSelected.img = `https://ui-avatars.com/api/?name=${state.negocioSelected.name.replace(
          " ",
          "+"
        )}`;


        ApiService.getAllProducts(state.negocioSelected.id).then(
          (res) => {
            res.data.map((p) => {
              let aux = state.items.filter(
                (item) => item.id === p.id
              );
              if (aux.length === 0) {
                state.items.push(p);
                let aux = p.category.split(" ");
                aux.map((c) => {
                  if (!state.categories.includes(c)) {
                    state.categories.push(c);
                  }
                });

                return;
              }
            });
          }
        );

        ApiService.getPedidosFromHistory(
          state.negocioSelected.id
        ).then(async (res) => {
          state.historialVentas = [];
          res.data.map(p => {
            if (p.pagado) {
              state.historialVentas.push(p)

            } else {
              state.deudas.push(p)

            }
          })
          state.historialVentas.map(i => {
            let existeI = false
            let existeC = false

            state.masVendidos.map(item => {
              if (item.id === i.id && item.fecha === i.fecha) {
                item.ventas += i.cantidadToCart

                existeI = true
              }

            })
            state.topClientes.map(c => {
              if (c.ci === i.cliente&& i.fecha === c.fecha) {
                c.compras += 1
                existeC = true
              }
            })
            if (!existeI) {
              state.masVendidos.push(i)
            }
            if (!existeC) {
              state.topClientes.push({ ci: i.cliente, compras: 1, fecha: i.fecha })
            }
          })
        });

        ApiService.getClientes(state.negocioSelected.id).then(res => {
          res.data.map(cliente => {
            state.clientes.push(cliente)
            console.log(state.clientes)
          })
        })
      });



    },
    itemToCart(state, item) {
      let existe = false

      console.log(item)
      state.cart.map(i => {
        if (i.id === item.id && i.unidad === item.unidad) {
          if(i.byFraccion){
            i.cantidadToCart += item.cantidadToCart 
            
          }else{
            i.cantidadToCart += 1
            item.cantidadExistente -= 1
          }
          i.subtotal += parseInt(item.price)
         
          existe = true
        }
      })
      if (!existe) {
        item.subtotal = parseInt(item.price)
        state.cart.push(item)
        item.cantidadExistente -= 1
      }



    },
    pedidoToHistory(state, data) {
      data.items.map(i => {
        i.fecha = moment().format('L');
        i.negocioId = state.negocioSelected.id
        i.pagado = data.pagado
        i.cliente = data.cliente
        i.id = shortid.generate()
        console.log(i)
        if (i.pagado) {
          // let existe=false
          if(i.byFraccion){
            i.ventas+=1
          }else{
            i.ventas += i.cantidadToCart

          }
          state.historialVentas.push(i)

        } else {
          state.deudas.push(i)
        }

      })
      state.cart = []
      ApiService.pedidoToHistory(data.items).then(res => {
        console.log(res)
      })
    },
    saveCliente(state, cliente) {
      let aux = state.clientes.filter(c => c.id === cliente.id)
      if (aux.length === 0) {
        state.clientes.push(cliente)
      } else {
        aux = cliente
      }

      ApiService.postCliente(cliente).then(res => {
        console.log(res)
      })
    },
    cleanState(state) {
        state.cart = []
        state.dialogCart = false
        state.dialogGramos = false
        state.itemSelected = {}
        state.historialVentas = []
        state.deudas = []
        state.categories = ['todos']
        state.items = []
        state.clientes = []
        state.masVendidos = []
        state.topClientes = []

    }

  }
})