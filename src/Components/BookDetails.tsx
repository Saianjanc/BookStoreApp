import bookBack from '../assets/bookBack.png'
import { AddCircleOutline, Favorite, RemoveCircleOutline, Star } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Button, IconButton, Rating } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, updateCartList } from '../utils/store/cartSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addCartItem, addWishList, bookFeedback, getFeedback, updateCartQty } from '../utils/BookService'
import { addWishListItem } from '../utils/store/wishSlice'
import { addReview, getReviewList } from '../utils/store/reviewSlice'

interface IBookData {
    bookName: string,
    description: string,
    price: number,
    author: string,
    discountPrice: number,
    bookImage: string,
    quantity: number
}

function BookDetails() {
    const [bookInfo, setBookInfo] = useState<IBookData>()
    const { bookId } = useParams()
    const [value, setValue] = useState<number | null>(2)
    const [isInCart, setIsInCart] = useState<boolean>()
    const [wishList, setWishList] = useState<boolean>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const books = useSelector((store: any) => store.books.bookList)
    const dataloaded = useSelector((store: any) => store.loaded.dataLoaded)
    const cartItems = useSelector((store: any) => store.cart.cartItems)
    const wishListItems = useSelector((store: any) => store.wish.wishListItems)
    const feedBackList = useSelector((store: any) => store.review.reviewList)

    const bookIndex = books.findIndex((book: any) => book._id === bookId)
    const bookFront = bookInfo?.bookImage
    const [showImg, setShowImg] = useState(bookFront)
    const cartId = cartItems.filter((book: any) => book._id === bookId)[0]
    const wishId = wishListItems.filter((book: any) => book?._id === bookId)[0]
    const username = localStorage.getItem('userName')
    useEffect(() => {
        setBookInfo(books.filter((book: any) => book._id === bookId)[0])
        if (cartId?.cartId) {
            setIsInCart(true)
        }
        if (wishId?._id) {
            setWishList(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books, cartItems])

    useEffect(() => { getReviews() }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])
    useEffect(() => {
        setShowImg(bookFront)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookInfo])

    const handleAddToCart = async () => {
        if(username){
        const newcartId = await addCartItem(bookId!)
        dispatch(addItemsToCart({ ...bookInfo, quantityToBuy: 1, cartId: newcartId._id, user_id: newcartId.user_id }))}
        else{navigate("/")}
    }

    const handleAdd = () => {
        let Qty = cartId.quantityToBuy
        if (Qty < cartId.quantity) {
            Qty++
            dispatch(updateCartList({ quantityToBuy: Qty, id: bookId }))
            updateCartQty(cartId.cartId, Qty)
        }
    }

    const handleRemove = () => {
        let Qty = cartId.quantityToBuy
        if (Qty > 1) {
            Qty--
            dispatch(updateCartList({ quantityToBuy: Qty, id: bookId }))
            updateCartQty(cartId.cartId, Qty)
        }
    }

    const handleWishList = () => {
        if(username){
        addWishList(bookId!)
        dispatch(addWishListItem(bookInfo))
        setWishList(true)
        }else{navigate("/")}
    }

    const sendFeeback = async () => {
        if(username){
        const comment = (document.getElementById('comment') as HTMLInputElement)
        const newdata = await bookFeedback(bookId!, value!, comment.value)
        dispatch(addReview({ ...newdata, user_id: { _id: newdata.user_id, fullName: username } }))
        setValue(0)
        comment.value = ''
        }else{navigate("/")}
    }

    const getReviews = async () => {
        if(username){
        const feedback = await getFeedback(bookId!)
        dispatch(getReviewList(feedback))}
    }

    return (
        <div className="w-full h-full flex justify-center">
            {dataloaded ?
                <div className="w-[80%] font-[Roboto]">
                    <div className="mt-[20px]">
                        <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
                        <span>Book({bookIndex + 1})</span>
                    </div>
                    <div className='mt-[40px] flex gap-1'>
                        <div>
                            <img onClick={() => setShowImg(bookFront)} style={{ borderColor: showImg === bookFront ? "#7C1E1E" : "#D1D1D1" }} src={bookFront} className='w-[35px] p-1 border-2 border-[#D1D1D1]' alt='Book Front' />
                            <img onClick={() => setShowImg(bookBack)} style={{ borderColor: showImg === bookBack ? "#7C1E1E" : "#D1D1D1" }} src={bookBack} className='w-[35px] p-1 mt-2 border-2 border-[#D1D1D1]' alt='Book Back' />
                        </div>
                        <div className='w-[968px] flex'>
                            <div>
                                <img className='px-[40px] py-5 w-[362px] h-[413px] border-2 border-[#D1D1D1]' src={showImg} alt='Book Front' />
                                <div className='flex justify-between py-5'>
                                    {isInCart ? <div className='h-[40px] flex gap-1 items-center'><IconButton onClick={handleRemove} disabled={cartId.quantityToBuy === 1 ? true : false}><RemoveCircleOutline fontSize='large' /></IconButton><div className='w-[66px] h-[38px] p-1 text-center border-2 rounded'>{cartId.quantityToBuy}</div><IconButton onClick={handleAdd} disabled={cartId.quantityToBuy < cartId.quantity ? false : true}><AddCircleOutline fontSize='large' /></IconButton></div> : <Button variant='contained' sx={{ width: "170px", height: "40px", backgroundColor: "#A03037" }} onClick={handleAddToCart}>Add to Bag</Button>}
                                    {wishList ? <div className='w-[170px] h-[40px] bg-[#e2e2e2] text-black text-center p-[7px] rounded'><div className='flex justify-center items-center'><Favorite sx={{ color: 'red' }} />Added To Wishlist!</div></div> : <Button className='flex gap-2' variant='contained' sx={{ width: "170px", height: "40px", backgroundColor: "#333333" }} onClick={handleWishList}><Favorite />Wishlist</Button>}
                                </div>
                            </div>
                            <div className="ml-5 flex flex-col gap-2">
                                <h1 className="font-medium text-[28px]">{bookInfo?.bookName}</h1>
                                <p className="text-[#878787] text-[18px]">{bookInfo?.author}</p>
                                <div className="flex gap-1 items-center"><div className="flex justify-center items-center w-[54px] h-[24px] bg-[#388E3C] text-white rounded text-sm">4.5<Star sx={{ fontSize: 'small' }} /></div><p className="text-[#878787] text-sm">({feedBackList.length})</p></div>
                                <div className="flex items-center gap-1"><h1 className="text-[30px] font-semibold">{bookInfo?.discountPrice}</h1><p className="line-through text-[15px] text-[#878787]">{bookInfo?.price}</p></div>
                                <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded" />
                                <li className='text-[#878787] mt-5'><span className='relative left-[-10px]'>Book Detail</span></li>
                                <p className='text-[#373434] w-[87%] text-xs mb-5'>{bookInfo?.description}</p>
                                <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded" />
                                <p className='text-lg font-medium'>Customer Feedback</p>
                                <div className='flex flex-col gap-2 w-[560px] h-[192px] bg-[#F5F5F5] p-2'>
                                    <span>Overall rating</span>
                                    <div>
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className='w-[528px] h-[64px] bg-white'>
                                            <input id='comment' className='text-[#707070] w-[300px]' placeholder='Write your review' />
                                        </div>
                                        <div className='flex justify-end px-4'><Button variant='contained' size='small' sx={{ width: '76px', backgroundColor: "#3371B5" }} onClick={sendFeeback}>Submit</Button></div>
                                    </div>
                                </div>
                                <div>
                                    {feedBackList.map((review: any, index: number) => <div key={index} className="flex justify-center mt-5 mb-20">
                                        <div className="w-full flex gap-5">
                                            <div className="border w-[40px] h-[40px] border-[#E4E4E4] bg-[#F5F5F5] rounded-full flex justify-center items-center">
                                                <h1 className="text-xs text-[#707070]">{review.user_id.fullName[0] + review.user_id.fullName[1]}</h1>
                                            </div>
                                            <div>
                                                <h1 className="font-bold">{review.user_id.fullName}</h1>
                                                <Rating name="read-only" value={review.rating} readOnly />
                                                <p className="text-wrap text-sm text-slate-500">{review.comment}</p>
                                            </div>
                                        </div>
                                    </div>)}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="w-[80%] font-[Roboto] animate-pulse">
                    <div className="mt-[20px] flex gap-1">
                        <Link to={'/book'} className="text-[#9D9D9D]">Home /</Link>
                        <div className='mt-1 w-10 h-4 bg-[lightgray]' />
                    </div>
                    <div className='mt-[40px] flex gap-1'>
                        <div>
                            <div className='w-[35px] h-10 bg-[lightgray]' />
                            <div className='w-[35px] h-10 mt-2 bg-[lightgray]' />
                        </div>
                        <div className='w-[968px] h-[585px] flex'>
                            <div>
                                <div className='px-[40px] py-5 w-[362px] h-[413px] bg-[lightgray]' />
                                <div className='flex justify-between py-5'>
                                    <div className='w-[170px] h-[40px] bg-[#A03037] rounded' />
                                    <div className='w-[170px] h-[40px] bg-[#333333] rounded' />
                                </div>
                            </div>
                            <div className="ml-5 flex flex-col gap-2">
                                <div className="h-5 w-40 bg-[lightgray] rounded" />
                                <div className="h-5 w-10 bg-[lightgray] rounded" />
                                <div className="flex gap-1 items-center"><div className="flex justify-center items-center w-[54px] h-[24px] bg-[#388E3C] text-white rounded text-sm"></div></div>
                                <div className="flex items-center gap-1"><div className="w-20 h-[30px] bg-[lightgray] rounded"></div><p className="w-10 h-5 bg-[lightgray] rounded"></p></div>
                                <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded" />
                                <li className='mt-5 flex'><div className='w-20 h-5 bg-[lightgray] rounded' /></li>
                                <div className="h-2 w-60 bg-[lightgray] rounded" />
                                <div className="h-2 w-20 bg-[lightgray] rounded" />
                                <div className="h-2 w-10 bg-[lightgray] rounded" />
                                <div className="w-[551px] h-[1.8px] bg-[#c8c8c8] rounded" />
                                <div className="h-2 w-40 bg-[lightgray] rounded" />
                                <div className='flex flex-col gap-2 w-[560px] h-[192px] bg-[#F5F5F5] p-2'>
                                    <div className='bg-[lightgray] h-2 w-20 rounded' />
                                    <div className='bg-[lightgray] h-2 w-10 rounded'></div>
                                    <div className='w-[528px] h-[64px] bg-[lightgray] rounded'>
                                    </div>
                                    <div className='flex justify-end px-4'><div className=' w-[76px] h-[24px] bg-[lightgray] rounded'></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
export default BookDetails