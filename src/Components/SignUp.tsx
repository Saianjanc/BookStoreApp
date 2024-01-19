import { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material";

function SignUp(){
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

    return(
        <div className="flex flex-col gap-[24px]">
        <TextField label="Full Name" variant="outlined" size="small"/>
        <TextField label="Email Id" variant="outlined" size="small"/>
        <TextField label="Password" variant="outlined" size="small" type={showPassword ? 'text' : 'password'}
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
        <TextField label="Mobile Number" variant="outlined" size="small"/>
        <Button variant="contained" sx={{textTransform:"none",backgroundColor:"#A03037"}}>Signup</Button>
        </div>
    )
}
export default SignUp