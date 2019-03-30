import axios from 'axios'
const baseUrl = 'http://localhost:3001/images'

const send = image => {
  return axios
    .post(image)
    .then(res => res.data)
}

export default { send }