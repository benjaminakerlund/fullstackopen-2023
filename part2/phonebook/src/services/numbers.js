import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

// 2.13 extract the code that hadnles the communication with the backend into its own module
const getAll = () => {
    return axios.get(baseUrl)
}

// 2.13
const create = newObject => {
    return axios.post(baseUrl, newObject)
}

// 2.14
const remove = personObject => {
    return axios.delete(baseUrl.concat(personObject.id))
}

export default {
    getAll,
    create,
    remove
}