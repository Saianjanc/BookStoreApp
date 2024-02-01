import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { removeCartItem, updateCartQty } from "../utils/BookService"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, updateCartList } from "../utils/store/cartSlice"

function CartBookCard({book,index}:{book:any,index:number}){
    const dispatch = useDispatch()
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    const cartBook = cartItems.filter((cartbook:any)=>cartbook._id===book._id)[0]

    const removeItem = async()=>{
        await removeCartItem(book.cartId)
        dispatch(deleteCartItem(book._id))
    }

    const handleAdd = ()=>{
        let Qty = cartBook.quantityToBuy
        if (Qty<=book.quantity) {
        Qty++
        dispatch(updateCartList({quantityToBuy:Qty,id:book._id}))
        updateCartQty(book.cartId,Qty)
        }
    }

    const handleRemove = ()=>{
        let Qty = cartBook.quantityToBuy
        if (Qty>1) {
        Qty--
        dispatch(updateCartList({quantityToBuy:Qty,id:book._id}))
        updateCartQty(book.cartId,Qty)
        }
    }

    return(
        <div className="flex gap-10 w-[300px] h-[150px] rounded font-[Roboto]">
            <img src={book.bookImage} alt={`${book.bookName} Img`} className="w-[80px] h-[100px]"/>
            <div className="flex flex-col gap-2">
            <h1 className="font-medium">{book.bookName}</h1>
            <p className="text-[#878787] text-sm">by {book.author}</p>
            <div className="flex items-center gap-1"><h1 className="text-[18px] font-bold">Rs.{book.discountPrice}</h1><p className="line-through text-[12px] text-[#878787]">Rs.{book.price}</p></div>
            {index===-1?<></>:<div className='flex gap-1 items-center ml-[-10px]'><IconButton onClick={handleRemove} disabled={book.quantityToBuy===1?true:false}><RemoveCircleOutline/></IconButton><div className='w-[40px] h-[28px] text-center border-2 rounded'>{book.quantityToBuy}</div><IconButton onClick={handleAdd} disabled={book.quantityToBuy<=book.quantity?false:true}><AddCircleOutline/></IconButton><Button onClick={removeItem}>Remove</Button></div>}
            </div>
        </div>
    )
}
export default CartBookCard