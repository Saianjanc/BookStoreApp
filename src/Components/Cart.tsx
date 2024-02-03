import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CartBookCard from "./CartBookCard"
import { Link, useNavigate } from "react-router-dom"
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress } from "@mui/material"
import { addOrder, getCartItems, removeCartItem } from "../utils/BookService"
import { deleteCartItem, putCartList } from "../utils/store/cartSlice"
import AddressCard from "./AddressCard"

function Cart(){
    const books = useSelector((store:any)=> store.books.bookList)
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    const dataloaded = useSelector((store:any)=> store.loaded.dataLoaded)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);

    const placeOrder = ()=>{setExpanded(true)}

    const orderAddress = ()=>{setExpanded2(true)}

    const getCartList = async()=>{
        const cartList = await getCartItems()
        const bookList = cartList.map((cartBook:any)=>{return{...books.filter((book:any)=>book._id===cartBook.product_id._id)[0],cartId:cartBook._id,quantityToBuy:cartBook.quantityToBuy,user_id:cartBook.user_id}})
        dispatch(putCartList(bookList))
    }

    useEffect(()=>{getCartList()},[])

    const orderCheckout = async()=>{
        let storedData = []
        const newOrder = cartItems.map((book:any)=>book={product_id:book._id,product_name:book.bookName,product_quantity:book.quantityToBuy,product_price:book.discountPrice})
        const getOrderDate = await addOrder(newOrder)
        if(getOrderDate){navigate('/book/orderplaced')}
        if (localStorage.getItem("MyOrders")) {storedData = JSON.parse(localStorage.getItem("MyOrders")!)}
        const orderDate = getOrderDate[0].createdAt?.slice(0,10)
        storedData.push(cartItems.map((book:any)=>{return {...book,orderDate:orderDate}}))
        localStorage.setItem("MyOrders",JSON.stringify(storedData))
        cartItems.map((book:any)=>{removeCartItem(book.cartId);dispatch(deleteCartItem(book._id))})
    }
    return(
        <div className="w-full h-full flex justify-center">
            {dataloaded?
            <div className="w-[80%] font-[Roboto]">
                <div className="mt-[20px]">
                <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
                <span>My Cart</span>
                </div>
                <div className="w-[80%] mt-5 min-h-[250px] border-[#707070] border">
                    <div className="text-lg font-semibold p-5">My cart ({cartItems.length})</div>
                    <div className="flex flex-col gap-2 p-5">
                    {cartItems.length?cartItems.map((book:any,index:number)=><CartBookCard key={index} index={index} book={book}/>):<center><h1 className="text-xl">Your Cart is Empty! Add any Book to Cart!</h1></center>}
                    <div className={cartItems.length&&!expanded?"flex justify-end":"hidden"}><Button variant="contained" sx={{width:"160px",backgroundColor:"#3371B5"}} onClick={placeOrder}>Place order</Button></div>
                    </div>
                </div>
                <Accordion expanded={expanded?true:false} sx={{width:"80%",minHeight:"60px",marginTop:"10px",border:"1px solid #707070",color:"#333232"}}>
                    <AccordionSummary sx={{fontWeight:600,fontSize:"18px"}}>
                    Address Details
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                        <div className={!expanded2?"flex justify-end":"hidden"}><Button variant="outlined" sx={{color:"#A03037",borderColor:"#A03037"}}>Add New Address</Button></div>
                        <div className="w-[80%] flex justify-between">
                            <div className="w-[48%] flex flex-col"><label>Full Name</label><span className="px-5 py-2 h-[45px] border-2">{cartItems[0]?.user_id?.fullName}</span></div>
                            <div className="w-[48%] flex flex-col"><label>Mobile Number</label><span className="px-5 py-2 h-[45px] border-2">{cartItems[0]?.user_id?.phone}</span></div>
                        </div>
                        {cartItems[0]?.user_id?.address?.map((useraddress:any,index:number)=><AddressCard useraddress={useraddress} index={index}/>)}
                        <div className={!expanded2?"flex justify-end":"hidden"}><Button variant="contained" sx={{width:"160px",backgroundColor:"#3371B5"}} onClick={orderAddress}>Countinue</Button></div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded2?true:false} sx={{width:"80%",minHeight:"60px",marginTop:"10px",border:"1px solid #707070",color:"#333232"}}>
                    <AccordionSummary sx={{fontWeight:600,fontSize:"18px"}}>
                    Order Summary
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                        {cartItems.length?cartItems.map((book:any,index:number)=><CartBookCard key={index} index={-1} book={book}/>):<center><h1 className="text-xl">Your Cart is Empty! Add any Book to Cart!</h1></center>}
                        <div className="flex justify-end"><Button variant="contained" sx={{width:"160px",backgroundColor:"#3371B5"}} onClick={orderCheckout}>Checkout</Button></div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>:<CircularProgress className="m-20"/>}
        </div>
    )
}
export default Cart