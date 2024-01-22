import { useEffect, useState } from "react";
import BookCard from "./BookCard"
import { getBooks } from "../utils/BookService";

function BooksContainer(){
    const [bookList,setBookList]=useState<Array<object>>([])
    const getAllBooks = async () => {
        const data = await getBooks();
        setBookList(data)
    }

    const sort = ()=>{
        const sortSelect = (document.getElementById("sortSelect") as HTMLInputElement).value
        if(sortSelect==="low2high"){
            const sortData = [...bookList].sort((a:any,b:any)=> a.discountPrice-b.discountPrice)
            setBookList(sortData)
        }else if(sortSelect==="high2low"){
            const sortData = [...bookList].sort((a:any,b:any)=> b.discountPrice-a.discountPrice)
            setBookList(sortData)
        }else if(sortSelect==="new"){
            const sortData = [...bookList].sort((a:any,b:any)=> Date.parse(a.updatedAt)-Date.parse(b.updatedAt))
            setBookList(sortData)
        }else{
            const sortData = [...bookList].sort((a:any,b:any)=> Date.parse(a.createdAt)-Date.parse(b.createdAt))
            setBookList(sortData)
        }
    }

    useEffect(()=>{getAllBooks()},[])

    return(<div className="w-full h-full flex justify-center">
        <div className="w-[80%]">
        <div className="flex font-[Roboto] justify-between py-8">
            <div className="flex items-center gap-2">
            <h1 className="text-2xl text-[#0A0102] font-medium">Books</h1>
            <p className="text-[#9D9D9D] text-xs">({bookList.length} Items)</p>
            </div>
        <select id="sortSelect" onClick={sort} className="border-2 border-[#E2E2E2]">
            <option value={"relevance"}>Sort by relevance</option>
            <option value={"low2high"}>Price: Low to High</option>
            <option value={"high2low"}>Price: High to Low</option>
            <option value={"new"}>Newest Arrivals</option>
        </select>
        </div>
        <div className="grid grid-cols-4 gap-[94px]">
            {bookList.map((book:any,index) => (<BookCard key={book._id} index={index} book={book}/>))}
        </div>
        </div>
    </div>)
}
export default BooksContainer