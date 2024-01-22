import { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { userLogin } from "../utils/UserService";

interface IError{
    msg:string,
    param:string
}

function Login(){
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(Array<IError>);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    
    const navigate = useNavigate()

    const userAuth = async() => {
        const emailId = (document.getElementById('emailId')as HTMLInputElement).value
        const password = (document.getElementById('password')as HTMLInputElement).value
        const userObj = {
            email: emailId,
            password: password
          }
        await userLogin(userObj,navigate,setShowError)
    } 

    return(
        <div className="flex flex-col">
        <TextField id="emailId" label="Email Id" variant="outlined" size="small" error={showError[0]?.param==="email"?true:false} helperText={showError[0]?.param==="email"?showError[0].msg:""} /><br/>
        <TextField id="password" label="Password" size="small" type={showPassword ? 'text' : 'password'} error={showError[0]?.param==="password"?true:false} helperText={showError[0]?.param==="password"?showError[0].msg:""}
        InputProps={{endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            )}}/>
        <label className="flex justify-end mb-[30px] text-[#9D9D9D] font-[Roboto] text-sm">Forgot Password?</label>
        <Button onClick={userAuth} variant="contained" sx={{textTransform:"none",backgroundColor:"#A03037"}}>Login</Button>
        <div className="flex justify-center items-center"><div className="flex-1 h-[1.8px] bg-[#c8c8c8] rounded"/><div className="p-5 text-[#343434] font-[system-ui] text-lg font-bold">OR</div><div className="flex-1 h-[1.8px] bg-[#c8c8c8] rounded"/></div>
        <div className="flex justify-between">
        <Button variant="contained" sx={{textTransform:"none",backgroundColor:"#4266B2",width:'130px'}} size="large">Facebook</Button>
        <Button variant="contained" sx={{textTransform:"none",backgroundColor:"#F5F5F5",color:"black",width:'130px'}} size="large">Google</Button>
        </div>
        </div>
    )
}
export default Login