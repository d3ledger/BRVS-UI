/*
 * Copyright Soramitsu Co., Ltd. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import map from 'lodash/fp/map'
import flatMap from 'lodash/fp/flatMap'
import concat from 'lodash/fp/concat'
import fromPairs from 'lodash/fp/fromPairs'
import flow from 'lodash/fp/flow'
import serverApi from '@/utils/api'

const types = flow(
  flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE']),
  concat([
    'RESET'
  ]),
  map(x => [x, x]),
  fromPairs
)([
  'SIGNIN',
  'LOGOUT'
])

function initialState () {
  return {
    username: '',
    token: ''
  }
}

const state = initialState()

const getters = {
  username (state) {
    return state.username
  }
}

function handleError (state, err) {
  console.error(err)
  throw err
}

const mutations = {
  [types.RESET] (state) {
    const s = initialState()

    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },

  [types.SIGNIN_REQUEST] (state) {},
  [types.SIGNIN_SUCCESS] (state, { token, username }) {
    state.token = token
    state.username = username
  },
  [types.SIGNIN_FAILURE] (state, err) {
    handleError(state, err)
  },

  [types.LOGOUT_REQUEST] (state) {},
  [types.LOGOUT_SUCCESS] (state) {},
  [types.LOGOUT_FAILURE] (state, err) {
    handleError(state, err)
  }
}

const actions = {
  login ({ commit }, { username, password }) {
    commit(types.SIGNIN_REQUEST)
    return serverApi.login({ username, password })
      .then(token => commit(types.SIGNIN_SUCCESS, {
        username,
        token
      }))
      .catch(err => {
        commit(types.SIGNIN_FAILURE, err)
        throw err
      })
  },
  logout ({ commit }) {
    commit(types.LOGOUT_REQUEST)
    return serverApi.logout()
      .then(() => commit(types.LOGOUT_SUCCESS))
      .catch(err => {
        commit(types.LOGOUT_FAILURE, err)
        throw err
      })
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
