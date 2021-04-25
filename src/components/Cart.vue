<template>
  <v-row justify="center">
    <v-dialog v-model="$store.state.dialogCart" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="$store.state.cart.length === 0"
            >Su carrito esta vacio</span
          >

          <span class="headline" v-if="$store.state.cart.length > 0"
            >Carrito</span
          >
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="$store.state.cart"
          :page.sync="page"
          :items-per-page="10"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.cantidadToCart="{ item }">
            <span>{{ item.cantidadToCart + " " + item.unidad }} </span>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="red" @click="deleteItem(item)"
              >mdi-trash-can-outline</v-icon
            >
          </template>
        </v-data-table>
        <div class=" " style="margin-left: 10px; margin-top: 10px">
          <span
            ><strong> Total:{{ total }} Bs </strong></span
          >
        </div>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="$store.state.dialogCart = false"
          >
            Cerrar
          </v-btn>
          <v-btn color="green darken-1" text @click="showDetalles">
            Procesar Pedido
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogCliente" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Detalles de Compra</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Cedula" v-model="ciCliente" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Nombre" v-if="!clienteExistente" v-model="nombreCliente" required>{{clienteExistente}}</v-text-field>
                <v-text-field label="Nombre" v-else v-model="clienteExistente.name" required>{{clienteExistente}}</v-text-field>
              
              </v-col>

              <v-radio-group v-model="status" row>
                <v-radio label="Pagado" :value="true"></v-radio>
                <v-radio label="Deuda" :value="false"></v-radio>
              </v-radio-group>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogCliente=false">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="procesarPedido">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Swal from "sweetalert2";
const shortid = require("shortid");

export default {
  name: "Cart",
  data: () => ({
    dialog: true,
    page: 1,
    pageCount: 0,
    dialogCliente: false,
    ciCliente: null,
    nombreCliente: null,
    status:null,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "cantidad", value: "cantidadToCart" },
      { text: "Precio", value: "price" },
      { text: "Sub-total", value: "subtotal" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    total() {
      var total = 0;
      this.$store.state.cart.map((i) => {
        total += parseInt(i.subtotal);
      });
      return total;
    },
    clienteExistente(){
       
       let cliente = this.$store.state.clientes.filter(c=>c.ci.includes(this.ciCliente))
       if(cliente[0]){
         return cliente[0]
       }else{
         return ''
       }
    }
  },
  methods: {
    showDetalles() {
      this.dialogCliente = true;

     
    },
    procesarPedido(){
      var cliente
      if(this.clienteExistente){
        cliente=this.clienteExistente
      }else{
        cliente={
           id: shortid.generate(),
           name:this.nombreCliente,
           ci:this.ciCliente,
           compras:[],
           negocioId:this.$store.state.negocioSelected.id
        }
      }

      this.$store.state.cart.map(i=>{
        cliente.compras.push(i)
      })

     

      this.$store.commit("pedidoToHistory", {items:this.$store.state.cart, cliente:cliente.ci,pagado:this.status});
      this.$store.commit("saveCliente",cliente)
      this.$store.state.dialogCart = false;
      this.dialogCliente=false
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pedido Procesado Correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(cliente)
    },
    deleteItem(item) {
      console.log(item);
      Swal.fire({
        title: `Eliminar ${item.title}`,

        showCancelButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Eliminado", "", "success");
          this.$store.state.cart = this.$store.state.cart.filter(
            (i) => i.id !== item.id
          );
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
  mounted() {
    console.log(this.$store.state.cart);
  },
};
</script>