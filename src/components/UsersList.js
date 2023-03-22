import { Button, IconButton, TextField } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import AddUser from './AddUser';
import UserListItem from './UserListItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

const style = {
  list: {
    marginLeft: "15px",
    marginRight: "15px",
    columnCount: "2"
  }
};

function UsersList (props) {

    const{fetchUser, users} = props

    const [addUser, setaddUser] = useState(false)
    const [pageNumber,setPageNumber] = useState(1);
    const [totalPageNumber,setTotalPageNumber] = useState(0);
    const [lastFilteredUsers,setLastFilteredUsers] = useState([]);
    const [currentSearch,setCurrentSearch] = useState("")
    const [lastSearched,setLastSearched] = useState("");

    const sliceUsers = (pageNo) => {
      const newDisplayedUsers =  users.slice((pageNo - 1) * 4, pageNo * 4)  
      setLastFilteredUsers(newDisplayedUsers)
    }
    const handleShownUsers = (value) => {
      const newPageNo = value
      sliceUsers(newPageNo);
      setPageNumber(newPageNo)
    }

    const handleFilteredSearch = () => {

      let rawData = currentSearch;
  
      let trimmedRawData = rawData.trim();
      let lowerCasedData = trimmedRawData.toLowerCase();
    
      let standartizedCurrentSearch = lowerCasedData
      setCurrentSearch(standartizedCurrentSearch);
  
      if(standartizedCurrentSearch === ""){ 
        handleShownUsers(pageNumber)
        return;
      }
      
      if(standartizedCurrentSearch === lastSearched){
        return;
      }
      
      const filteredUsers = users.filter( (user) => user.name.includes(standartizedCurrentSearch))
      setLastFilteredUsers(filteredUsers);          
      
      setLastSearched(standartizedCurrentSearch)
    }

    const checkPressedEnter = (key) => {
      if (key === "Enter"){
        handleFilteredSearch();  
      }
    }

    const deleteCurrentSearch = () => {
      setCurrentSearch("");
    }

    const handleClose = () => {
      setaddUser(false)
    }

    useEffect(() => {
        fetchUser()
      }, [])

     useEffect( () => {
        if(users){
          sliceUsers(pageNumber);
          setTotalPageNumber(Math.round(users.length / 4))
        }
      },[users])
  return (
    <>
      <AddUser
        open={addUser}
        handleClose={handleClose}
        users={users}
      />
      <div style={{display:"flex", justifyContent:"end"}}>
        <Button variant="contained" onClick={() => setaddUser(true)}>ADD USER</Button>
      <TextField
      type="text"
      value={currentSearch}
      onChange={(e) => setCurrentSearch(e.target.value)}
      onKeyPress={(e) => checkPressedEnter(e.key)}
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <>
            <IconButton
              size="small"
              style={{
                display: currentSearch.length > 0 ? "block" : "none",
              }}
              onClick = {() => deleteCurrentSearch()}
            >
              <ClearIcon
                htmlColor="#2F455C"
                style={{ fontSize: "18px" }}
              />
            </IconButton>
            <IconButton size="small" onClick={handleFilteredSearch}>
              <SearchIcon />
            </IconButton>
          </>
        ),
      }}
      label="Search"
    /></div>
      <div className='row'>
      <section style={style.list} className="col-md-6">

        {lastFilteredUsers &&
          lastFilteredUsers.map((user, index) => (
            <UserListItem
                key={index}
                user={user}
                users={lastFilteredUsers}
            />
          
          )
      )}
        </section>
        </div>
        <div>
        <Stack spacing={2}>

        <Pagination
        id="list-users-pagination"
        style={style.pagination}
        page={pageNumber}
        onChange={(event, value) => handleShownUsers(value)}
        count={totalPageNumber}
        size="small"
        showFirstButton
        showLastButton
        color="primary"
      />
    </Stack>
    </div>
   </> 
  )
}

const mapStateToProps = (state) => ({
    users: state.users.users
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => {
      dispatch(fetchUser());
    },
  });

export default connect(mapStateToProps,mapDispatchToProps) (UsersList)