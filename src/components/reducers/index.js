import {combineReducers} from "redux";
import todoReducer from "./todosReducer";
import userReducer from "./userReducer"

const reducers = combineReducers({
    users: userReducer,
    todos: todoReducer
});

export default reducers;