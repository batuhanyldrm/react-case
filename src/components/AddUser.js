import React, {useState} from 'react'
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { postUser } from './api/userApi';
import { addUser } from './actions/userActions';

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

const AddUser = (props) => {
    const {open, handleClose, users} = props

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [status, setStatus] = useState("")

    const handleAddUser = async () => {
        const data = {
            name: name,
            email: email,
            gender: gender,
            status: status,
        }
        try {
            await postUser(data).then(() => addUser(data))
            handleClose()
        } catch (error) {
            console.log(error,"catch error")
        }
    }


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
                ADD USER
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
                        onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value={gender} >Male</MenuItem>
                            <MenuItem value={gender} >Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  style={{ marginTop:"10px"}}>
                        <InputLabel style={{ minWidth:"148px"}} id="demo-simple-select-label">Status</InputLabel>
                        <Select style={{ minWidth:"148px"}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={status}>Active</MenuItem>
                            <MenuItem value={status}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
            <Box style={style.close}>
                <Button onClick={handleClose} autoFocus>
                    Close
                </Button>
                <Button onClick={() => handleAddUser()} autoFocus>
                    Add
                </Button>
            </Box>
        </Box>
      </Modal>
      
    </div>
  )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    addUser: (data) => {
        dispatch(addUser(data));
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (AddUser)