<template>
  <v-container style="background-color: #eeeeee; min-height: 100vh;" fluid>
    <v-col cols="12" sm="12" md="12">
       <v-col
        cols="12"
        sm="3"
        style="position: absolute; top: 80px; right: 10px;"
      >
        <v-select
          :items="$store.state.categories"
          label="Filtrar Categorias"
          v-model="categorySelected"
          :error-messages="emailErrors"
          required
          
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          solo
          label="Buscar Producto"
          clearable
        ></v-text-field>
      </v-col>
      <!--span style="color: gray; margin-bottom: 150px">TODOS LOS PRODUCTOS</span-->
     

      <v-row style="margin-top:25px">
        <v-col
          cols="12"
          sm="6"
          md="3"
          justify="center"
          align-self="center"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :color="item.color"
              :elevation="hover ? 24 : 2"
              min-height="200px"
              max-height="200px"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title v-text="item.title"></v-card-title>

                  <v-card-subtitle v-text="item.price + 'Bs'"></v-card-subtitle>
                  <v-card-subtitle
                    style="position: absolute; top: -15px; left: -10px"
                    >({{ item.cantidadExistente }})</v-card-subtitle
                  >
                  <v-card-subtitle
                    style="position: absolute; bottom: -25px; right: -23px"
                    ><v-btn text rounded small fab @click="editItem(item)"
                      ><v-icon size="20" color="#808080"
                        >mdi-pencil</v-icon
                      ></v-btn
                    ></v-card-subtitle
                  >
                  <v-card-subtitle
                    style="position: absolute; bottom: -25px; left: -23px"
                    ><v-btn text rounded small fab @click="deleteItem(item)"
                      ><v-icon size="20" color="#808080"
                        >mdi-trash-can-outline</v-icon
                      ></v-btn
                    ></v-card-subtitle
                  >

                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      style="position: absolute; top: 120px"
                      @click="sendToCard(item)"
                      outlined
                      rounded
                      small
                      color="red"
                    >
                      Al carrito
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      v-if="item.byFraccion"
                      class="ml-2 mt-5"
                      style="position: absolute; top: 120px; left: 130px"
                      @click="choiceGr(item)"
                      outlined
                      rounded
                      small
                      color="purple"
                    >
                      Fracción
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="80" tile>
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>

    <!--EDITAR PRODUCTO-->
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="dialogEdit"
    >
      <template>
        <v-card>
          <v-toolbar color="primary" dark>Editar Producto</v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre"
                    required
                    v-model="itemName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Precio"
                    required
                    v-model="itemPrice"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Cantidad"
                    required
                    v-model="itemCantidad"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Categoria"
                    required
                    v-model="itemCategory"
                  ></v-text-field>
                </v-col>

                <span class="mdi mdi-name"></span>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="$store.state.dialogEdit = false">Close</v-btn>
            <v-btn text @click="sendEdited">Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

    <!--EDITAR PRODUCTO FORM-->

    <FormGramos />
  </v-container>
</template>

<script>
import FormGramos from "./FormGramos.vue";
import Swal from "sweetalert2";
import { ApiService } from "../api";

export default {
  name: "Shop",
  components: { FormGramos: FormGramos },
  data: () => {
    return {
      search: "",
      categorySelected: "",
      itemCantidad: null,
      itemPrice: null,
      itemName: null,
      dialogEdit: false,
      itemSelected: null,
      itemCategory: null,
    };
  },
  methods: {
    sendToCard(item) {
      if (item.cantidadExistente > 0) {
    
        item.cantidadExistente -= 1;
        let item2 = {
          title: item.title,
          cantidadToCart: parseInt(item.cantidadToCart),
          price: parseInt(item.price),
          id: item.id,
          unidad: item.unidad,
          ventas:item.ventas
        };
        this.$store.commit("itemToCart", item2);
        this.$notify({
          type: "success",
          group: "foo",
          title: "Agregado al carrito",
          text: "este producto ha sido enviado al carrito",
          speed: 1,
          duration: 1000,
        });
      } else {
        this.$notify({
          type: "error",
          group: "foo",
          title: "Producto Agotado",
          text: `Agrega mas ${item.title} en el inventario`,
          speed: 1,
          duration: 1000,
        });
      }
    },
    choiceGr(item) {
      this.$store.state.itemSelected = item;

      this.$store.state.dialogGramos = true;
    },
    editItem(item) {
      this.itemName = item.title;
      this.itemCantidad = item.cantidadExistente;
      this.itemPrice = item.price;
      this.itemCategory = item.category;
      this.dialogEdit = true;
      this.itemSelected = item;
    },
    sendEdited() {
      this.itemSelected.price = this.itemPrice;
      this.itemSelected.title = this.itemName;
      this.itemSelected.cantidadExistente = this.itemCantidad;
      this.dialogEdit = false;
      ApiService.editProduct(this.itemSelected.id, this.itemSelected).then(
        (res) => {
          console.log(res);
        }
      );
    },

    deleteItem(item) {
      Swal.fire({
        title: `Eliminar ${item.title} del inventario?`,

        showCancelButton: true,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Eliminado", "", "success");
          this.$store.state.items = this.$store.state.items.filter(
            (i) => i.id !== item.id
          );
          ApiService.deleteProducto(item.id).then((res) => {
            console.log(res);
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    },
  },
  computed: {
    items() {
      //  var items=''        return this.$store.state.items.filter(i=>i.category.toLowerCase().includes(this.categorySelected.toLowerCase()))

      if (this.categorySelected === "") {
        if (this.search === "") {
          return this.$store.state.items;
        } else {
          return this.$store.state.items.filter((i) =>
            i.title.toLowerCase().includes(this.search.toLowerCase())
          );
        }
      } else {
        if (this.search === "") {
          return this.$store.state.items.filter((i) =>
            i.category
              .toLowerCase()
              .includes(this.categorySelected.toLowerCase())
          );
        } else {
          return this.$store.state.items.filter((i) =>
            i.title.toLowerCase().includes(this.search.toLowerCase())
          );
        }
      }
    },
  },
  mounted() {
   
  },
};
</script>
