import React, {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { loginUser } from './api/userApi';


function LoginPage(props){
    const {} = props

    const [showPassword, setShowPassword] = useState(false);
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("")
    const [isPassAcceptable, setIsPassAcceptable] = useState(true);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const rePass = new RegExp(
        /^(?=.*?[a-z])(?=.*?[0-9]).{3,}$/
    );


    const handlePass = (event) => {
        setLoginPassword(event.target.value);
        if (!rePass.test(event.target.value)) {
            setIsPassAcceptable(false);
        } else {
            setIsPassAcceptable(true);
        }
      };

    
    localStorage.getItem(loginName);

    const userLogin = async () => {
        const data ={
            name: loginName,
            password: loginPassword
        }
        try {
            if(isPassAcceptable){
                localStorage.setItem(loginName, "9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc");
                await loginUser(data)
            }
            else{
                console.log("Wrong pass")
            }
            
        } catch (error) {
            console.log(error,"catch error")
        }
    }

    useEffect(() => {
      setIsPassAcceptable(false)
    }, [])
    

  return (
    <div style={{display:"flex", justifyContent:"center", marginTop:"15%"}}>
        <div style={{display:"block"}}>

        <div style={{marginBottom:"10px"}}>
            <TextField 
                style={{width:"380px"}} 
                id="outlined-basic" 
                label="User Name" 
                variant="outlined"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
            />
        </div>

        <div style={{ width:"380px",marginBottom:"10px"}}>

        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput style={{ width:"380px",marginBottom:"10px",}}
                id="outlined-adornment-password"
                value={loginPassword}
                onChange={(e) => handlePass(e)}
                error={!isPassAcceptable}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
        </FormControl>
        </div>
        <Button 
            href='/users'
            style={{width:"380px"}} 
            disableElevation
            disabled={loginName.length < 3 || !isPassAcceptable}
            variant="contained"
            onClick={userLogin}
            >
            Login
        </Button>
        </div>
    </div>
  )
}

export default LoginPage