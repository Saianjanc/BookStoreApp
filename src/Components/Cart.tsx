import { useSelector } from "react-redux"

function Cart(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    return(
        <>
           {cartItems.map((ele:any)=><span>{ele.bookName}</span>)}
        </>
    )
}
export default Cart