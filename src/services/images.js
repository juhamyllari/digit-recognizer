import axios from 'axios'
// const url = 'http://localhost:3000/api'
const baseUrl = '/api'

const sendToModel = (image, width, height) => {
  // console.log(`sending image, image is ${image}`)
  return axios
    .post(`${baseUrl}/model`, { image, width, height })
    .then(res => res.data)
}

const saveToDatabase = (image, guess, groundTruth) => {
  return axios
    .post(`${baseUrl}/db`, { image, guess, groundTruth })
}

export default { sendToModel, saveToDatabase }