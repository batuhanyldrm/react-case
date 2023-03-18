import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import UserListItem from './UserListItem';

const UsersList = (props) => {

    const{fetchUser, users} = props

    useEffect(() => {
        fetchUser()
      }, [])

  return (
    <>
        {users.users && users.users.map((user, index) => (
            <UserListItem
                key={index}
                user={user}
                users={users}
            />
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