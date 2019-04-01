import Vue from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH'

library.add(
  faEllipsisH
)

Vue.component('fa-icon', FontAwesomeIcon)
