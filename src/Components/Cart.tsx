import { useState } from "react"
import { useSelector } from "react-redux"
import CartBookCard from "./CartBookCard"
import { Link } from "react-router-dom"
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress } from "@mui/material"
import { addOrder } from "../utils/BookService"

function Cart(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    const dataloaded = useSelector((store:any)=> store.loaded.dataLoaded)


    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);

    const placeOrder = ()=>{setExpanded(true)}

    const orderAddress = ()=>{setExpanded2(true)}

    const orderCheckout = async()=>{
        const newOrder = cartItems.map((book:any)=>book={product_id:book._id,product_name:book.bookName,product_quantity:book.quantityToBuy,product_price:book.discountPrice})
        const orderDate = await addOrder(newOrder)
        localStorage.setItem("MyOrders",JSON.stringify(cartItems))
        localStorage.setItem("OrderDate",orderDate[0].createdAt)
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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt at, in eligendi repudiandae ex ut omnis consectetur porro ullam necessitatibus deserunt sint dolorum labore similique aliquam iste consequatur laboriosam quae.
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
                        {cartItems.length?cartItems.map((book:any,index:number)=><CartBookCard key={index} index={index} book={book}/>):<center><h1 className="text-xl">Your Cart is Empty! Add any Book to Cart!</h1></center>}
                        <div className="flex justify-end"><Button variant="contained" sx={{width:"160px",backgroundColor:"#3371B5"}} onClick={orderCheckout}>Checkout</Button></div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>:<CircularProgress className="m-20"/>}
        </div>
    )
}
export default Cart