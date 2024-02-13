import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import BookCard from "./BookCard"
import { CircularProgress } from "@mui/material"
import { getBookList } from "../utils/store/bookSlice"
import { useEffect, useState } from "react"

function SearchBook(){
    const bookName = useParams()
    const dataloaded = useSelector((store:any)=> store.loaded.dataLoaded)
    const books = useSelector((store:any)=> store.books.bookList)
    const dispatch = useDispatch()
    const [book,setBook] = useState([])

    const sort = ()=>{
        const sortSelect = (document.getElementById("sortSelect") as HTMLInputElement).value
        if(sortSelect==="low2high"){
            const sortData = [...books].sort((a:any,b:any)=> a.discountPrice-b.discountPrice)
            dispatch(getBookList(sortData))
        }else if(sortSelect==="high2low"){
            const sortData = [...books].sort((a:any,b:any)=> b.discountPrice-a.discountPrice)
            dispatch(getBookList(sortData))
        }else if(sortSelect==="new"){
            const sortData = [...books].sort((a:any,b:any)=> Date.parse(a.updatedAt)-Date.parse(b.updatedAt))
            dispatch(getBookList(sortData))
        }else{
            const sortData = [...books].sort((a:any,b:any)=> Date.parse(a.createdAt)-Date.parse(b.createdAt))
            dispatch(getBookList(sortData))
        }
    }
    useEffect(()=>{setBook(books.filter((ele:any)=>{if(ele.bookName.toLowerCase().includes(bookName.bookName))return(ele)}))},[books,bookName])
    
    return(<div className="w-full h-full flex justify-center text-center">
    {dataloaded?
    <div className="w-[80%]">
    <div className="flex font-[Roboto] justify-between py-8">
        <div className="flex items-center gap-2">
        <h1 className="text-2xl text-[#0A0102] font-medium">Books</h1>
        <p className="text-[#9D9D9D] text-xs">({book.length} Items)</p>
        </div>
    <select id="sortSelect" onClick={sort} className="border-2 border-[#E2E2E2]">
        <option value={"relevance"}>Sort by relevance</option>
        <option value={"low2high"}>Price: Low to High</option>
        <option value={"high2low"}>Price: High to Low</option>
        <option value={"new"}>Newest Arrivals</option>
    </select>
    </div>
    {book.length?
    <div className="grid grid-cols-4 gap-[94px]">
        {book.map((book:any) => (<BookCard key={book._id} book={book}/>))}
    </div>:<h1 className="text-4xl">Book Not Found! Enter a Book Name to Search</h1>}
    </div>:<CircularProgress className="p-20"/>
    }
    </div>)
}
export default SearchBook