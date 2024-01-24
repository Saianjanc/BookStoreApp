import { useEffect, useState } from "react";
import BookCard from "./BookCard"
import { useDispatch, useSelector } from "react-redux";
import { getBookList } from "../utils/store/bookSlice";
import { CircularProgress } from "@mui/material";

function BooksContainer(){
    const books = useSelector((store:any)=> store.books.bookList)
    const dataloaded = useSelector((store:any)=> store.loaded.dataLoaded)
    const dispatch = useDispatch()

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

    return(<div className="w-full h-full flex justify-center">
        {dataloaded?
        <div className="w-[80%]">
        <div className="flex font-[Roboto] justify-between py-8">
            <div className="flex items-center gap-2">
            <h1 className="text-2xl text-[#0A0102] font-medium">Books</h1>
            <p className="text-[#9D9D9D] text-xs">({books.length} Items)</p>
            </div>
        <select id="sortSelect" onClick={sort} className="border-2 border-[#E2E2E2]">
            <option value={"relevance"}>Sort by relevance</option>
            <option value={"low2high"}>Price: Low to High</option>
            <option value={"high2low"}>Price: High to Low</option>
            <option value={"new"}>Newest Arrivals</option>
        </select>
        </div>
        <div className="grid grid-cols-4 gap-[94px]">
            {books.map((book:any) => (<BookCard key={book._id} book={book}/>))}
        </div>
        </div>:<CircularProgress className="m-20"/>}
    </div>)
}
export default BooksContainer