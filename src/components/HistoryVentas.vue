<template>
  <v-container
    style="padding: 25px; background-color: #eeeeee; height: 100%"
    fluid
  >
    <v-row>
      <span style="color: gray; margin-bottom: 15px">HISTORIAL DE VENTAS</span>

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
        <v-data-table :headers="headers" :items="pedidos" :search="search">
          <template v-slot:item.cantidadToCart="{ item }">
            <span>{{ item.cantidadToCart + "" + item.unidad }} </span>
          </template>
          <template v-slot:item.subtotal="{ item }">
            <span>{{ item.subtotal + "Bs" }} </span>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { ApiService } from "../api";
export default {
  name: "HistoryVentas",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Fecha",
        align: "start",
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
    ],
  }),
  computed: {
    pedidos() {
     
        if (this.$store.state.negocioSelected !== null) {
          ApiService.getPedidosFromHistory(
            this.$store.state.negocioSelected.id
          ).then(async (res) => {
            this.$store.state.historialVentas = [];
            res.data.map(p=>{
              this.$store.state.historialVentas.push(p)

            })
          });
        }

        return this.$store.state.historialVentas
      },
     
  
  },


};
</script>
