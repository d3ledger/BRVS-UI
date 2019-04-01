<template>
  <div v-if="transaction" class="transaction-container">
    <div class="column-title">Transaction information</div>
    <div class="attributes">
      <div class="attribute-row" v-for="(value, key) in user" :key="key">
        <template>
          <h3 class="attribute-card-title">{{ getLabelByKey(key) }}</h3>
          <div class="attribute-card">
            <p>{{ value || 'Empty' }}</p>
          </div>
        </template>
      </div>
    </div>
    <div class="footer_actions">
      <el-col :span="12">
        <el-button type="danger" plain class="fullwidth" @click="approveWith">Approve</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" class="btn-red fullwidth" @click="rejectWith">Reject</el-button>
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
    ...mapGetters([])
  },
  methods: {
    ...mapActions([]),
    approveWith () {
      this.approveApplicationForm({ formId: this.user.uid })
        .then(() => this.$message.success('Success, user approved'))
        .catch(() => this.$message.error('Failed to approve user'))
        .finally(() => this.getAllApplicationForms())
    },
    rejectWith () {
      this.rejectApplicationForm({ formId: this.user.uid })
        .then(() => this.$message.success('Success, user rejected'))
        .catch(() => this.$message.error('Failed to reject user'))
        .finally(() => this.getAllApplicationForms())
    }
  },
  created () {
    this.transaction = this.pendingTransaction.find(x => x['id'] === this.$route.params.id)
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
