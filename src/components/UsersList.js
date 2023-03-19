import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import AddUser from './AddUser';
import UserListItem from './UserListItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const UsersList = (props) => {

    const{fetchUser, users} = props

    const [addUser, setaddUser] = useState(false)

    const handleClose = () => {
      setaddUser(false)
    }

    useEffect(() => {
        fetchUser()
      }, [])

  return (
    <>
      <AddUser
        open={addUser}
        handleClose={handleClose}
        users={users}
      />
      <div style={{display:"flex", justifyContent:"end"}}>
        <Button variant="contained" onClick={() => setaddUser(true)}>ADD USER</Button>
      </div>
        {users.users && users.users.map((user, index) => (
            <UserListItem
                key={index}
                user={user}
                users={users}
            />
        ))}
        <Stack spacing={2}>
      <Pagination count={10} color="primary" />
    </Stack>
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