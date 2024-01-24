import axios from "axios";

const BASEURL = "https://bookstore.incubation.bridgelabz.com/bookstore_user"


export async function getBooks(){
    let data:any
    await axios.get(`${BASEURL}/get/book`).then(res => {
        data=res.data.result
        })
        return data
    }