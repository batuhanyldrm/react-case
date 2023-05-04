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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    close:{
        display:"flex",
        justifyContent:"end"
    },
    name:{
        fontSize: 16, 
        fontWeight: "bold", 
        textAlign:"center",
        margin:"5px",
        overflow:"hidden",
        textOverflow:"ellipsis",
        whiteSpace:"nowrap"
    },
    email:{
        fontSize: 14, 
        overflow:"hidden",
        textOverflow:"ellipsis",
        whiteSpace:"nowrap"
    },
    icon: {
        display:"flex",
        justifyContent:"center",
    }
  }));

  const style = {
    root:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    },
}

const UserListItem = (props) => {
    const {user, users, removeUser} = props
    const classes = useStyles();

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
        
            <Card sx={{ maxWidth: 300, maxHeight: "300px" }} style={{marginBottom:"10px"}}>
                <div style={{display:"flex", justifyContent:"end", marginRight:"15px"}}>
                    <IconButton title='Detail'
                        href={`/${user.id}/todos`}
                    >
                        <ContentPasteSearchIcon/>
                    </IconButton>
                </div>
                <CardContent>
                    <div className={classes.icon} >{user.gender === "male" ? < FaceIcon sx={{ fontSize: 60 }}/> : <Face3Icon sx={{ fontSize: 60 }}/>}</div> 
                    <Typography className={classes.name} color="black" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography className={classes.email} component="div">
                        {user.email}
                    </Typography>
                    <div style={{display: "flex", justifyContent:"center"}}>
                    <Typography sx={{ mb: 1.5 }}>
                        {user.gender}&{user.status}
                    </Typography>
                    </div>
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
                <Box className={classes.close}>
                        <Button onClick={handleDeleteModalClose} autoFocus>
                            Close
                        </Button>
                        <Button onClick={handleDeleteUser} autoFocus>
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