import { Star } from "@mui/icons-material"
import img1 from '../assets/books/Image 1.png'

function BookCard(){
    return(
        <div className="w-[235px] h-[275px] rounded font-[Roboto] border-[#E2E2E2] border-2">
            <div className="flex w-[233px] h-[172px] bg-[#F5F5F5] justify-center">
                <img src={img1} alt="Book1" className="w-[105px] h-[135px] mt-5"/>
            </div>
            <div className="ml-5">
            <h1 className="font-medium">Don't Make Me Think</h1>
            <p className="text-[#878787] text-sm">by Steve Krug</p>
            <div className="flex gap-1 items-center"><div className="flex justify-center items-center w-[38px] h-[24px] bg-[#388E3C] text-white rounded text-sm">4.5<Star sx={{fontSize:'small'}}/></div><p className="text-[#878787] text-sm">(20)</p></div>
            <div className="flex items-center gap-1"><h1 className="text-[15px] font-semibold">Rs. 1500</h1><p className="line-through text-[12px] text-[#878787]">Rs.2000</p></div>
            </div>
        </div>
    )
}
export default BookCard