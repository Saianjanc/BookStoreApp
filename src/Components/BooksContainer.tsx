import { useEffect, useState } from "react";
import BookCard from "./BookCard"
import { getBooks } from "../utils/BookService";

function BooksContainer(){
    const [bookList,setBookList]=useState<Array<object>>([])
    const getAllBooks = async () => {
        const data = await getBooks();
        setBookList(data)
    }

    useEffect(()=>{getAllBooks()},[])

    return(<div className="w-full h-full flex justify-center">
        <div className="w-[80%]">
        <div className="flex font-[Roboto] justify-between py-8">
            <div className="flex items-center gap-2">
            <h1 className="text-2xl text-[#0A0102] font-medium">Books</h1>
            <p className="text-[#9D9D9D] text-xs">({bookList.length} Items)</p>
            </div>
        <select className="border-2 border-[#E2E2E2]">
            <option>Sort by relevance</option>
            <option>Sort by price</option>
            <option>Sort by new</option>
        </select>
        </div>
        <div className="grid grid-cols-4 gap-[94px]">
            {bookList.map((book:any,index) => (<BookCard key={book._id} index={index} book={book}/>))}
        </div>
        </div>
    </div>)
}
export default BooksContainer