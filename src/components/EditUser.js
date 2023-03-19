import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const EditUser = (props) => {

    const {open, handleClose, id, user, users} = props
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)
    const [status, setstatus] = useState("")

    const dublicate = []

    const style = {
        root:{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 300,
            bgcolor: 'background.paper',
            //border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        close:{
            display:"flex",
            justifyContent:"end"
        }
      };

  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.root}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                User Edit
            </Typography>
            <TextField style={{marginRight:"5px", marginTop:"10px"}}
                id="outlined-basic" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name" 
                variant="outlined"
            />
            <TextField style={{ marginTop:"10px"}}
                id="outlined-basic" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email" 
                variant="outlined"
            />
                    <FormControl  style={{ marginTop:"10px"}}>
                        <InputLabel style={{ minWidth:"148px"}} id="demo-simple-select-label">Gender</InputLabel>
                        <Select style={{ minWidth:"148px"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        //onChange={handleChange}
                        >
                            {users.users && users.users.map((user) => {
                                if (dublicate.includes(user.gender)) {
                                    return null;
                                }
                                dublicate.push(user.gender);
                                return <MenuItem key={user.gender} value={user.gender}  onClick={() => setGender(user.gender)}>{user.gender}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
            <Box style={style.close}>
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
            </Box>
        </Box>
      </Modal>
      
    </div>
  )
}

export default EditUser