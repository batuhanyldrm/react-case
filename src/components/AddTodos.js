import React, { useEffect, useState } from 'react'
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
import { postUserTodos } from './api/userApi';
import { addUserTodos } from './actions/todosActions';

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

const AddTodos = (props) => {

    const {open, handleClose, addUserTodos, todos} = props

    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("")

    const options = [
        { value: "pending", label: "pending" },
        { value: "completed", label: "completed" }
    ];

    const handleAddUserTodos = async () => {
        const data = {
            id: window.location.href.split("/")[3],
            title,
            status
        }
        try {
            await postUserTodos(data).then(() => addUserTodos(data))
            handleClose()
        } catch (error) {
            console.log(error,"catch error")
        }
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }
    
    useEffect(() => {
        setTitle("")
        setStatus("")
    }, [todos])
    

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
            ADD Todos
        </Typography>
        <TextField style={{ marginTop:"10px"}}
            id="outlined-basic" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title" 
            variant="outlined"
        />
                <FormControl  style={{ marginTop:"10px"}}>
                        <InputLabel style={{ minWidth:"148px"}} id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                        >
                            {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
        <Box style={style.close}>
            <Button onClick={handleClose} autoFocus>
                Close
            </Button>
            <Button onClick={() => handleAddUserTodos()} autoFocus>
                Add
            </Button>
        </Box>
    </Box>
  </Modal>
  
</div>
  )
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos

});

const mapDispatchToProps = (dispatch) => ({
    addUserTodos: (data) => {
        dispatch(addUserTodos(data));
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (AddTodos)