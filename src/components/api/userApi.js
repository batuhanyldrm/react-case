import axios from "axios";

//const bearerToken = "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"

export const loginUser = async ({name,password}) => {
    const resp = await axios.post("https://gorest.co.in/consumer/login", {
        name,
        password
  }, {
    headers: {
        Authorization: "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"
    }
  })
  return resp.status === 201 ? resp : false
}

export const getUser = async () => {
    const resp = await axios.get("https://gorest.co.in/public/v2/users?page=1&per_page=20", {
        headers: {
            Authorization: "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"
        }
      })
    return resp.status === 200 ? resp : false
}

export const putUser = async (data) => {
    const resp = await axios.patch(`https://gorest.co.in/public/v2/users/${data.id}`,{
        name: data.name,
        email: data.email,
        gender: data.gender,
        status: data.status,
    }, {
        headers: {
            Authorization: "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"
        }
      })

    return resp.status === 200 ? resp : false
}

export const deleteUser = async (id) => {
    const resp = await axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
            Authorization: "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"
        }
      })
      return resp.status === 204 ? resp : false
}

export const postUser = async (data) => {
    const resp = await axios.post(`https://gorest.co.in/public/v2/users`,{
        name: data.name,
        email: data.email,
        gender: data.gender,
        status: data.status,
    }, {
        headers: {
            Authorization: "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"
        }
      })
      return resp.status === 201 ? resp : false
}

export const getUserTodos = async (id) => {
    const resp = await axios.get(`https://gorest.co.in/public/v2/users/${id}/todos`, {
        headers: {
            Authorization: "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"
        }
      })
    return resp.status === 200 ? resp : false
}

export const postUserTodos = async (data) => {
    const resp = await axios.post(`https://gorest.co.in/public/v2/users/${data.id}/todos`,{
        id: data.id,
        title: data.title,
        status: data.status,
    }, {
        headers: {
            Authorization: "Bearer 9cd8b6cbee0221e89b00ceed034662762608538af499a0763f2db7acdb8501dc"
        }
      })
      return resp.status === 201 ? resp : false
}