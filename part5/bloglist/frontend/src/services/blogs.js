import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
    //config = { headers: { Authorization: token } }

}

// const config = { headers: { Authorization: token } }


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newObject, auth) => {
    setToken(auth)
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id, auth) => {
    const request = axios.delete(`${baseUrl}/${id}`, auth)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken, remove }