import axios from "axios";

const BASEURL = "https://bookstore.incubation.bridgelabz.com/bookstore_user"

const configForBooks = () => { 
    const accessToken = localStorage.getItem("accessToken")
    const header = {headers:{
         "Content-Type": "application/json",
         "X-Access-Token": accessToken
     }
 }
     return header
 }

export async function getBooks(){
    let data:any
    await axios.get(`${BASEURL}/get/book`).then(res => {
        data=res.data.result
        })
        return data
    }

export async function getCartItems(){
    let data:any
    await axios.get(`${BASEURL}/get_cart_items`,configForBooks()).then(res => {
        data=res.data.result
        })
        return data
    }
export async function addCartItem(productId:string){
    await axios.post(`${BASEURL}/add_cart_item/${productId}`,{},configForBooks())
    }
export async function removeCartItem(productId:string){
    await axios.delete(`${BASEURL}/remove_cart_item/${productId}`,configForBooks())
    }
export async function updateCartQty(productId:string,quantity:string){
    await axios.put(`${BASEURL}/cart_item_quantity/${productId}`,{"quantityToBuy":quantity},configForBooks())
    }