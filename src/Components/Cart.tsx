import { useSelector } from "react-redux"
import CartBookCard from "./CartBookCard"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
// import { getCartItems } from "../utils/BookService"
// import { useEffect } from "react"
// import { putCartList } from "../utils/store/cartSlice"

function Cart(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)

    return(
        <div className="w-full h-full flex justify-center">
            <div className="w-[80%] font-[Roboto]">
                <div className="mt-[20px]">
                <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
                <span>My Cart</span>
                </div>
                <div className="w-[80%] mt-5 min-h-[250px] border-[#707070] border">
                    <div className="text-lg font-semibold p-5">My cart ({cartItems.length})</div>
                    <div className="flex flex-col gap-2 p-5">
                    {cartItems.length?cartItems.map((book:any,index:number)=><CartBookCard key={index} index={index} book={book}/>):<center><h1 className="text-xl">Your Cart is Empty! Add any Book to Cart!</h1></center>}
                    <div className={cartItems.length?"flex justify-end":"hidden"}><Button variant="contained" sx={{backgroundColor:"#3371B5"}}>Place order</Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart