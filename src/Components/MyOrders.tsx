import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import WishBookCard from "./WishBookCard"
import { CircularProgress } from "@mui/material"
import { HeartBroken } from "@mui/icons-material"

function MyOrders (){
    const dataloaded = useSelector((store:any)=> store.loaded.dataLoaded)
    return(
        <div className="w-full h-full flex justify-center">
            {dataloaded?
            <div className="w-[80%] font-[Roboto]">
                <div className="mt-[20px]">
                <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
                <span>My Orders</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 mt-5 min-h-[200px] border-[#707070] border">
                    {true?<h1 className="text-xl">You have not Ordered Anything!</h1>:<h1></h1>}
                </div>
            </div>:<CircularProgress/>}
        </div>
    )
}

export default MyOrders