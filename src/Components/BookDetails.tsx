import bookBack from '../assets/bookBack.png'
import { AddCircleOutline, Favorite, RemoveCircleOutline, Star } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Button, IconButton, Rating, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, updateCartList } from '../utils/store/cartSlice'
import { Link, useParams } from 'react-router-dom'

import img1 from '../assets/books/Image 1.png'
import img2 from '../assets/books/Image 2.png'
import img3 from '../assets/books/Image 3.png'
import img4 from '../assets/books/Image 4.png'
import img5 from '../assets/books/Image 5.png'
import img6 from '../assets/books/Image 6.png'
import img7 from '../assets/books/Image 7.png'
import img8 from '../assets/books/Image 8.png'
import img9 from '../assets/books/Image 9.png'

interface IBookData{
    bookName:string,
    description:string,
    price:number,
    author:string,
    discountPrice:number,
    bookImage:string
}

function BookDetails(){
    const [bookInfo,setBookInfo] = useState<IBookData>()
    const {bookId} = useParams()
    const [value, setValue] = useState<number | null>(2)
    const [isInCart, setIsInCart] = useState(false)
    const dispatch = useDispatch()
    
    const books = useSelector((store:any)=> store.books.bookList)
    const dataloaded = useSelector((store:any)=> store.loaded.dataLoaded)
    const cartItems = useSelector((store:any)=> store.cart.cartItems)

    const bookIndex = books.findIndex((book:any)=>book._id===bookId)
    const bookFront = bookInfo?.bookImage
    const [showImg,setShowImg] = useState(bookFront)
    
    useEffect(() => {
        setBookInfo(books.filter((book:any)=>book._id===bookId)[0])
    },[books])

    useEffect(()=>{
        setShowImg(bookFront)
    },[bookInfo])
   
    const handleAddToCart = ()=>{
        setIsInCart(true)
        dispatch(addItemsToCart({...bookInfo,quantity:1}))
    }

    const handleAdd = ()=>{
        const bookQty = document.getElementById('bookQty')as HTMLInputElement
        let Qty = parseInt(bookQty.value,10)
        bookQty.value=(Qty+1).toString()
        dispatch(updateCartList({...cartItems,quantity:bookQty.value}))
    }

    const handleRemove = ()=>{
        const bookQty = document.getElementById('bookQty')as HTMLInputElement
        let Qty = parseInt(bookQty.value,10)
        if (Qty>1) {
        bookQty.value=(Qty-1).toString()
        dispatch(updateCartList({...cartItems,quantity:bookQty.value}))
        }else{
            setIsInCart(false)
        }
    }
    return(
    <div className="w-full h-full flex justify-center">
        {dataloaded?
        <div className="w-[80%] font-[Roboto]">
            <div className="mt-[20px]">
            <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
            <span>Book({bookIndex+1})</span>
            </div>
            <div className='mt-[40px] flex gap-1'>
                <div>
                <img onClick={()=>setShowImg(bookFront)} style={{borderColor:showImg===bookFront?"#7C1E1E":"#D1D1D1"}} src={bookFront} className='w-[35px] p-1 border-2 border-[#D1D1D1]' alt='Book Front' />
                <img onClick={()=>setShowImg(bookBack)} style={{borderColor:showImg===bookBack?"#7C1E1E":"#D1D1D1"}} src={bookBack} className='w-[35px] p-1 mt-2 border-2 border-[#D1D1D1]' alt='Book Back' />
                </div>
                <div className='w-[968px] h-[585px] flex'>
                    <div>
                    <img className='px-[40px] py-5 w-[362px] h-[413px] border-2 border-[#D1D1D1]' src={showImg} alt='Book Front'/>
                    <div className='flex justify-between py-5'>
                    {isInCart?<div className='flex gap-1 items-center'><IconButton onClick={handleRemove}><RemoveCircleOutline fontSize='large'/></IconButton><input id='bookQty' value={1} className='w-20 h-10 text-center text-lg border-2 rounded' type='number' readOnly/><IconButton onClick={handleAdd}><AddCircleOutline fontSize='large'/></IconButton></div>:<Button variant='contained' sx={{width:"170px", height:"40px",backgroundColor:"#A03037"}} onClick={handleAddToCart}>Add to Bag</Button>}
                    <Button variant='contained' sx={{width:"170px", height:"40px",backgroundColor:"#333333"}} onClick={handleAddToCart}><Favorite/>Wishlist</Button>
                    </div>
                    </div>
                    <div className="ml-5 flex flex-col gap-2">
                       <h1 className="font-medium text-[28px]">{bookInfo?.bookName}</h1>
                       <p className="text-[#878787] text-[18px]">{bookInfo?.author}</p>
                       <div className="flex gap-1 items-center"><div className="flex justify-center items-center w-[54px] h-[24px] bg-[#388E3C] text-white rounded text-sm">4.5<Star sx={{fontSize:'small'}}/></div><p className="text-[#878787] text-sm">(20)</p></div>
                       <div className="flex items-center gap-1"><h1 className="text-[30px] font-semibold">{bookInfo?.discountPrice}</h1><p className="line-through text-[15px] text-[#878787]">{bookInfo?.price}</p></div>
                       <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded"/>
                       <li className='text-[#878787] mt-5'><span className='relative left-[-10px]'>Book Detail</span></li>
                       <p className='text-[#373434] w-[87%] text-xs mb-5'>{bookInfo?.description}</p>
                       <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded"/>
                       <p className='text-lg font-medium'>Customer Feedback</p>
                       <div className='flex flex-col gap-2 w-[560px] h-[192px] bg-[#F5F5F5] p-2'>
                       <span>Overall rating</span>
                       <div>
                       <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                        />
                        </div>
                        <div className='w-[528px] h-[64px] bg-white'>
                            <input className='text-[#707070] w-[300px]' placeholder='Write your review'/>
                        </div>
                        <div className='flex justify-end px-4'><Button variant='contained' size='small' sx={{width:'76px', backgroundColor:"#3371B5"}}>Submit</Button></div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        :<div className="w-[80%] font-[Roboto] animate-pulse">
            <div className="mt-[20px] flex gap-1">
            <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
            <div className='mt-1 w-10 h-4 bg-[lightgray]'/>
            </div>
            <div className='mt-[40px] flex gap-1'>
                <div>
                <div className='w-[35px] h-10 bg-[lightgray]'/>
                <div className='w-[35px] h-10 mt-2 bg-[lightgray]'/>
                </div>
                <div className='w-[968px] h-[585px] flex'>
                    <div>
                    <div className='px-[40px] py-5 w-[362px] h-[413px] bg-[lightgray]'/>
                    <div className='flex justify-between py-5'>
                    <div className='w-[170px] h-[40px] bg-[#A03037] rounded'/>
                    <div className='w-[170px] h-[40px] bg-[#333333] rounded'/>
                    </div>
                    </div>
                    <div className="ml-5 flex flex-col gap-2">
                       <div className="h-5 w-40 bg-[lightgray] rounded"/>
                       <div className="h-5 w-10 bg-[lightgray] rounded"/>
                       <div className="flex gap-1 items-center"><div className="flex justify-center items-center w-[54px] h-[24px] bg-[#388E3C] text-white rounded text-sm"></div></div>
                       <div className="flex items-center gap-1"><div className="w-20 h-[30px] bg-[lightgray] rounded"></div><p className="w-10 h-5 bg-[lightgray] rounded"></p></div>
                       <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded"/>
                       <li className='mt-5 flex'><div className='w-20 h-5 bg-[lightgray] rounded'/></li>
                       <div className="h-2 w-60 bg-[lightgray] rounded"/>
                       <div className="h-2 w-20 bg-[lightgray] rounded"/>
                       <div className="h-2 w-10 bg-[lightgray] rounded"/>
                       <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded"/>
                       <div className="h-2 w-40 bg-[lightgray] rounded"/>
                       <div className='flex flex-col gap-2 w-[560px] h-[192px] bg-[#F5F5F5] p-2'>
                       <div className='bg-[lightgray] h-2 w-20 rounded'/>
                       <div className='bg-[lightgray] h-2 w-10 rounded'></div>
                       <div className='w-[528px] h-[64px] bg-[lightgray] rounded'>
                       </div>
                       <div className='flex justify-end px-4'><div className=' w-[76px] h-[24px] bg-[lightgray] rounded'></div></div>
                       </div>
                    </div>
                </div>
              </div>
            </div>}
    </div>
    )
}
export default BookDetails