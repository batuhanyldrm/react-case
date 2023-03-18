import axios from "axios";

const bearerToken = "Bearer 44a0309654a3f3e75a10cb5805f8ef22acbfbee387c733abf9a89f1dab613918"

export const loginUser = async ({name,password}) => {
    const resp = await axios.post("https://gorest.co.in/consumer/login", {
        name,
        password
    })
    return resp.status === 201 ? resp : false
}

export const getUser = async () => {
    const resp = await axios.get("https://gorest.co.in/public/v2/users", {
            headers: { Authorization: bearerToken }
    })
    return resp.status === 200 ? resp : false
}

export const putUser = async ({id, name, email, gender, status}) => {
    const resp = await axios.put(`https://gorest.co.in/public/v2/users${id}`, {
        name,
        email,
        gender,
        status,
    })

    return resp.status === 200 ? resp : false
}