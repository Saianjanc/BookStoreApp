import axios from "axios";

const BASEURL = "https://bookstore.incubation.bridgelabz.com/bookstore_user"

export async function createUser(userObj:object,navigate:Function,setShowError:Function){
    await axios.post(`${BASEURL}/registration`,userObj).then(res => {
      const usertoken = res.data.result.accessToken
      localStorage.setItem("accessToken",usertoken)
      navigate("/book")
        }).catch(err => {
            const error = err.response.data.error
            setShowError(error)
          });
        }

export async function userLogin(userObj:object,navigate:Function,setShowError:Function){
    await axios.post(`${BASEURL}/login`,userObj).then(res => {
      const usertoken = res.data.result.accessToken
      localStorage.setItem("accessToken",usertoken)
      if(usertoken){navigate("/book")}
      if(res.data.message){
        console.log(res);
        setShowError(res.data.message)
      }
        }).catch(err => {
          if(err?.response?.data){
          const error = err.response.data.error
          setShowError(error)
          }else{
            setShowError([{param:"password",msg:"Invaild Password!"}])
          }
          });
        }