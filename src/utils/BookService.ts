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
    let data:any
    await axios.post(`${BASEURL}/add_cart_item/${productId}`,{},configForBooks()).then(res=>{
        data = res.data.result
    })
    return data
    }
export async function removeCartItem(productId:string){
    await axios.delete(`${BASEURL}/remove_cart_item/${productId}`,configForBooks())
    }
export async function updateCartQty(productId:string,quantity:string){
    await axios.put(`${BASEURL}/cart_item_quantity/${productId}`,{"quantityToBuy":quantity},configForBooks())
    }

export async function addWishList(productId:string){
    await axios.post(`${BASEURL}/add_wish_list/${productId}`,{},configForBooks())
    }

export async function getWishlistItems(){
    let data:any
    await axios.get(`${BASEURL}/get_wishlist_items`,configForBooks()).then(res => {
        data=res.data.result
        })
        return data
    }
export async function removeWishlistItem(productId:string){
    await axios.delete(`${BASEURL}/remove_wishlist_item/${productId}`,configForBooks())
    }

export async function addOrder(order:any){
    let data:any
    await axios.post(`${BASEURL}/add/order`,{"orders": order},configForBooks()).then(res=>{
        data = res.data.result
    })
    return data
    }

export async function bookFeedback(productId:string,rating:number,comment:string){
    await axios.post(`${BASEURL}/add/feedback/${productId}`,{
        "comment": comment,
        "rating": rating
      },configForBooks())
    }

export async function getFeedback(productId:string){
    let data:any
    await axios.get(`${BASEURL}/get/feedback/${productId}`,configForBooks()).then(res=>{
        data = res.data.result
    })
    return data
    }

export async function editUserAddress(address:any){
    let data:any
    await axios.put(`${BASEURL}/edit_user`,address,configForBooks()).then(res=>{
        data = res.data.result
    })
    return data
    }