import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from 'react'
import LoginPage from "../LoginPage";
import UsersList from "../UsersList";

const RouterPage = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage component={LoginPage} title={"Login"} />}></Route>
          <Route path="/users" element={<UsersList component={UsersList} title={"Users"} />}></Route>
        </Routes>
          
    </BrowserRouter>
  )
}

export default RouterPage