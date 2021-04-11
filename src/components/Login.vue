<template >
  <div id='de'>
    <v-container class="form-container elevation-7">
    <form style="margin-bottom:10px">
      <v-text-field v-model="email" label="Email"   prepend-icon='mdi-account' required></v-text-field>

      <v-text-field
        v-model="password"
        label="password"
        type="password"
        prepend-icon='mdi-lock'
        
      ></v-text-field>

      <v-btn class="mr-4" style="width:100%" color="primary" @click="sendAuth"> Enviar </v-btn>
      
    </form>
    <router-link  to="/signup"  >Crear Cuenta</router-link>

  </v-container>
  </div>
</template>
<style scoped>
#de{
  background-color: #F3F3F4;
  width: 100%;
  height: 100vh;
  padding-top: 100px;
}
.form-container{
  max-width: 400px;
  text-align: center;
  border-radius: 10px;
  background-color:#ffff ;
}
</style>

<script>
import Cookies from 'js-cookie'

import {ApiService} from '../api/index'


export default {
  name: "LoginUser",
  data: () => {
      return{
          email:null,
          password:null,
          
      }
  },
  methods:{
      sendAuth(){
          ApiService.loginUser(this.email,this.password).then(res=>{
              Cookies.set('token',res.data.token )
              this.$store.commit('setUser',res.data.token)
              this.$store.commit('setNegocios',res.data.token)
              this.$router.replace('/')
              console.log(res.data.token)
          })
      }
  }
};
</script>
