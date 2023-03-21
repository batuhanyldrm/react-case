import React, {useState} from 'react'
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EditUser from './EditUser';
import { removeUser } from './actions/userActions';
import MailIcon from '@mui/icons-material/Mail';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';

const style = {
    root:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 500,
        bgcolor: 'background.paper',
        //border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    close:{
        display:"flex",
        justifyContent:"end"
    },
    name:{
        fontSize: 16, 
        fontWeight: "bold", 
        textAlign:"center"
    },
    icon: {
        display:"flex",
        justifyContent:"center",
    }
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

    const handleDeleteModalClose = () => {
        setDeleteModal(false)
    }

    const handleDeleteUser = () => {
        removeUser(user.id)
        setDeleteModal(false)
    }

    const handleClose = () => {
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
        <div>
            <Card sx={{ maxWidth: 275 }} style={{marginBottom:"10px"}}>
                <div style={{display:"flex", justifyContent:"end", marginRight:"15px"}}>
                    <IconButton title='Detail'
                        href={`/${user.id}/todos`}
                    >
                        <ContentPasteSearchIcon/>
                    </IconButton>
                </div>
                <CardContent>
                    <div style={style.icon} >{user.gender === "male" ? < FaceIcon/> : <Face3Icon/>}</div> 
                    <Typography style={style.name} color="black" gutterBottom>
                        {user.name}
                    </Typography>
                    <div style={{display: "flex"}}>
                   <MailIcon/>
                    <Typography sx={{ fontSize: 14 }} component="div">
                        {user.email}
                    </Typography>
                    </div>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {user.gender}
                    </Typography>
                    <Typography variant="body2">
                        {user.status}
                    </Typography>
                </CardContent>
                <CardActions style={{display:"flex", justifyContent:"start"}}>
                    <Button size="small"
                    onClick={() => handleEdit(user.id)}
                    >
                    Edit
                    </Button>
                    <div style={{display:"flex", justifyContent:"end", marginRight:"15px"}}>
                    <IconButton title='Delete'
                    onClick={() => setDeleteModal(true)}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    removeUser: (id) => {
        dispatch(removeUser(id));
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (UserListItem)