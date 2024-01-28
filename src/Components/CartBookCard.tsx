import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { removeCartItem, updateCartQty } from "../utils/BookService"
import { useDispatch } from "react-redux"
import { deleteCartItem } from "../utils/store/cartSlice"

function CartBookCard({book,index}:{book:any,index:number}){
    const dispatch = useDispatch()

    const removeItem = async()=>{
        await removeCartItem(book.cartId)
        dispatch(deleteCartItem(book._id))
    }

    const handleAdd = ()=>{
        const bookQty = document.getElementById(`bookQty${index}`)as HTMLInputElement
        let Qty = parseInt(bookQty.value,10)
        bookQty.value=(Qty+1).toString()
        // dispatch(updateCartList({...cartItems,quantity:bookQty.value}))
        updateCartQty(book.cartId,bookQty.value)
    }

    const handleRemove = ()=>{
        const bookQty = document.getElementById(`bookQty${index}`)as HTMLInputElement
        let Qty = parseInt(bookQty.value,10)
        if (Qty>1) {
        bookQty.value=(Qty-1).toString()
        // dispatch(updateCartList({...cartItems,quantity:bookQty.value}))
        updateCartQty(book.cartId,bookQty.value)
        }
    }

    return(
        <div className="flex gap-10 w-[300px] h-[150px] rounded font-[Roboto]">
            <img src={book.bookImage} alt={`${book.bookName} Img`} className="w-[80px] h-[100px]"/>
            <div className="flex flex-col gap-2">
            <h1 className="font-medium">{book.bookName}</h1>
            <p className="text-[#878787] text-sm">by {book.author}</p>
            <div className="flex items-center gap-1"><h1 className="text-[18px] font-bold">Rs.{book.discountPrice}</h1><p className="line-through text-[12px] text-[#878787]">Rs.{book.price}</p></div>
            <div className='flex gap-1 items-center ml-[-10px]'><IconButton onClick={handleRemove} disabled={book.quantityToBuy===1?true:false}><RemoveCircleOutline/></IconButton><input id={`bookQty${index}`} value={book.quantityToBuy} className='w-[40px] h-[24px] text-center border-2 rounded' type='number' readOnly/><IconButton onClick={handleAdd}><AddCircleOutline/></IconButton><Button onClick={removeItem}>Remove</Button></div>
            </div>
        </div>
    )
}
export default CartBookCard