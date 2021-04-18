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
            <div >
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

                  <h3>{{ $store.state.historialVentas.length }}</h3>
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

                  <h3>2000</h3>
                </v-card-title>

                <v-card-subtitle
                  style="
                    position: absolute;
                    right: 15px;
                    top: 70px;
                    font-size: 20px;
                    color: #2196f3;
                  "
                  >Total <br />
                  Productos</v-card-subtitle
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
                @click="goToMaquinariasCharts"
                style="background-color: none"
              >
                <v-card-title class="h">
                  <v-icon
                    style="font-size: 55px; color: #6d7cfc; margin-right: 25px"
                    >mdi-library-shelves</v-icon
                  >

                  <h3>{{ $store.state.items.length }}</h3>
                </v-card-title>

                <v-card-subtitle
                  style="
                    position: absolute;
                    right: 30px;
                    top: 70px;
                    font-size: 20px;
                    color: #2196f3;
                  "
                  >Invetario <br />
                  Actual</v-card-subtitle
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
            <h4>Ventas 2020</h4>
            <area-chart
              :data="{
                Enero: 2,
                Febrero: 5,
                Marzo: 10,
                Abril: 15,
                Mayo: 11,
                Junio: 22,
                Julio: 15,
                Agosto: 25,
                Septiembre: 20,
                Obtubre: 30,
                Noviembre: 28,
                Diciembre: 35,
              }"
            ></area-chart>
          </v-col>
          <v-col
            style="text-align: center; background-color: white"
            sm="12"
            md="6"
          >
            <h4>Mas vendidos</h4>
            <pie-chart
              :data="[
                ['caraotas', 100],
                ['Harina Pan', 95],
                ['Queso', 80],
                ['Pastas', 110],
                ['Arroz', 90],
                ['caraotas', 100],
                ['Harina Pan', 95],
                ['Queso', 80],
                ['Pastas', 110],
                ['Arroz', 90],
              ]"
              :donut="true"
            ></pie-chart>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
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
      </v-col>
    </v-col>
  </v-container>
</template>
<style scoped>
  .div-contenedor{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
<script>
export default {
  name: "Statistics",

  data: () => ({
    datacollection: null,
    date:null,
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
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Obtubre",
          "Novienbre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
            fill: false,
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
  computed: {
    ingresos() {
      var ingresos = 0;
      this.$store.state.historialVentas.map((venta) => {
        ingresos += parseInt(venta.subtotal);
      });
      return ingresos;
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>