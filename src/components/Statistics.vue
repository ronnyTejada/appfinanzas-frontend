<template>
  <v-container style="background-color: #eeeeee; height: auto" fluid>
    <v-col>
      <div class="div-contenedor">
        <span style="color: gray; margin-bottom: 15px">ESTADISTICAS</span>

        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <div>
              <v-text-field
                v-model="date"
                label="Filtrar"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </div>
          </template>
          <v-date-picker v-model="date" type="month" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>

      <v-col cols="12" sm="12" md="12">
        <v-row style="background-color: white" class="elevation-5">
          <v-col cols="12" sm="6" md="3" justify="center" align-self="center">
            <v-hover>
              <v-card
                min-height="109px"
                min-width="200px"
                class="elevation-0"
                @click="goToObrasCharts"
                style="background-color: none"
              >
                <v-card-title>
                  <v-icon
                    style="font-size: 55px; color: #6d7cfc; margin-right: 25px"
                    >mdi-handshake</v-icon
                  >

                  <h3>{{ historialVentas }}</h3>
                </v-card-title>

                <v-card-subtitle
                  style="
                    position: absolute;
                    right: 45px;
                    top: 70px;
                    font-size: 20px;
                    color: #2196f3;
                  "
                  >Ventas</v-card-subtitle
                >
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" sm="6" md="3" justify="center" align-self="center">
            <v-hover>
              <v-card
                white
                min-height="109px"
                min-width="200px"
                :elevation="0"
                @click="goToMaterialesCharts"
                style="background-color: none"
              >
                <v-card-title>
                  <v-icon
                    style="font-size: 55px; color: #6d7cfc; margin-right: 25px"
                    >mdi-cash-multiple</v-icon
                  >

                  <h3>{{ ingresos }}Bs</h3>
                </v-card-title>

                <v-card-subtitle
                  style="
                    position: absolute;
                    right: 30px;
                    top: 70px;
                    font-size: 20px;
                    color: #2196f3;
                  "
                  >Ingresos</v-card-subtitle
                >
              </v-card>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6" md="3" justify="center" align-self="center">
            <v-hover>
              <v-card
                min-height="109px"
                min-width="200px"
                :elevation="0"
                @click="goToHerramientasCharts"
              >
                <v-card-title>
                  <v-icon
                    style="font-size: 55px; color: #6d7cfc; margin-right: 25px"
                    >mdi-package-variant</v-icon
                  >

                  <h3>{{ historialDeudas }}</h3>
                </v-card-title>

                <v-card-subtitle
                  style="
                    position: absolute;
                    right: 10px;
                    top: 70px;
                    font-size: 20px;
                    color: #2196f3;
                  "
                  >Deudas por <br />Cobrar
                </v-card-subtitle>
              </v-card>
            </v-hover>
          </v-col>

          <v-col cols="12" sm="6" md="3" justify="center" align-self="center">
            <v-hover>
              <v-card
                min-height="109px"
                min-width="200px"
                :elevation="0"
                @click="goToMaquinariasCharts"
                style="background-color: none"
              >
                <v-card-title class="h">
                  <v-icon
                    style="font-size: 55px; color: #6d7cfc; margin-right: 25px"
                    >mdi-account-group</v-icon
                  >

                  <h3>{{ $store.state.clientes.length }}</h3>
                </v-card-title>

                <v-card-subtitle
                  style="
                    position: absolute;
                    right: 30px;
                    top: 70px;
                    font-size: 20px;
                    color: #2196f3;
                  "
                  >Clientes</v-card-subtitle
                >
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <v-row
          style="background-color: white; margin-top: 50px"
          cols="12"
          class="elevation-5"
        >
          <v-col style="text-align: center" sm="12" md="6">
            <h4>Top Clientes</h4>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">C.i</th>
                    <th class="text-center">Compras</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in topClientes" :key="item.name">
                    <td>{{ item.ci }}</td>
                    <td>{{ item.compras }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col
            style="text-align: center; background-color: white"
            sm="12"
            md="6"
          >
            <h4>Mas vendidos</h4>
            <pie-chart :data="masVendidos" :donut="true"></pie-chart>
          </v-col>
        </v-row>
      </v-col>

      <!--v-col cols="12">
        <v-row style="margin-top: 50px" class="elevation-5">
          <v-col
            style="text-align: center; background-color: white"
            sm="12"
            md="12"
          >
            <h4>Productos En Inventario</h4>
            <column-chart :data="data"> </column-chart>
          </v-col>
        </v-row>
      </v-col-->
    </v-col>
  </v-container>
</template>
<style scoped>
.div-contenedor {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}
</style>
<script>
//const moment = require("moment");

export default {
  name: "Statistics",

  data: () => ({
    datacollection: null,
    date: "",
    desserts: [
      {
        name: "24173955",
        calories: 159,
      },
      {
        name: "123456",
        calories: 237,
      },
      {
        name: "654321",
        calories: 262,
      },
      {
        name: "741258",
        calories: 305,
      },
      {
        name: "951753",
        calories: 356,
      },
      {
        name: "357159",
        calories: 375,
      },
      {
        name: "000000",
        calories: 392,
      },
    ],
    data: [
      { name: "Sal", data: { Productos: 3 } },
      { name: "Pan Dulce", data: { Productos: 5 } },
      {
        name: "Frijoles",
        data: { Productos: 10 },
      },
      {
        name: "Galletas",
        data: { Productos: 8 },
      },
      { name: "Queso", data: { Productos: 15 } },
      { name: "Caraotas", data: { Productos: 25 } },
      {
        name: "Harina Pan",
        data: { Productos: 30 },
      },
      {
        name: "Arroz",
        data: { Productos: 25 },
      },
      { name: "Pasta", data: { Productos: 40 } },
      { name: "Azucar", data: { Productos: 35 } },
      {
        name: "Jugos",
        data: { Productos: 20 },
      },
      {
        name: "Fresas",
        data: { Productos: 22 },
      },
      { name: "Helados", data: { Productos: 9 } },
      { name: "Barquillas", data: { Productos: 12 } },
      {
        name: "Avena",
        data: { Productos: 10 },
      },
      {
        name: "Galletas",
        data: { Productos: 8 },
      },
      { name: "Sal", data: { Productos: 3 } },
      { name: "Pan Dulce", data: { Productos: 5 } },
      {
        name: "Frijoles",
        data: { Productos: 10 },
      },
      {
        name: "Galletas",
        data: { Productos: 8 },
      },
    ],
  }),
  methods: {},
  computed: {
    ingresos() {
      var ingresos = 0;
      if (this.date !== "") {
        this.$store.state.historialVentas.map((venta) => {
          let c = venta.fecha[0];
          let e = venta.fecha[1];
          let a = this.date[5];
          let b = this.date[6];
          let aux = a + b;
          let aux2 = c + e;
          console.log(aux === aux2);
          if (aux === aux2) {
            ingresos += parseInt(venta.subtotal);
          }
        });
      } else {
        this.$store.state.historialVentas.map((venta) => {
          ingresos += parseInt(venta.subtotal);
        });
      }
      return ingresos;
    },
    historialDeudas() {
      let data = [];
      if (this.date !== "") {
        this.$store.state.deudas.map((d) => {
          console.log(d.fecha[0], d.fecha[1]);
          let c = d.fecha[0];
          let e = d.fecha[1];
          let a = this.date[5];
          let b = this.date[6];
          let aux = a + b;
          let aux2 = c + e;
          console.log(aux === aux2);
          if (aux === aux2) {
            data.push(d);
          }
        });
      } else {
        this.$store.state.deudas.map((d) => {
          data.push(d);
        });
      }
      return data.length;
    },
    historialVentas() {
      let data = [];
      if (this.date !== "") {
        this.$store.state.historialVentas.map((d) => {
          console.log(d.fecha[0], d.fecha[1]);
          let c = d.fecha[0];
          let e = d.fecha[1];
          let a = this.date[5];
          let b = this.date[6];
          let aux = a + b;
          let aux2 = c + e;
          console.log(aux === aux2);
          if (aux === aux2) {
            data.push(d);
          }
        });
      } else {
        this.$store.state.historialVentas.map((d) => {
          data.push(d);
        });
      }
      return data.length;
    },
    masVendidos() {
      let data = [];

      if (this.date !== "") {
        this.$store.state.masVendidos.map((d) => {
          let c = d.fecha[0];
          let e = d.fecha[1];
          let a = this.date[5];
          let b = this.date[6];
          let aux = a + b;
          let aux2 = c + e;

          if (aux === aux2) {
            data.push([d.title, d.ventas]);
          }
        });
      } else {
        this.$store.state.masVendidos.map((d) => {
          data.push([d.title, d.ventas]);
        });
      }
      console.log(data)

      return data;
    },
    topClientes() {
      let data = [];
      if (this.date !== "") {
        this.$store.state.topClientes.map((d) => {
          let c = d.fecha[0];
          let e = d.fecha[1];
          let a = this.date[5];
          let b = this.date[6];
          let aux = a + b;
          let aux2 = c + e;

          if (aux === aux2) {
            data.push(d);
          }
        });
      }else{
        this.$store.state.topClientes.map((d) => {
        
      
          data.push(d);
        
      });
      }

      return data;
    },
  },
  mounted() {},
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>