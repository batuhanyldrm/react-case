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
import { putUser } from './api/userApi';
import { updateUser } from './actions/userActions';

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

const EditUser = (props) => {

    const {open, handleClose, updateUser, id, user, users} = props
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)
    const [status, setStatus] = useState(user.status)

    const options = [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" }
    ];

    const statusOptions = [
        { value: "active", label: "active" },
        { value: "inactive", label: "inactive" }
    ];

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setGender(user.gender)
        setStatus(user.status)
    }, [user])
    
    const handleEditUser = async () => {
        const data = {
            id: id,
            name: name,
            email: email,
            gender: gender,
            status: status,
        }
        try {
            await putUser(data).then(() => updateUser(data))
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
                User Edit
            </Typography>
            <TextField style={{marginRight:"5px", marginTop:"10px"}}
                id="outlined-basic" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!name}
                label="Name" 
                variant="outlined"
            />
            <TextField style={{ marginTop:"10px"}}
                id="outlined-basic" 
                value={email}
                error={!email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email" 
                variant="outlined"
            />
                    <div>
                    <FormControl  sx={{minWidth: 193, marginTop:"10px" }}>
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
                            label="Status"
                            error={!status}
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
                <Button onClick={() => handleEditUser(user.id)} autoFocus>
                    Edit
                </Button>
                </div>
            </Box>
        </Box>
      </Modal>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: (data) => {
      dispatch(updateUser(data))
  },
});

export default connect(mapStateToProps,mapDispatchToProps) (EditUser)