<template>
    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        v-model="$store.state.dialogGramos"
      >
        
        <template >
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Cuantos gramos venderas?</v-toolbar>
             <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Gramos"
                      required
                      v-model="cantidad"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Precio"
                      required
                      v-model="price"
                      :error-messages="presupuestoErrors"
                      type="number"
                    ></v-text-field>
                  </v-col>

                  <span class="mdi mdi-name"></span>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="$store.state.dialogGramos = false"
              >Close</v-btn>
               <v-btn
                text
                @click="submit"
              >Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
</template>
<script>

export default ({
   name:'FormGramos',
   data:()=>{
       return{
           price:'',
           cantidad:''
       }
   },
   methods:{
       submit(){
           let item = {
               title: this.$store.state.itemSelected.title,
               cantidad:parseInt(this.cantidad),
               price:parseInt(this.price),
               id: this.$store.state.itemSelected.id,
               unidad:'Gr'
           } 
          
           this.$store.commit('itemToCart',item)
            this.price=''
            this.cantidad=''
           this.$store.state.dialogGramos=false

       }
   }

})
</script>
