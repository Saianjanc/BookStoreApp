import { FavoriteBorder, MarkunreadMailboxOutlined, PersonOutline, Search } from "@mui/icons-material";
import { Badge, Button, InputAdornment, Menu, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBooks, getCartItems, getWishlistItems } from "../utils/BookService";
import { getBookList } from "../utils/store/bookSlice";
import logo from '../assets/logo.svg'
import cart from '../assets/cart.svg'
import { useDispatch, useSelector } from "react-redux";
import { setLoaded } from "../utils/store/loadSlice";

import img1 from '../assets/books/Image 1.png'
import img2 from '../assets/books/Image 2.png'
import img3 from '../assets/books/Image 3.png'
import img4 from '../assets/books/Image 4.png'
import img5 from '../assets/books/Image 5.png'
import img6 from '../assets/books/Image 6.png'
import img7 from '../assets/books/Image 7.png'
import img8 from '../assets/books/Image 8.png'
import img9 from '../assets/books/Image 9.png'
import { putCartList } from "../utils/store/cartSlice";
import { putWishList } from "../utils/store/wishSlice";

function Header(){    
    const [menu, setMenu] = useState(null); 
    const [name, setName] = useState("Profile"); 
    const open = Boolean(menu);

    const handleClick = (e:any) => {
        setMenu(e.currentTarget); 
    }

    const imagesList = [img1,img2,img3,img4,img5,img6,img7,img8,img9]

    const books = useSelector((store:any)=> store.books.bookList)
    const cartItems = useSelector((store:any)=> store.cart.cartItems)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username =  localStorage.getItem('userName')

    const getAllBooks = async() => {
        const data = await getBooks();
        const newData = data.map((book:any,index:number)=>{return{...book,bookImage:imagesList[index%8]}})
        dispatch(getBookList(newData))
        if(username)setName(username)
    }

    const getCartList = async()=>{
        if(books.length&&username){
        const cartList = await getCartItems()
        if(cartList.length){localStorage.setItem('userName',cartList[0].user_id.fullName)}
        const bookList = cartList.map((cartBook:any)=>{return{...books.filter((book:any)=>book._id===cartBook.product_id._id)[0],cartId:cartBook._id,quantityToBuy:cartBook.quantityToBuy,user_id:cartBook.user_id}})
        dispatch(putCartList(bookList))
        }
    }

    const getWishList =async () => {
        if(books.length&&username){
        const wishList = await getWishlistItems()
        const bookList = wishList.map((wishBook:any)=>{return books.filter((book:any)=>book._id===wishBook.product_id._id)[0]})
        dispatch(putWishList(bookList))
        if (bookList[0]!==undefined) {
            dispatch(setLoaded(true))
        }else if(!bookList.length){dispatch(setLoaded(true))}
        }
        if(!username){
            dispatch(setLoaded(true))
        }
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userName')
        window.location.reload()
    }

    const searchBook = (e:any) => {
        navigate(`find/${e.target.value.toLowerCase()}`)
    }

    useEffect(()=>{getAllBooks()}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[])
    useEffect(()=>{getCartList();getWishList()}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[books])

    return(<div className='w-full h-[60px] mt-0 flex items-center bg-[#A03037] z-20 justify-around gap-20'>
    <div className="w-[50%] flex gap-[42px]">
    <div className='h-[48px] pr-[30px]'>
        <Link to={'/book'} className='flex gap-[5px] items-center'>
        <img src={logo} className='w-[40px] h-[40px]' alt='Head Logo'/>
        <p className='text-white text-2xl font-sans'>Bookstore</p>
        </Link>
    </div>
    <TextField className="w-[95%] h-full bg-white rounded" id="search" placeholder="Search" size="small" type="search"
    onKeyUp={searchBook} InputProps={{startAdornment: (<InputAdornment position="start"><Search/></InputAdornment>)}}/></div>
    <div className='flex gap-20 items-center'>
        <div onClick={handleClick} className="flex flex-col items-center text-white"><PersonOutline sx={{color:"white", fontSize:30}}/><p>{name}</p></div>
        <Link to={"cart"} className="flex flex-col items-center text-white mt-[4px]">
            <Badge badgeContent={cartItems.length} color="primary" sx={{'.css-zza0ns-MuiBadge-badge':{backgroundColor:'white',color:'black',top:'5px'}}}>
            <img src={cart} alt="cart" width="24px"/>
            </Badge>
            <p className="leading-tight">Cart</p>
        </Link>
    </div>
    <Menu id="simple-menu" open={open} onClose={()=>setMenu(null)}
    anchorEl={menu}>
    <div className='w-[240px] flex flex-col gap-[12px] pl-8'>
        {username?<span className="font-bold">Hello {name},</span>:<span className="font-bold">Welcome</span>}
        {username?<Link to={'profile'}><PersonOutline/>Profile</Link>:<Link to={'/'} className="text-[12px] text-[#878787] mt-[-10px] mb-[10px]">To access account and manage orders<Button variant="outlined" sx={{width:'150px',height:'40px',borderColor:"#A03037",color:"#A03037",marginTop:"10px"}}>LOGIN/SIGNUP</Button></Link>}
        <Link to={'orders'}><MarkunreadMailboxOutlined/> My Orders</Link>
        <Link to={'wishlist'}><FavoriteBorder/> My Wishlist</Link>
        {username?<Button variant="outlined" sx={{width:'150px',height:'40px',borderColor:"#A03037",color:"#A03037"}} onClick={logout}>Logout</Button>:<></>}
    </div>
  </Menu>
</div>)
}
export default Header