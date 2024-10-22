<template>
  <div class="fcb">
    <div class="label">质押总量：{{ sumStakeCount }}ETH</div>
    <div class="label">我的质押量：{{ stakeCount }}ETH</div>
    <el-input-number
      v-model="stakeInput"
      :min="0"
      controls-position="right"
    />
    <el-button type="primary" @click="handleAddStake">质押</el-button>
    <el-button type="primary" @click="handleUnStake">取消质押</el-button>
  </div>
</template>

<script setup lang="ts">
import { connectAccount } from "@/utils/connectAccount"
import {stakeAddress, stakeAbi} from "./configs"
import { ethers } from 'ethers'
let ethContract: {[key: string]: any}
const sumStakeCount = ref<string>('0')
const stakeCount = ref<string>('0')
const stakeInput = ref<number>(0)
const accountAddress = inject<Ref<string>>('addressChange');

const handleAddStake = async() => {
  const amountInWei = ethers.parseEther(stakeInput.value + ''); // 转换为 Wei
  const res = await ethContract.stake({value: amountInWei})
  await res.wait();
  getCounts()
}

const handleUnStake = async() => {
  const amountInWei = ethers.parseEther(stakeInput.value + ''); // 转换为 Wei
  const res = await ethContract.unstake(amountInWei)
  await res.wait();
  getCounts()
}

const getCounts = async() => {
  sumStakeCount.value = parseFloat(ethers.formatEther(await ethContract.totalEthStaked())).toFixed(5)
  stakeCount.value = parseFloat(ethers.formatEther(await ethContract.getStakedBalance(accountAddress?.value))).toFixed(5)
}

watch(() => accountAddress?.value, async() => {
  ethContract = await connectAccount(stakeAddress, stakeAbi)
  getCounts();
}, {
  immediate: true
});
</script>

<style lang="scss">
.fcb {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  .label {
    display: flex;
    flex-direction: row;
  }
}
</style>
