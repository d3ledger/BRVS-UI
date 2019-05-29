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
  'GET_PENDING_TRANSACTIONS'
])

function initialState () {
  return {
    pendingTransactions: [
      {
        'payload': {
          'reduced_payload': {
            'commands': [
              {
                'set_account_detail': {
                  'account_id': 'brvs@brvs',
                  'key': 'abcd',
                  'value': 'abcd'
                }
              }
            ],
            'created_time': '1554120864273',
            'creator_account_id': 'brvs@brvs',
            'quorum': 1
          }
        },
        'signatures': [
          {
            'public_key': 'B9679BBF526A1C936CD1144B56A370D376FA8246B248CD72F952B45A2F20BDAD',
            'signature': '7EEAEEDCC8487AACC29E3282372457BA2E1921B4A4727DC8224E8CAA3AB92A4324B60F17F4B8A58415A9E7F01503E3259C2797198E45AAC0126899F3F4E76A08'
          }
        ]
      },
      {
        'payload': {
          'reduced_payload': {
            'commands': [
              {
                'set_account_detail': {
                  'account_id': 'brvs@brvs',
                  'key': 'abcd',
                  'value': 'abcd'
                }
              }
            ],
            'created_time': '1554120869939',
            'creator_account_id': 'brvs@brvs',
            'quorum': 1
          }
        },
        'signatures': [
          {
            'public_key': 'B9679BBF526A1C936CD1144B56A370D376FA8246B248CD72F952B45A2F20BDAD',
            'signature': '881F40FE7A97A9207D88F1F4B35C8D9E77EB68B80C5F089D4A3707C43EE6EE21F8A77FFCA7C6BBA91075E8873CC20D53A08B2411332D9C5BB64BED6F329E7A04'
          }
        ]
      },
      {
        'payload': {
          'reduced_payload': {
            'commands': [
              {
                'set_account_detail': {
                  'account_id': 'brvs@brvs',
                  'key': 'abcd',
                  'value': 'abcd'
                }
              }
            ],
            'created_time': '1554120893862',
            'creator_account_id': 'brvs@brvs',
            'quorum': 1
          }
        },
        'signatures': [
          {
            'public_key': 'B9679BBF526A1C936CD1144B56A370D376FA8246B248CD72F952B45A2F20BDAD',
            'signature': '2C10FC1D386956325FE68BCB4300AB330DD54219ABD1AAD8030322A90D2FD8D4CEDA7FA537AE3BC7BC2D671B14290851D69C8EFC2301934DAD5854EF12BAEE06'
          }
        ]
      }
    ]
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
      .then(({ transactions }) => commit(types.GET_PENDING_TRANSACTIONS_SUCCESS, transactions))
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
