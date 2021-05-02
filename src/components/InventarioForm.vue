<template>
  <v-container fluid>
    <span style="color: gray">AGREGAR PRODUCTOS</span>

    <form>
      <v-text-field
        v-model="title"
        :error-messages="nameErrors"
        :counter="10"
        label="Nombre"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="price"
        :error-messages="emailErrors"
        label="Precio"
        required
        type="number"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="category"
        :error-messages="nameErrors"
        :counter="10"
        label="Categoria"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="cantidad"
        :error-messages="emailErrors"
        label="Cantidad"
        required
        type="number"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-select
        :items="items"
        label="Unidad"
        v-model="unidadSelected"
        :error-messages="emailErrors"
        required
      ></v-select>
     
      <v-file-input truncate-length="15" label="Imagen"></v-file-input>
      <v-checkbox v-model="unidad" label="Vender Por Unidad?"></v-checkbox>
      <v-checkbox
        v-model="fraccion"
        label="Vender Por Fracción(KG,LTS,GRM)?"
      ></v-checkbox>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </v-container>
</template>
<script>
const shortid = require("shortid");
import { ApiService } from "../api/index";

export default {
  name: "InvetarioForm",
  data: () => ({
    title: null,
    price: null,
    img: null,
    fraccion: false,
    unidadSelected: null,
    items: ["Kg.", "Grm.", "Lts.", "Un."],
    cantidad: null,
    category: null,
    unidad: false,
  }),
  methods: {
    submit() {
      let item = {
        id: shortid.generate(),
        price: this.price,
        title: this.title,
        src: this.img,
        cantidadToCart: 1,
        cantidadExistente: parseInt(this.cantidad),
        color: "#ffffff",
        byFraccion: this.fraccion,
        byUnidad: this.unidad,
        unidad: this.unidadSelected,
        category: this.category + " " + "todos",
        negocioId: this.$store.state.negocioSelected.id,
        ventas: 0,
      };
      this.$store.state.items.push(item);
      ApiService.postProducto(item).then((res) => {
        item = {};
        console.log(res);
      });
      this.$router.replace("/");
    },
  },
};
</script>
