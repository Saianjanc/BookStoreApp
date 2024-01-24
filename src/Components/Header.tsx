import { PersonOutline, Search } from "@mui/icons-material";
import { Button, InputAdornment, Menu, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../utils/BookService";
import { getBookList } from "../utils/store/bookSlice";
import logo from '../assets/logo.svg'
import cart from '../assets/cart.svg'
import { useDispatch } from "react-redux";
import { setLoaded } from "../utils/store/loadSlice";

function Header(){
    const [menu, setMenu] = useState(null); 
    const open = Boolean(menu);

    const handleClick = (e:any) => {
        setMenu(e.currentTarget); 
    }

    const dispatch = useDispatch()

    const getAllBooks = async() => {
        const data = await getBooks();
        const newData = data.map((book:any,index:number)=>{return{...book,bookImage:index%8}})
        dispatch(getBookList(newData))
        dispatch(setLoaded(true))
    }

    useEffect(()=>{getAllBooks()},[])

    return(<div className='w-full h-[60px] mt-0 flex items-center sticky top-0 bg-[#A03037] z-20 justify-around gap-20'>
    <div className="w-[50%] flex gap-[42px]">
    <div className='h-[48px] pr-[30px]'>
        <Link to={'/book'} className='flex gap-[5px] items-center'>
        <img src={logo} className='w-[40px] h-[40px]' alt='Head Logo'/>
        <p className='text-white text-2xl font-sans'>Bookstore</p>
        </Link>
    </div>
    <TextField className="w-[95%] h-full bg-white rounded" placeholder="Search" size="small" type="search"
    InputProps={{startAdornment: (<InputAdornment position="start"><Search/></InputAdornment>)}}/></div>
    <div className='flex xl:mr-[20px] gap-20 mt-1'>
        <div onClick={handleClick} className="flex flex-col items-center text-white"><PersonOutline sx={{color:"white", fontSize:30}}/><p>Profile</p></div>
        <Link to={"cart"} className="flex flex-col items-center text-white">
        <img src={cart} alt="cart" width="28px"/> 
        <p>Cart</p>
        </Link>
    </div>
    <Menu id="simple-menu" open={open} onClose={()=>setMenu(null)}
    anchorEl={menu}>
    <div className='w-[240px] flex flex-col items-center gap-[20px]'>
        <div className="flex flex-col mt-[10px] ml-[80px]">
        </div>
    <Button variant="contained">Sign out</Button>
    </div>
  </Menu>
</div>)
}
export default Header