import Vue from "vue";
const moment = require("moment");
import Cookies from 'js-cookie'
import { ApiService } from "./api";


import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    dialogCart: false,
    dialogGramos: false,
    itemSelected: {},
    historialVentas: [],
    categories: ['todos'],
    user: Cookies.get('token'),
    negocios: [],
    negocioSelected: null,
    dialogNewNeg: false,
    dialogNegocios: false,
    items: [],
    clientes: [{ id: '001', name: 'ronny tejada', ci: '24173955', compras: [] }, { id: '002', name: 'rihanna', ci: '123456', compras: [] }, { id: '003', name: 'neymar', ci: '6789', compras: [] }]

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
        state.negocioSelected = state.negocios[0];
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
      });



    },
    itemToCart(state, item) {
      let existe = false

      console.log(item)
      state.cart.map(i => {
        if (i.id === item.id && i.unidad === item.unidad) {
          i.cantidadToCart += parseInt(item.cantidadToCart)
          i.subtotal += parseInt(item.price)
          item.cantidadExistente -= 1
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
        i.fecha = moment().format("l");
        i.negocioId = state.negocioSelected.id
        i.pagado=data.pagado
        i.cliente=data.cliente
        state.historialVentas.push(i)

      })
      state.cart = []
      ApiService.pedidoToHistory(data.items).then(res => {
        console.log(res)
      })
    },
    saveCliente(state, cliente){
      let aux = state.clientes.filter(c=>c.id===cliente.id)
      if(aux.length===0){
        state.clientes.push(cliente)
      }else{
        aux = cliente
      }

      ApiService.postCliente(cliente).then(res=>{
        console.log(res)
      })
    }

  }
})