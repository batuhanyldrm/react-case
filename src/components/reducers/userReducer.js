import { ADD_USER, DELETE_USER, FETCH_USER, UPDATE_USER } from '../actions/types';

const Reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
        return {...state, users: action.payload}
    case UPDATE_USER:
        var temp = {...state}
        temp.users.map((item, index) => {
            if (item.id === action.payload.id) {
                temp.users[index].name = action.payload.name
                temp.users[index].email = action.payload.email
                temp.users[index].gender = action.payload.gender
                temp.users[index].status = action.payload.status
            }
        })
        return {...state, users: temp.users}
    case DELETE_USER:
        return {...state, users: [...state.users].filter((item) => item.id !== action.payload)}
    case ADD_USER:
        return {...state, users: [...state.users, action.payload]}
    default:
        return state
  }
}

export default Reducer