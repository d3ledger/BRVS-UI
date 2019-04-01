import axios from 'axios'
import storageUtil from './storage-util'

const API_URL = process.env.VUE_APP_API || 'http://localhost:8000/api'

const SERVER_AXIOS = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      Authorization: `Bearer ${storageUtil.getItem('user-token')}`
    }
  }
})

function handleError (err) {
  if (err.response && err.response.status === 401) {
    console.log('Error! Bad token.')
    storageUtil.removeItem('token')
  }
  console.error(err)
  throw err
}

function setAuthHeader (token) {
  storageUtil.setItem('token', token)
  SERVER_AXIOS.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const isLoggedIn = () => {
  return storageUtil.getItem('token') || ''
}

const login = (axios) => (form) => {
  return axios.post('/login', form)
    .then(({ data }) => {
      setAuthHeader(data.token)
      return data.token
    })
    .catch(e => handleError(e))
}

const getPendingTransactions = (axios) => () => {
  return axios.get('/transactions')
    .then(({ data }) => data)
    .catch(e => handleError(e))
}

export default {
  isLoggedIn,

  login: login(SERVER_AXIOS),
  getPendingTransactions: getPendingTransactions(SERVER_AXIOS)
}
