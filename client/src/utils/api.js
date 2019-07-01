/*
 * Copyright D3 Ledger, Inc. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import axios from 'axios'

const API_URL = process.env.VUE_APP_API || 'http://localhost:8000/api'

const CACHE = {
  username: null,
  token: null
}

const SERVER_AXIOS = axios.create({
  baseURL: API_URL,
  headers: {
    common: {
      Authorization: `Bearer ${CACHE.token}`
    }
  }
})

function handleError (err) {
  if (err.response && err.response.status === 401) {
    console.error('Error! Bad token.')

    CACHE.username = null
    CACHE.token = null
  }
  console.error(err)
  throw err
}

function setAuthHeader ({ username, token }) {
  CACHE.username = username
  CACHE.token = token

  SERVER_AXIOS.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const isLoggedIn = () => {
  const validToken = !!CACHE.token
  return validToken
}

const login = (axios) => (form) => {
  return axios.post('/login', form)
    .then(({ data }) => {
      setAuthHeader({
        username: form.username,
        token: data.token
      })
      return data.token
    })
    .catch(e => handleError(e))
}

const logout = () => {
  CACHE.username = null
  CACHE.token = null
  return Promise.resolve()
}

const getPendingTransactions = (axios) => () => {
  return axios.get('/transactions')
    .then(({ data }) => data)
    .catch(e => handleError(e))
}

export default {
  isLoggedIn,

  login: login(SERVER_AXIOS),
  logout,

  getPendingTransactions: getPendingTransactions(SERVER_AXIOS)
}
