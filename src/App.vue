<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
      
    >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <div class="d-flex align-center">
        <h1>app-name</h1>
      </div>

     
  
      <v-spacer></v-spacer>

      <v-btn
        @click="$store.state.dialogCart=true"
        text
      >
        <v-icon>mdi-cart</v-icon>
        <span class="mr-2">{{this.$store.state.cart.length}}</span>

      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      width="320"
      
    >
    <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>B.I.G Grocery</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    
    
    </v-navigation-drawer>
    

    <v-main>
      <router-view></router-view>

      <Cart/>
    </v-main>
    <br>
    <notifications group="foo" position="top center" />

  </v-app>
</template>

<script>
import Cart from './components/Cart';

export default {
  name: 'App',
  components:{Cart:Cart},

  data: () => ({
    drawer:true,
     items: [
          { title: 'Home', icon: 'mdi-view-dashboard',link:'/' },
          { title: 'Inventario', icon: 'mdi-warehouse',link:'/inventarioForm' },
          { title: 'Historial de Ventas', icon: 'mdi-history',link:'/historialVentas' },
          { title: 'Estadisticas', icon: 'mdi-chart-sankey',link:'/Statistics' },


        ],
  }),
};
</script>
