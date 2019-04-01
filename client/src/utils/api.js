import Vue from 'vue'
import axios from 'axios'

const API_URL = process.env.VUE_APP_API || 'http://localhost:8000/api'

const SERVER_AXIOS = axios.create({
  baseURL: API_URL
})

function handleError (err) {
  if (err.response && err.response.status === 401) {
    console.log('Error! Bad token.')
    Vue.$router.push('/signup')
  }
  console.error(err)
  throw err
}

const login = (axios) => (form) => {
  return axios.post('/login', form)
    .then(({ data }) => data.token)
    .catch(e => handleError(e))
}

export default {
  login: login(SERVER_AXIOS)
}
