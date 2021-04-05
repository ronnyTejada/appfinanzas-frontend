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
          <v-btn color="green darken-1" text @click="procesarPedido">
            Procesar Pedido
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Swal from "sweetalert2";

export default {
  name: "Cart",
  data: () => ({
    dialog: true,
    page: 1,
    pageCount: 0,

    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "cantidadToCart", value: "cantidadToCart" },
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
  },
  methods: {
    procesarPedido() {
      this.$store.commit("pedidoToHistory", this.$store.state.cart);
      this.$store.state.dialogCart = false;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pedido Procesado Correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    deleteItem(item) {
      console.log(item)
      Swal.fire({
        title: `Eliminar ${item.title}`,
       
        showCancelButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Eliminado", "", "success");
          this.$store.state.cart=this.$store.state.cart.filter(i=>i.id!==item.id)
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