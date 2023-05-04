import React, {useEffect, useState} from 'react'
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
import { addUser, fetchUser } from './actions/userActions';

const style = {
    root:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    },
    close:{
        display:"flex",
        justifyContent:"end"
    }
};

const AddUser = (props) => {
    const {open, handleClose, fetchUser, users} = props

    const options = [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" }
    ];

    const statusOptions = [
        { value: "active", label: "active" },
        { value: "inactive", label: "inactive" }
    ];
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        setName("")
        setEmail("")
        setGender("")
        setStatus("")
    }, [users])
    

    const handleAddUser = async () => {
        const data = {
            name: name,
            email: email,
            gender: gender,
            status: status,
        }
        try {
            await postUser(data).then(() => addUser(data))
            fetchUser()
            handleClose()
        } catch (error) {
            console.log(error,"catch error")
        }
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
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
            <div>
                <TextField style={{marginRight:"5px", marginTop:"10px"}}
                    id="outlined-basic" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="Name" 
                    variant="outlined"
                    error={!name}
                />
            </div>
            <div>
                <TextField style={{ marginTop:"10px"}}
                    id="outlined-basic" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email" 
                    variant="outlined"
                    error={!email}
                />
            </div>
            <div>
                    <FormControl sx={{minWidth: 193, marginTop:"10px" }}>
                        <InputLabel style={{ minWidth:"148px"}} id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            value={gender}
                            label="Gender"
                            error={!gender}
                            onChange={handleGenderChange}
                        >
                            {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
            </div>
                    <FormControl  sx={{minWidth: 193, marginTop:"10px" }}>
                        <InputLabel style={{ minWidth:"148px"}} id="demo-simple-select-label">Status</InputLabel>
                         <Select
                            value={status}
                            error={!status}
                            label="Status"
                            onChange={handleStatusChange}
                        >
                            {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
            <Box style={style.close}>
                <div style={{marginTop:"5px"}}>
                <Button style={{marginRight:"5px"}} onClick={handleClose} autoFocus>
                    Close
                </Button>
                <Button onClick={handleAddUser} autoFocus>
                    Add
                </Button>
                </div>
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
    },
    fetchUser: () => {
        dispatch(fetchUser());
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (AddUser)