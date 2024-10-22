<template>
  <div class="app">
    <div v-if="accountAddress">{{ accountAddress }}</div>
    <el-button v-else type="primary" @click="handleConnectAccount"> 连接钱包 </el-button>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="web3.js" name="/workbench"/>
      <el-tab-pane label="ethers" name="/ethers-test"/>
      <el-tab-pane label="stake" name="/stake"/>
      <el-tab-pane label="fcb" name="/fcb"/>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue"
import router from './router';

const activeName = ref<string>('web3')
const accountAddress = ref<string>('')

const handleClick = (event:any) => {
  router.push(event.paneName)
}

const handleConnectAccount = async() => {
  const requestAccounts = await window?.ethereum?.request({ method: 'eth_requestAccounts' })
  accountAddress.value = requestAccounts[0]
}
onMounted(async () => {
  const accounts = await window.ethereum?.request({ method: 'eth_accounts' }) || []
  if (accounts.length > 0) {
    accountAddress.value = accounts[0]
  }
})

provide('addressChange', accountAddress);
</script>

<style lang="scss">
.app {
  height: 100vh;
}
</style>
