import { useSelector } from "react-redux"
import CartBookCard from "./CartBookCard"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"
import { addOrder } from "../utils/BookService"

function Cart(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)

    const placeOrder = async()=>{

        const newOrder = cartItems.map((book:any)=>book={product_id:book._id,product_name:book.bookName,product_quantity:book.quantityToBuy,product_price:book.discountPrice})
        const orderDate = await addOrder(newOrder)
        localStorage.setItem("MyOrders",JSON.stringify(cartItems))
        localStorage.setItem("OrderDate",orderDate[0].createdAt)
    }

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
                    <div className={cartItems.length?"flex justify-end":"hidden"}><Button variant="contained" sx={{backgroundColor:"#3371B5"}} onClick={placeOrder}>Place order</Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart