import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import WishBookCard from "./WishBookCard"
import { CircularProgress } from "@mui/material"

function WishList (){
    const WishListItems = useSelector((store:any)=> store.wish.wishListItems)
    const dataloaded = useSelector((store:any)=> store.loaded.dataLoaded)
    return(
        <div className="w-full h-full flex justify-center">
            {dataloaded?
            <div className="w-[80%] font-[Roboto]">
                <div className="mt-[20px]">
                <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
                <span>My Wishlist</span>
                </div>
                <div className="w-full mt-5 min-h-[250px] border-[#707070] border">
                    <div className="text-lg font-semibold py-5 px-10 bg-[#F5F5F5]">My Wishlist ({WishListItems.length})</div>
                    <div className="flex flex-col gap-2">
                    {WishListItems.map((book:any,index:number)=><WishBookCard key={index} book={book}/>)}
                    </div>
                </div>
            </div>:<CircularProgress/>}
        </div>
    )
}

export default WishList