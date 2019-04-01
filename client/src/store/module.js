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
  'GET_PENDING_TRANSACTIONS'
])

function initialState () {
  return {
    pendingTransactions: []
  }
}

const state = initialState()

const getters = {
  pendingTransactions (state) {
    return state.pendingTransactions
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

  [types.GET_PENDING_TRANSACTIONS_REQUEST] (state) {},
  [types.GET_PENDING_TRANSACTIONS_SUCCESS] (state, txs) {
    state.pendingTransactions = txs
  },
  [types.GET_PENDING_TRANSACTIONS_FAILURE] (state, err) {
    handleError(state, err)
  }
}

const actions = {
  getPendingTransactions ({ commit }) {
    commit(types.GET_PENDING_TRANSACTIONS_REQUEST)
    return serverApi.getPendingTransactions()
      .then(txs => commit(types.GET_PENDING_TRANSACTIONS_SUCCESS, txs))
      .catch(err => {
        commit(types.GET_PENDING_TRANSACTIONS_FAILURE, err)
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
