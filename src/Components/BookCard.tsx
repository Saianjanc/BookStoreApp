import { Star } from "@mui/icons-material"
import { Link } from "react-router-dom"

function BookCard({book}:{book:any}){
    return(
        <Link to={`/book/${book._id}`} className="w-[235px] h-[275px] rounded font-[Roboto] border-[#E2E2E2] border-2">
            <div className="flex w-[233px] h-[172px] bg-[#F5F5F5] justify-center">
                <img src={book.bookImage} alt={`${book.bookName} Img`} className="w-[105px] h-[135px] mt-5"/>
            </div>
            <div className="ml-5">
            <h1 className="font-medium">{book.bookName}</h1>
            <p className="text-[#878787] text-sm">by {book.author}</p>
            <div className="flex gap-1 items-center"><div className="flex justify-center items-center w-[38px] h-[24px] bg-[#388E3C] text-white rounded text-sm">4.5<Star sx={{fontSize:'small'}}/></div><p className="text-[#878787] text-sm">(20)</p></div>
            <div className="flex items-center gap-1"><h1 className="text-[15px] font-semibold">Rs.{book.discountPrice}</h1><p className="line-through text-[12px] text-[#878787]">Rs.{book.price}</p></div>
            </div>
        </Link>
    )
}
export default BookCard