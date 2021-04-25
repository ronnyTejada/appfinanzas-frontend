<template>
  <v-container
    style="padding: 25px; background-color: #eeeeee; height: 100%"
    fluid
  >
    <v-row>
      <span style="color: gray; margin-bottom: 15px">DEUDAS POR COBRAR</span>

      <v-card width="1000px">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="$store.state.deudas" :search="search">
          <template v-slot:item.cantidadToCart="{ item }">
            <span>{{ item.cantidadToCart + "" + item.unidad }} </span>
          </template>
          <template v-slot:item.subtotal="{ item }">
            <span>{{ item.subtotal + "Bs" }} </span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon @click="procesarPago(item)" color="green">
              mdi-cash-check</v-icon
            >
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>

import Swal from "sweetalert2";
import { ApiService } from '../api';

export default {
  name: "Deudas",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Cliente",
        align: "start",
        sortable: false,
        value: "cliente",
      },
      {
        text: "Fecha",

        sortable: false,
        value: "fecha",
      },
      {
        text: "Articulo",
        sortable: false,
        value: "title",
      },
      { text: "cantidad", value: "cantidadToCart" },
      { text: "Sub-total", value: "subtotal" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  
  methods: {
    procesarPago(item) {
      Swal.fire({
        title: "Deseas procesar el pago?",
        showDenyButton: true,
        confirmButtonText: `Procesar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store.state.deudas=this.$store.state.deudas.filter(d=>d.id!==item.id)
          item.pagado=true
          this.$store.state.historialVentas.push(item)
          ApiService.deudaToHistory(item).then(res=>{
              console.log(res)
          })
          Swal.fire("Procesado!", "", "success");
        }
      });
    },
  },
};
</script>
