import React from "react"
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/store/appStore";
import Header from "./Header";

function Home() {
    return(<Provider store={appStore}>
    <Header/>
    <div className="min-h-[calc(89vh-50px)]"><Outlet/></div>
    <div className='flex items-center w-full h-[50px] mt-5 bg-[#2E1D1E] text-white'>
        <p className="ml-20">Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
    </div>
    </Provider>)
}
export default Home