<template>
  <el-container id="app-container">
      <el-aside width="270px" id="side-menu">
        <div class="user-info">
          <div>
            <p class="user-name">{{ username }}</p>
          </div>
          <div @click="onLogout" class="logout">
            <img src="@/assets/sign-out.svg" style="width: 20px;" />
          </div>
        </div>
        <div class="menu-list">
          <el-menu
            :router="true"
            :default-active="currentActiveMenu"
          >
            <el-menu-item index="/transactions">
              <span class="menu-item_text">Transactions</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main id="main">
        <router-view />
      </el-main>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import storageUtil from '@/utils/storage-util'

export default {
  name: 'dashboard',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ]),
    currentActiveMenu () {
      return this.$route.path
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    onLogout () {
      storageUtil.removeItem('token')
      this.$router.push('login')
    }
  }
}
</script>

<style scoped>
#app-container {
  min-height: 100vh;
}

#side-menu {
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  border-right: 1px solid #eaeaea
}

#main {
  padding: 0;
  margin-left: 270px;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e8e8e8;
}

.user-name{
  font-size: 1rem;
  margin-bottom: 0.4rem;
  margin-left: 1.5rem;
  text-transform: capitalize;
}

.logout {
  cursor: pointer;
  margin-right: 1.5rem;
}

.menu-list {
  flex: 1;
}

.menu-list >>> .el-menu {
  border-right: 0px
}

.menu-list >>> .el-menu-item.is-active{
  background: #e43e33;
  color: rgb(255, 255, 255, 1);
  font-weight: 500;
}

.badge {
  float: right;
  width: 2rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-right: 0.5rem;
  background-color: #e43e33;
  color: #ffffff;
}

.el-menu-item.is-active >>> .badge {
  background-color: #ffffff;
  color: #e43e33;
}

.badge p {
  line-height: 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.menu-item {
  color: #00111f;
  display: block;
  padding: 1rem .5rem 1rem 1.5rem;
}

.menu-item_text svg {
  margin-right: 0.5rem;
  width: 1rem;
}
.router-link-active > .menu-item_text {
  color: rgb(255, 255, 255, 1)
}

.menu-item.router-link-active {
  background: #e43e33;
  color: white;
  font-weight: 500;
  pointer-events: none;
}

a.menu-item:hover span {
  opacity: 1;
  color: #000000;
}
</style>
