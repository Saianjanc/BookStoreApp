import { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUser } from "../utils/UserService";
import { useNavigate } from "react-router-dom";

function SignUp(){
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

    const navigate = useNavigate()

    const newUser = async() => {
        const fullname = (document.getElementById('fullname')as HTMLInputElement).value
        const emailId = (document.getElementById('emailId')as HTMLInputElement).value
        const password = (document.getElementById('password')as HTMLInputElement).value
        const mobileNo = (document.getElementById('mobileNo')as HTMLInputElement).value
        const userObj = {
            fullName: fullname,
            email: emailId,
            password: password,
            phone: mobileNo
          }
        await createUser(userObj,navigate)
    } 

    return(
        <div className="flex flex-col gap-[24px]">
        <TextField id="fullname" label="Full Name" variant="outlined" size="small"/>
        <TextField id="emailId" label="Email Id" variant="outlined" size="small"/>
        <TextField id="password" label="Password" variant="outlined" size="small" type={showPassword ? 'text' : 'password'}
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
        <TextField id="mobileNo" label="Mobile Number" variant="outlined" size="small"/>
        <Button onClick={newUser} variant="contained" sx={{textTransform:"none",backgroundColor:"#A03037"}}>Signup</Button>
        </div>
    )
}
export default SignUp