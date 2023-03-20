import {FETCH_USER_TODOS } from '../actions/types';

const TodoReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_TODOS:
        return {...state, todos: action.payload}
    default:
        return state
  }
}

export default TodoReducer