import React,{ useState } from "react"
import { Outlet } from "react-router-dom";
import { PersonOutline, Search } from "@mui/icons-material";
import { Button, InputAdornment, Menu, TextField } from "@mui/material";
import logo from '../assets/logo.svg'
import cart from '../assets/cart.svg'

function Home() {
    const [menu, setMenu] = useState(null); 
    const open = Boolean(menu); 
    const userName = localStorage.getItem("userName")
    const userEmail = localStorage.getItem("userEmail")

    const handleClick = (e:any) => {
        setMenu(e.currentTarget); 
    }
    return(<>
    <div className='w-full h-[60px] mt-0 flex items-center sticky top-0 bg-[#A03037] z-20 justify-around gap-20'>
        <div className="w-[50%] flex gap-[42px]">
        <div className='h-[48px] pr-[30px]'>
            <a href='/home' className='flex gap-[5px] items-center'>
            <img src={logo} className='w-[40px] h-[40px]' alt='Head Logo'/>
            <p className='text-white text-2xl font-sans'>Bookstore</p>
            </a>
        </div>
        <TextField className="w-[95%] h-full bg-white rounded" placeholder="Search" size="small" type="search"
        InputProps={{startAdornment: (<InputAdornment position="start"><Search/></InputAdornment>)}}/></div>
        <div className='flex xl:mr-[20px] gap-20'>
            <div onClick={handleClick} className="flex flex-col items-center text-white"><PersonOutline sx={{color:"white", fontSize:30}}/><p>Profile</p></div>
            <div className="flex flex-col items-center text-white">
            <img src={cart} alt="cart" width="28px"/> 
            <p>Cart</p>
            </div>
        </div>
        <Menu id="simple-menu" open={open} onClose={()=>setMenu(null)}
        anchorEl={menu}>
        <div className='w-[240px] flex flex-col items-center gap-[20px]'>
            <div className="flex flex-col mt-[10px] ml-[80px]">
            <span>{userName}</span>
            <span>{userEmail}</span>
            </div>
        <Button variant="contained">Sign out</Button>
        </div>
      </Menu>
    </div>
    <Outlet />
    <div className='flex items-center w-full h-[50px] mt-10 bg-[#2E1D1E] text-white'>
        <p className="ml-20">Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
    </div>
    </>)
}
export default Home