import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditUser from './EditUser';

const UserListItem = (props) => {
    const {user, users} = props

    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")

    const handleEdit = (ID) => {
        setId(ID)
        setOpen(true)
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
        <Card sx={{ maxWidth: 275 }} style={{marginBottom:"10px"}}>
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
    </>
  )
}

export default UserListItem