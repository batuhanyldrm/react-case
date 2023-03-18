import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';


const LoginPage = (props) => {
    const {} = props

    const [showPassword, setShowPassword] = useState(false);
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("")

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    localStorage.getItem(loginName);

    const userLogin = async () => {
        localStorage.setItem(loginName, "44a0309654a3f3e75a10cb5805f8ef22acbfbee387c733abf9a89f1dab613918");
    }
    

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
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

        <div style={{ width:"380px",marginBottom:"10px",}}>

        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput style={{ width:"380px",marginBottom:"10px",}}
                id="outlined-adornment-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
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
            disabled={loginName.length < 3 || loginPassword !== "44a0309654a3f3e75a10cb5805f8ef22acbfbee387c733abf9a89f1dab613918"}
            variant="contained"
            onClick={() => userLogin()}
            >
            Login
        </Button>
        </div>
    </div>
  )
}

export default LoginPage