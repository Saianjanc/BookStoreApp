import axios from "axios";

const BASEURL = "https://bookstore.incubation.bridgelabz.com/bookstore_user"

export async function createUser(userObj:object,navigate:Function,setShowError:Function){
    await axios.post(`${BASEURL}/registration`,userObj).then(() => {
            navigate("/home")
        }).catch(err => {
            const error = err.response.data.error
            setShowError(error)
          });
        }

export async function userLogin(userObj:object,navigate:Function,setShowError:Function){
    await axios.post(`${BASEURL}/login`,userObj).then(() => {
            navigate("/home")
        }).catch(err => {
            const error = err.response.data.error
            setShowError(error)
          });
        }