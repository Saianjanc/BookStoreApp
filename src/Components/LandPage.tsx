import { useState } from 'react';
import loginImg from '../assets/loginImg.png';
import { Tabs,Tab } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';

function LandPage() {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
      function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    return(
        <div className="h-[100vh] flex items-center justify-center" style={value?{backgroundColor:"#3c3c3c"}:{backgroundColor:"#bdbdbd"}}>
            <div className='w-[700px] h-[400px]'>
            <div className="absolute w-[390px] h-[425px] left-[50%] z-10 rounded-md bg-white">
            <Tabs value={value} onChange={handleChange} sx={{"& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root":{ marginTop:2, fontSize: 25,fontFamily:'Roboto', fontWeight:600},"& .css-1wf8b0h-MuiTabs-flexContainer":{gap: 8},"& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected":{color:'black'},"& .css-1aquho2-MuiTabs-indicator":{backgroundColor:'#A03037', height:5, width:'22px!important', borderRadius: 1, translate: '3vw'}}} centered>
            <Tab label="Login"  {...a11yProps(0)} />
            <Tab label="Signup" {...a11yProps(1)} />
            </Tabs>
            <div className='p-[50px] pt-6'>
            {value?<SignUp/>:<Login/>}
            </div>
            </div>
            <div className="w-[624px] h-[390px] mt-[18px] absolute z-0 rounded-3xl bg-[#F5F5F5]">
                <img src={loginImg} className='w-[245px] h-[245px] rounded-full mt-[52px] ml-[50px] mb-[30px]' alt="LoginImg" />
                <label className="font-[Roboto] text-lg uppercase font-semibold p-[70px]">Online Book Shopping</label>
            </div>
            </div>
        </div>
    )       
}
export default LandPage