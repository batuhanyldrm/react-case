import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditUser from './EditUser';
import { IconButton } from '@mui/material';
import { removeUser } from './actions/userActions';
import { connect } from 'react-redux';

const style = {
    root:{
        //position: 'absolute',
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
    },
  };

const UserListItem = (props) => {
    const {user, users, removeUser} = props

    const [open, setOpen] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [id, setId] = useState("")

    const handleEdit = (ID) => {
        setId(ID)
        setOpen(true)
    }

    const handleDeleteModalClose = () => {
        setDeleteModal(false)
    }

    const handleDeleteUser = () => {
        removeUser(user.id)
        setDeleteModal(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

  return (
    <>
        <EditUser
            open={open}
            handleClose={handleClose}
            id={id}
            user={user}
            users={users}
        />
        <div /* style={{display:"flex", justifyContent:"flex-start"}} */>
            <Card sx={{ maxWidth: 275 }} style={{marginBottom:"10px"}}>
                <div style={{display:"flex", justifyContent:"end", marginRight:"15px"}}>
                    <IconButton
                    onClick={() => setDeleteModal(true)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} component="div">
                        {user.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.gender}
                    </Typography>
                    <Typography variant="body2">
                        {user.status}
                    </Typography>
                </CardContent>
                <CardActions style={{display:"flex", justifyContent:"end"}}>
                    <Button size="small" onClick={() => handleEdit(user.id)}>Edit</Button>
                </CardActions>
            </Card>
            <Modal
            open={deleteModal}
            onClose={handleDeleteModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style.root}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Delete User
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Silmek istediğinize emin misiniz?
                    </Typography>
                <Box style={style.close}>
                        <Button onClick={handleDeleteModalClose} autoFocus>
                            Close
                        </Button>
                        <Button onClick={() => handleDeleteUser()} autoFocus>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    </>
  )
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    removeUser: (id) => {
        dispatch(removeUser(id));
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (UserListItem)