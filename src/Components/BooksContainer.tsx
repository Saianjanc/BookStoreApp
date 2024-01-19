import BookCard from "./BookCard"

function BooksContainer(){
    return(<div className="w-full h-full flex justify-center">
        <div className="w-[80%]">
        <div className="flex font-[Roboto] justify-between py-8">
            <div className="flex items-center gap-2">
            <h1 className="text-2xl text-[#0A0102] font-medium">Books</h1>
            <p className="text-[#9D9D9D] text-xs">(128 Items)</p>
            </div>
        <select className="border-2 border-[#E2E2E2]">
            <option>Sort by relevance</option>
            <option>Sort by price</option>
            <option>Sort by new</option>
        </select>
        </div>
        <div className="grid grid-cols-4 gap-[94px]">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
        </div>
        </div>
    </div>)
}
export default BooksContainer