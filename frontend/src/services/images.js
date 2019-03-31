import axios from 'axios'
const url = 'http://localhost:3000/images/img'

const send = (image, width, height) => {
  console.log(`sending image, image is ${image}`)
  return axios
    .post(url, { image: image, width, height })
    .then(res => res.data)
}

export default { send }