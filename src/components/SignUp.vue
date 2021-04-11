<template >
  <div id='de'>
    <v-container class="form-container elevation-7">
    <form style="margin-bottom:10px">
      <v-text-field v-model="username" label="Username"   prepend-icon='mdi-account' required></v-text-field>
      <v-text-field v-model="email" label="email"   prepend-icon='mdi-email' required></v-text-field>

      <v-text-field
        v-model="password"
        label="password"
        type="password"
        prepend-icon='mdi-lock'
        
      ></v-text-field>

      <v-btn class="mr-4" style="width:100%" color="primary" @click="sendAuth"> Registrar </v-btn>
      
    </form>
    <router-link  to="/login"  >Login</router-link>

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
const shortid = require('shortid');


import {ApiService} from '../api/index'


export default {
  name: "RegistrarUser",
  data: () => {
      return{
          username:null,
          password:null,
          email:null
          
      }
  },
  methods:{
      sendAuth(){
          let user={
            id:shortid.generate(),
            username:this.username,
            password:this.password,
            email:this.email
          }
          ApiService.registrarUser(user).then(res=>{
              user={}
              if(res.data==='registrado'){
                this.$router.replace('/login')
              }
          })
      }
  }
};
</script>
