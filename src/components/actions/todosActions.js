import { getUserTodos } from "../api/userApi"
import { FETCH_USER_TODOS } from "./types"

export const fetchUserTodos = () => async (
    dispatch
) => {
    const resp = await getUserTodos()
    dispatch({
        type: FETCH_USER_TODOS,
        payload: resp.data
    })
}