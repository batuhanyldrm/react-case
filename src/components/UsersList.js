import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UsersList = (props) => {

    const{fetchUser, users} = props

    useEffect(() => {
        fetchUser()
      }, [])

  return (
    <>
    {users.users && users.users.map((user, index) => (
   <Card sx={{ maxWidth: 275 }} key={index}>
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
       <Button size="small">Edit</Button>
     </CardActions>
   </Card>
    ))}
   </> 
  )
}

const mapStateToProps = (state) => ({
    users: state.users
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => {
      dispatch(fetchUser());
    },
  });

export default connect(mapStateToProps,mapDispatchToProps) (UsersList)