import { getUserTodos } from "../api/userApi"
import { ADD_USER_TODOS, FETCH_USER_TODOS } from "./types"

export const fetchUserTodos = (id) => async (
    dispatch
) => {
    const resp = await getUserTodos(id)
    dispatch({
        type: FETCH_USER_TODOS,
        payload: resp.data
    })
}

export const addUserTodos = (data) => async (
    dispatch
) => {
    dispatch({
        type: ADD_USER_TODOS,
        payload: data
    })
}