import axios from 'axios'
const baseUrl = '/api'

const sendToModel = (image, width, height) => {
  return axios
    .post(`${baseUrl}/model`, { image, width, height })
    .then(res => res.data)
}

const saveToDatabase = (imageDocument) => {
  return axios
    .post(`${baseUrl}/db`, imageDocument)
}

export default { sendToModel, saveToDatabase }