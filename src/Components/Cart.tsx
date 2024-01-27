import { useDispatch, useSelector } from "react-redux"
import CartBookCard from "./CartBookCard"
import { Link } from "react-router-dom"
import { Button, CircularProgress } from "@mui/material"
import { getCartItems } from "../utils/BookService"
import { useEffect } from "react"
import { putCartList } from "../utils/store/cartSlice"

function Cart(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    const books = useSelector((store:any)=> store.books.bookList)
    const dispatch = useDispatch()

    const getCartList = async()=>{
            const cartList = await getCartItems()
            const bookList = cartList.map((cartBook:any)=>{return{...books.filter((book:any)=>book._id===cartBook.product_id._id)[0],cartId:cartBook._id,quantityToBuy:cartBook.quantityToBuy}})
            dispatch(putCartList(bookList))
        }
    
    useEffect(()=>{getCartList()},[books])
    return(
        <div className="w-full h-full flex justify-center">
            <div className="w-[80%] font-[Roboto]">
                <div className="mt-[20px]">
                <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
                <span>My Cart</span>
                </div>
                <div className="w-[774px] min-h-[250px] border-[#707070] border">
                    <div className="text-lg font-semibold p-5">My cart ({cartItems.length})</div>
                    <div className="flex flex-col gap-2 p-5">
                    {cartItems.map((book:any,index:number)=><CartBookCard key={index} index={index} book={book}/>)}
                    <div className="flex justify-end"><Button variant="contained" sx={{backgroundColor:"#3371B5"}}>Place order</Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart