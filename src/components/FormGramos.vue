<template>
  <v-dialog
    transition="dialog-top-transition"
    max-width="600"
    v-model="$store.state.dialogGramos"
  >
    <template>
      <v-card>
        <v-toolbar color="primary" dark>Cuantos gramos venderas?</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Cantidad"
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

              <v-radio-group v-model="unidad" row>
                <v-radio label="Kilos" color="red" value="KG"></v-radio>
                <v-radio
                  label="Litros"
                  color="red darken-3"
                  value="Lts"
                ></v-radio>
                 <v-radio
                  label="Gramos"
                  color="red darken-3"
                  value="Grms"
                ></v-radio>
              </v-radio-group>
              <span class="mdi mdi-name"></span>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="$store.state.dialogGramos = false">Close</v-btn>
          <v-btn text @click="submit">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: "FormGramos",
  data: () => {
    return {
      price: "",
      cantidad: "",
      unidad:null
    };
  },
  methods: {
    submit() {
      console.log(this.cantidad)
      let item = {
        title: this.$store.state.itemSelected.title,
        cantidadToCart: parseInt(this.cantidad),
        price: parseInt(this.price),
        id: this.$store.state.itemSelected.id,
        unidad: this.unidad,
        byFraccion:true,
        ventas:this.$store.state.itemSelected.ventas
      };
      let aux = parseInt(this.cantidad) / 1000
      this.$store.state.itemSelected.cantidadExistente -= aux
      this.$store.commit("itemToCart", item);
      this.price = "";
      this.cantidad = "";
      this.$store.state.dialogGramos = false;
    },
  },
};
</script>
