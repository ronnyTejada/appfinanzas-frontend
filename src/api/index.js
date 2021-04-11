import axios from 'axios'
const baseDomain = 'http://localhost:3000'
const baseUrl = `${baseDomain}/api/`

export const ApiService = {
    //PRODUCTS FUNCTIONS
    postProducto:(producto)=>axios.post(baseUrl+'postItem',{
        producto

    }),
    getAllProducts: (negocioId) => axios.get(baseUrl+'getAllProducts/?negocio='+negocioId).then(res => {
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
    //AUTH FUNCTIONS
    registrarUser:(user)=>axios.post(baseUrl+'registrarUser',{
        user

    }),
    loginUser:(email,password)=>axios.post(baseUrl+'loginUser',{
        email,
        password
    }),
    //NEGOCIOS FUNCTIONS
    registrarNegocio:(negocio)=>axios.post(baseUrl+'registrarNegocio',{
        negocio
    }),
    getNegocios: (propietarioId)=>axios.get(baseUrl+'getNegocios/?propietario=' + propietarioId),
}