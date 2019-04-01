<template>
  <el-row>
    <el-col class="dashboard-column" :span="14">
      <div class="dashboard-header">
        <el-input
          prefix-icon="el-icon-search"
          v-model="search"
          placeholder="Search">
        </el-input>
      </div>
      <div class="dashboard-content">
        <el-table
          ref="customersTable"
          :data="searchedTransaction"
          class="table"
          style="color: black;"
          @cell-click="goToLink"
          :row-class-name="tableRowClassName"
        >
          <el-table-column width="40" />
          <el-table-column
            label="Time"
            prop="time"
            sortable
            show-overflow-tooltip/>
          <el-table-column
            label="Account ID"
            prop="accountId"
            sortable
            show-overflow-tooltip/>
          <el-table-column
            label="Quorum"
            prop="quorum"
            sortable
            show-overflow-tooltip/>
        </el-table>
      </div>
    </el-col>
    <el-col class="dashboard-column" :span="10">
      <router-view :key="$route.params.id"></router-view>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'transactions',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'pendingTransactions'
    ]),
    searchedTransaction () {
      const trx = this.pendingTransactions.map((tx) => {
        const {
          // eslint-disable-next-line
          created_time,
          // eslint-disable-next-line
          creator_account_id,
          quorum
        } = tx.payload.reduced_payload
        return {
          time: created_time,
          accountId: creator_account_id,
          quorum
        }
      })
      return this.search
        ? trx.filter(tx =>
          tx.toLowerCase().includes(
            this.search.toLowerCase()
          )
        )
        : trx
    }
  },
  created () {
    this.getPendingTransactions()
  },
  methods: {
    ...mapActions([
      'getPendingTransactions'
    ]),
    tableRowClassName ({ row }) {
      return row['uid'] === this.$route.params.id ? 'selected-row' : 'unselected-row'
    },
    goToLink (row, column) {
      if (row.uid) this.$router.push(`/transactions/${row.uid}`)
    }
  }
}
</script>

<style scoped>
.role {
  color: #7F7F7F;
}
.column-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.column-title.user-title {
  margin-bottom: 0;
}
/* Remove stupid line at the bottom */
.table::before{
  display: none;
}
.table >>> .el-table__fixed::before {
  display: none;
}
.dashboard-header >>> .el-input__inner {
  font-size: 20px;
  height: 3.70rem;
  border: 0;
  border-bottom: 1px solid #efefef;
  border-radius: 0;
}
</style>
