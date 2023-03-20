import React, { useEffect } from 'react'
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

const TodosListItem = (props) => {

    const {fetchUserTodos, todos} = props;

    useEffect(() => {
      fetchUserTodos()
    }, [])
    

  return (
    <>
    <Button variant='contained'>Add Todo</Button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Table</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>

                <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                </TableCell>
                </TableRow>

            </TableBody>
        </Table>
        </TableContainer>
    </>
  )
}

const mapStateToProps = (state) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserTodos: () => {
        dispatch(fetchUserTodos());
    }
})

export default connect(mapStateToProps,mapDispatchToProps) (TodosListItem)