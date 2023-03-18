import { getUser } from "../api/userApi";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (
    dispatch
) => {
    const resp = await getUser()
    dispatch({
        type: FETCH_USER,
        payload: resp.data
    })
}