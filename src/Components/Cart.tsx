import { useSelector } from "react-redux"
import cartSlice from "../utils/store/cartSlice"

function Cart(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    return(
        <>
           {cartItems.map((ele:any)=><span>{ele.bookName}</span>)}
        </>
    )
}
export default Cart