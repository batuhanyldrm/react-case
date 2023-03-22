import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import { fetchUserTodos } from './actions/todosActions';
import { Button } from '@mui/material';
import AddTodos from './AddTodos';

const TodosListItem = (props) => {

    const {fetchUserTodos, todos} = props;

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
      fetchUserTodos(window.location.href.split("/")[3])
    }, [])
    

  return (
    <>
        <AddTodos
            open={open}
            handleClose={handleClose}
        />
        <Button style={{marginBottom:"15px"}}
            variant='contained' 
            onClick={() => setOpen(true)}
        >
            Add Todo
        </Button>
        <div style={{display:"flex", justifyContent:"center"}}>
        <TableContainer sx={{ maxWidth: 900 }} component={Paper}>
        <Table sx={{ maxWidth: 900}} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell style={{fontWeight:"bold"}}>Title</TableCell>
                {/* <TableCell>Due On</TableCell> */}
                <TableCell align='center' style={{fontWeight:"bold"}}>Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {todos.todos == "" ? <div style={{display:"flex",justifyContent:"end"}}><h2><small>Görüntülenecek veri yok</small></h2></div> : todos.todos && todos.todos.map((todo, index) => (
                <TableRow key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">{todo.title}</TableCell>
                {/* <TableCell component="th" scope="row">{todo.due_on}</TableCell> */}
                <TableCell component="th" scope="row" align='center'>{todo.status}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
        </div>
    </>
  )
}

const mapStateToProps = (state) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserTodos: (id) => {
        dispatch(fetchUserTodos(id));
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (TodosListItem)