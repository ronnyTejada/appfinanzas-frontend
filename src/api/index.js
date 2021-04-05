import axios from 'axios'
const baseDomain = 'http://localhost:3000'
const baseUrl = `${baseDomain}/api/`

export const ApiService = {
    //PRODUCTS FUNCTIONS
    postProducto:(producto)=>axios.post(baseUrl+'postItem',{
        producto

    }),
    getAllProducts: () => axios.get(baseUrl+'getAllProducts').then(res => {
        return res
    }).catch(e => {
        return e
    }),
    deleteProducto:(productoId)=>axios.put(baseUrl+'deleteProduct',{
        productoId

    }),
    editProduct:(productId,productEdited)=>axios.put(baseUrl+'editProduct',{
        productId,
        productEdited
    }),
}