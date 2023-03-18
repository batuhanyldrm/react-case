import {combineReducers} from "redux";
import userReducer from "./userReducer"

const reducers = combineReducers({
    users: userReducer
});

export default reducers;