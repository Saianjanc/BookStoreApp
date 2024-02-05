import { Button } from "@mui/material";
import { useState } from "react";
import { editUserAddress } from "../utils/BookService";

function AddressCard({useraddress,index}:{useraddress:any,index:number}) {
    const [editAddress, setEditAddress] = useState(false);
    const newAddress = async()=>{
        const addressObj={
            "addressType": useraddress.addressType,
            "fullAddress": (document.getElementById('fullAddress')as HTMLInputElement).value,
            "city": (document.getElementById('city')as HTMLInputElement).value,
            "state": (document.getElementById('state')as HTMLInputElement).value
        }
        setEditAddress(false)
        await editUserAddress(addressObj)
    }
    return (
        <div key={index}>
            <div className="w-[80%] mt-[50px] flex items-center justify-between"><div><input type="radio" name="address" checked /> <span className="p-1 text-[16px] font-bold">{index + 1}. {useraddress.addressType}</span>{editAddress ?<a className="text-xs text-[#A03037] pl-[50px]" onClick={() => setEditAddress(false)}>Cancel</a>:<a className="text-xs text-[#A03037] pl-[50px]" onClick={() => setEditAddress(true)}>Edit</a>}</div>
            {editAddress ?<Button variant="contained" size="small" sx={{width:"123px",height:"34px"}} onClick={newAddress}>Save</Button>:<></>}
            </div>
            <div className="w-[80%] flex flex-col gap-1 mt-2">
                <span>Address</span>
                {editAddress ? <div><input id="fullAddress" className="w-full px-5 py-2 min-h-[80px] border-2" defaultValue={useraddress.fullAddress} />
                    <div className="flex justify-between">
                        <div className="w-[48%] flex flex-col"><label>City/Town</label><input id="city" type="text" className="px-5 py-2 h-[45px] border-2" defaultValue={useraddress.city} /></div>
                        <div className="w-[48%] flex flex-col"><label>State</label><input id="state" type="text" className="px-5 py-2 h-[45px] border-2" defaultValue={useraddress.state} /></div>
                    </div>
                </div> : <span>{useraddress.fullAddress + ", " + useraddress.city + " , " + useraddress.state}</span>}
            </div>
        </div>
    )
}
export default AddressCard