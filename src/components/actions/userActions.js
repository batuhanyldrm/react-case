import { deleteUser, getUser } from "../api/userApi";
import { DELETE_USER, FETCH_USER, UPDATE_USER } from "./types";

export const fetchUser = () => async (
    dispatch
) => {
    const resp = await getUser()
    dispatch({
        type: FETCH_USER,
        payload: resp.data
    })
}

export const updateUser = (data) => async (
    dispatch
) => {
    dispatch({
        type: UPDATE_USER,
        payload: data
    })
}

export const removeUser = (id) => async (
    dispatch
) => {
    const resp = await deleteUser(id)
    dispatch({
        type: DELETE_USER,
        payload:id
    })
}