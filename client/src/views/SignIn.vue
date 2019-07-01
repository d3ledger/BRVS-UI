<!--
  Copyright D3 Ledger, Inc. All Rights Reserved.
  SPDX-License-Identifier: Apache-2.0
-->
<template>
  <el-container class="auth-container">
    <div class="auth-block">
      <img id="logo" src="@/assets/logo.svg" alt="Logo"/>
      <div class="subtitle">BRVS Client</div>
      <el-form :model="form" :rules="rules" ref="loginForm" @keyup.enter.native="onSubmit">
        <el-form-item prop="username">
          <el-input
            name="username"
            v-model="form.username"
            :disabled="isLoading"
            placeholder="Username"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            name="password"
            v-model="form.password"
            :disabled="isLoading"
            placeholder="Password"
          />
        </el-form-item>
        <el-form-item class="auth-button-container">
          <el-button
            class="auth-button fullwidth btn-red"
            type="danger"
            @click="onSubmit"
            :loading="isLoading"
          >
            Log In
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'sign-in',
  data () {
    return {
      isLoading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please enter username!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter password!', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return
        this.isLoading = true
        this.login(this.form)
          .then(() => {
            this.$message.success('Success!')
            this.$router.push('/transactions')
          })
          .catch(() => this.$message.error('Ops...Error!'))
          .finally(() => {
            this.isLoading = false
          })
      })
    }
  }
}
</script>

<style scoped>
.auth-container {
  justify-content: center;
}
.auth-block {
  width: 25rem;
  padding: 3rem;
}
#wrapper {
  display: flex;
  justify-content: center;
  background: #ffffff;
  min-height: 100vh;
}

#logo {
  width: 160px;
  display: block;
  margin: 0 auto 2rem auto;
}

.subtitle {
  margin: 2rem 0;
  text-align: center;
}
</style>
