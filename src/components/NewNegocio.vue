<template>
    <v-dialog
        v-if="$store.getters.isUserLogged"
        transition="dialog-top-transition"
        max-width="600"
        v-model="$store.state.dialogNewNeg"
        persistent
      >
        
        <template >
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Crear Negocio</v-toolbar>
             <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nombre"
                      required
                      v-model="name"
                      
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Direccion"
                      required
                      v-model="direccion"
                    
                    
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12">
                    <v-text-field
                      label="Telefono"
                      required
                      v-model="telefono"
                  
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="rubro"
                      v-model="rubro"
                      
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Rif"
                      v-model="rif"
                      
                    ></v-text-field>
                  </v-col>

                  <span class="mdi mdi-name"></span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                v-if="$store.state.negocios.length>0"
                @click="$store.state.dialogNewNeg = false"
              >Close</v-btn>
               <v-btn
                text
                @click="sendNegocio"
              >Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>
<script>
import { ApiService } from '../api';
const shortid = require("shortid");

export default ({
    name:'NewNegocio',
    data:()=>({
      name:null,
      direccion:null,
      rubro:null,
      rif:null,
      telefono:null,
      status:false
    }),
    methods:{
      sendNegocio(){
        if(this.$store.state.negocios.length===0){
          this.status=true
        }

        let negocio={
          id: shortid.generate(),
          name:this.name,
          direccion:this.direccion,
          rubro:this.rubro,
          rif:this.rif,
          telefono:this.telefono,
          propietario:this.$store.state.user,
          selected:this.status
        }

        ApiService.registrarNegocio(negocio).then(res=>{
          console.log(res)
          if(this.$store.state.negocioSelected===null){
            this.$store.state.negocioSelected=negocio
          }
          negocio={}
          this.$store.state.dialogNewNeg=false
        })

      }
    }
})
</script>
