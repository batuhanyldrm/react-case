import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import LoginPage from "../LoginPage";
import UsersList from "../UsersList";
import TodosListItem from "../TodosListItem";

const RouterPage = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage component={LoginPage} title={"Login"} />}></Route>
          <Route path="/users" element={<UsersList component={UsersList} title={"Users"} />}></Route>
          <Route path="/todos/:id" element={<TodosListItem component={TodosListItem} title={"Todos"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage