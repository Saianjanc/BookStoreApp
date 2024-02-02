import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function ProfilePage(){
    const cartItems = useSelector((store:any)=> store.cart.cartItems)
    return(
    <div className="w-full h-full flex justify-center">
        <div className="w-[80%] font-[Roboto]">
            <div className="my-[20px]">
            <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
            <span>Profile</span>
            </div>
        <div className="ml-[50px]">
        <h1 className="text-[#0A0102] text-xl font-semibold">Personal Details
        <span className="ml-[50px] text-[16px] text-[#A03037] font-[300]">Edit</span>
        </h1>
        <div className="w-[50%] flex flex-col gap-2">
            <div className="w-full flex flex-col"><label>Full Name</label><span className="px-5 py-2 h-[45px] border-2 rounded">{cartItems[0]?.user_id?.fullName}</span></div>
            <div className="w-full flex flex-col"><label>Email Id</label><span className="px-5 py-2 h-[45px] border-2 rounded">{cartItems[0]?.user_id?.email}</span></div>
            <div className="w-full flex flex-col"><label>Password</label><span className="px-5 py-2 h-[45px] border-2 rounded">{cartItems[0]?.user_id?.fullName}</span></div>
            <div className="w-full flex flex-col"><label>Mobile Number</label><span className="px-5 py-2 h-[45px] border-2 rounded">{cartItems[0]?.user_id?.phone}</span></div>
        </div>
        {cartItems[0]?.user_id?.address?.map((useraddress:any,index:number)=>
        <div className="w-[50%] flex flex-col gap-2">
            <div className="mt-[50px] flex items-center"><span className="p-1 text-[16px] font-bold">{index+1}. {useraddress.addressType}</span><a className="text-xs text-[#A03037] pl-[50px]">Edit</a></div>
            <span>Address</span>
            <input className="w-full px-5 py-2 min-h-[80px] border-2" defaultValue={useraddress.fullAddress}/>
            <div className="flex justify-between">
            <div className="w-[48%] flex flex-col"><label>City/Town</label><input type="text" className="px-5 py-2 h-[45px] border-2" defaultValue={useraddress.city}/></div>
            <div className="w-[48%] flex flex-col"><label>State</label><input type="text" className="px-5 py-2 h-[45px] border-2" defaultValue={useraddress.state}/></div>
            </div>
            <div className="flex justify-end"><Button variant="contained" size="small">Save</Button></div>
        </div>)}
        </div>
        </div>
    </div>
    )
}
export default ProfilePage