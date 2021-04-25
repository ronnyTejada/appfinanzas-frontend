<template>
  <v-dialog v-model="$store.state.dialogNegocios" scrollable max-width="300px">
    <v-card>
      <v-card-title>Negocios Registrados</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <v-radio-group
          v-model="negocioSelected"
          column
          v-for="item in $store.state.negocios"
          :key="item.id"
        >
          <v-radio :label="item.name" :value="item"></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          @click="$store.state.dialogNegocios = false"
        >
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="selectNegocio"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ApiService } from "../api/index";

export default {
  name: "MisNegocios",
  data: () => ({
    negocioSelected: null,
  }),
  methods: {
    selectNegocio() {
       ApiService.selectNegocio(this.negocioSelected.id, this.$store.state.negocioSelected.id).then(res=>{
        console.log(res)
        })
      this.$store.commit('cleanState')
      this.$store.state.negocioSelected = this.negocioSelected;
      this.$store.state.negocioSelected.img = `https://ui-avatars.com/api/?name=${this.$store.state.negocioSelected.name.replace(
        " ",
        "+"
      )}`;

     

      ApiService.getAllProducts(this.$store.state.negocioSelected.id).then(
        (res) => {
          if (res.data.length > 0) {
                          console.log(res.data)

            res.data.map((p) => {
            //  this.$store.state.items=[]
              this.$store.state.categories=['todos']
              let aux =this.$store.state.items.filter((item) => item.id === p.id);
              if (aux.length === 0) {
                this.$store.state.items.push(p);
                let aux = p.category.split(" ");
                aux.map((c) => {
                  if (!this.$store.state.categories.includes(c)) {
                    this.$store.state.categories.push(c);
                  }
                });

                this.$store.state.dialogNegocios = false;
              }
            });
          }else{
              this.$store.state.items=[]
              this.$store.state.dialogNegocios = false;

          }
        }
      );

      ApiService.getPedidosFromHistory(
          this.$store.state.negocioSelected.id
        ).then(async (res) => {
          this.$store.state.historialVentas = [];
          res.data.map(p => {
            if(p.pagado){
              this.$store.state.historialVentas.push(p)
             
            }else{
              this.$store.state.deudas.push(p)

            }
          })
          this.$store.state.historialVentas.map(i=>{
            let existeI=false
            let existeC=false

            this.$store.state.masVendidos.map(item=>{
              if(item.id===i.id){
                item.ventas+=i.cantidadToCart
                
                existeI=true
              }
             
            })
            this.$store.state.topClientes.map(c=>{
              if(c.ci === i.cliente){
                c.compras+=1
                existeC=true
              }
            })
            if(!existeI){
              this.$store.state.masVendidos.push(i)
            }
            if(!existeC){
              this.$store.state.topClientes.push({ci:i.cliente,compras:1,fecha:i.fecha})
            }
          })
        });

        ApiService.getClientes(this.$store.state.negocioSelected.id).then(res=>{
          res.data.map(cliente=>{
            this.$store.state.clientes.push(cliente)
            console.log(this.$store.state.clientes)
          })
        })
      
    },
  },
};
</script>
