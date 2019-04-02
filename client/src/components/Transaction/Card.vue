<template>
  <div v-if="transaction" class="transaction-container">
    <div>
      <div class="column-title">Transaction information</div>
      <div>
        <div class="attributes">
          <div class="attribute-row">
            <h3 class="attribute-card-title">Time</h3>
            <div class="attribute-card">
              <p>{{ reducedPayload.created_time }}</p>
            </div>
          </div>
        </div>
        <div class="attributes">
          <div class="attribute-row">
            <h3 class="attribute-card-title">Account ID</h3>
            <div class="attribute-card">
              <p>{{ reducedPayload.creator_account_id }}</p>
            </div>
          </div>
        </div>
        <div class="attributes">
          <div class="attribute-row">
            <h3 class="attribute-card-title">Quorum</h3>
            <div class="attribute-card">
              <p>{{ reducedPayload.quorum }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="column-title">Transaction commands</div>
      <div>
        <div class="attributes">
          <div class="attribute-row" v-for="(value, key) in commands" :key="key">
            <template>
              <h3 class="attribute-card-title">{{ value.title }}</h3>
              <div class="attribute-card">
                <p style="white-space: pre">{{ JSON.stringify(value.params, null, '    ') }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_actions">
      <el-col :span="12">
        <el-button type="empty" plain class="sora-button fullwidth" @click="approveWith">Approve</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" class="sora-button btn-red fullwidth" @click="rejectWith">Reject</el-button>
      </el-col>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'transacion-card',
  data () {
    return {
      transaction: null
    }
  },
  computed: {
    ...mapGetters([
      'pendingTransactions'
    ]),
    reducedPayload () {
      return this.transaction.payload.reduced_payload
    },
    commands () {
      const commands = this.reducedPayload.commands
      return commands.map(c => {
        const title = Object.keys(c)[0]
        return {
          title,
          params: c[title]
        }
      })
    }
  },
  methods: {
    ...mapActions([]),
    approveWith () {
      this.$message.success('Success, transaction approved')
    },
    rejectWith () {
      this.$message.success('Success, transaction rejected')
    }
  },
  created () {
    console.log(this.pendingTransactions)
    if (this.pendingTransactions.length) {
      const id = this.$route.params.id.split('_')[1]
      this.transaction = this.pendingTransactions[id]
    }
  }
}
</script>

<style scoped>
.column-title {
  border-bottom: 0px;
}
.customer-cards >>> .el-collapse-item__header {
  padding: 0.5rem 1rem;
  height: 3.6rem;
}
.transaction-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer_actions {
  border-top: 1px solid #eaeaea;
}
</style>
