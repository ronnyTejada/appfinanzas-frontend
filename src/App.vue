<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <div class="d-flex align-center">
        <h1>app-name</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="$store.state.dialogCart = true" text>
        <v-icon>mdi-cart</v-icon>
        <span class="mr-2">{{ this.$store.state.cart.length }}</span>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link to="/" v-if="this.$store.getters.isUserLogged">
            <v-list-item-title icon>Inicio</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            v-if="this.$store.getters.isUserLogged"
            @click="$store.state.dialogNegocios = true"
          >
            <v-list-item-title icon>Mis Negocios</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            v-if="this.$store.getters.isUserLogged"
            @click="logout()"
          >
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="!this.$store.getters.isUserLogged"
            link
            to="/login"
          >
            <v-list-item-title>Iniciar Sesión</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="!this.$store.getters.isUserLogged"
            link
            to="/registrar"
          >
            <v-list-item-title>Crear Cuenta</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      width="320"
      v-if="$store.getters.isUserLogged"
    >
      <v-list-item>
        <v-list-item-avatar>
          <img
            :src="$store.state.negocioSelected.img"
            v-if="$store.state.negocioSelected"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="$store.state.negocioSelected">{{
            $store.state.negocioSelected.name
          }}</v-list-item-title>
          <v-list-item-title v-else>Mi Negocio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!--div v-if="this.$store.getters.isUserLogged">
        
        <div style="padding-left: 20px; padding-right: 20px">
          <v-select
            :clearable="false"
            :searchable="false"
            v-model="companySelected"
            :options="$store.state.negocios.name"
            label="Negocios"
            single-line
          >
            <span slot="no-options">Sin Empresas.</span>
          </v-select>
        </div>
        <v-divider class="mx-1" :inset="false" horizontal></v-divider>
      </div-->

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item style="position: absolute; bottom: -10px">
          <v-list-item-action>
            <v-btn
              @click="$store.state.dialogNewNeg = true"
              color="indigo"
              dark
              width="290"
              outlined
              ><v-icon left> mdi-plus </v-icon>Registrar Negocio</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>

      <Cart />
      <NewNegocio />
      <MisNegocios />

    </v-main>
    <br />
    <notifications group="foo" position="top center" />
  </v-app>
</template>

<script>
import Cart from "./components/Cart";
import NewNegocio from "./components/NewNegocio";
import MisNegocios from "./components/MisNegocios";

//import vSelect from "vue-select";

import Cookies from "js-cookie";

export default {
  name: "App",
  components: { Cart: Cart, NewNegocio, MisNegocios },

  data: () => ({
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-view-dashboard", link: "/" },
      { title: "Inventario", icon: "mdi-warehouse", link: "/inventarioForm" },
      {
        title: "Historial de Ventas",
        icon: "mdi-history",
        link: "/historialVentas",
      },
       {
        title: "Deudas por Cobrar",
        icon: "mdi-cash-refund",
        link: "/deudas",
      },
      { title: "Estadisticas", icon: "mdi-chart-sankey", link: "/Statistics" },
    ],
  }),
  methods: {
    logout() {
      Cookies.remove("token");
      this.$store.commit("setUser", null);
      this.$store.state.categories = [];
      this.$store.state.items = [];
      this.$store.state.negocios = [];
      this.$store.state.negocioSelected = null;

      this.$router.replace("/login");
    },
  },
  computed:{
    user(){
      return this.$store.getters.isUserLogged
    }
  },
  beforeMount() {
    this.$store.commit('setNegocios',this.$store.getters.isUserLogged)

    console.log('ddd')
  },
};
</script>
