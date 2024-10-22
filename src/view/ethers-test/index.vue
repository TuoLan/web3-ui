<template>
  <div class="ethers-test">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="count" label="Count" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="deleteTodo(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="dialogFormVisible = true">新增</el-button>
    <el-dialog v-model="dialogFormVisible" title="添加">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number
            v-model="form.count"
            :min="1"
            :max="10"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false"> 取消 </el-button>
          <el-button type="primary" @click="saveTodo"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { connectAccount } from "@/utils/connectAccount"
import { demoAddress, demoAbi } from "./configs"
let ethContract: {[key: string]: any}
const tableData = ref<{
  name: string;
  count: number
}[]>([])

const dialogFormVisible = ref<boolean>(false)
const form = reactive<{name: string; count: number}>({
  name: "",
  count: 0,
});

const accountAddress = inject<Ref<string>>('addressChange');

const saveTodo = async() => {
  const res = await ethContract.addTodo(form.name, form.count)
  dialogFormVisible.value = false;
  await res.wait();
  await getTableData();
}

const deleteTodo = async (index: any) => {
  const res = await ethContract.deleteTodo(index)
  await res.wait();
  await getTableData();
};

const getTableData = async() => {
  tableData.value = await ethContract.getUserTodoList()
}

watch(() => accountAddress?.value, async() => {
  ethContract = await connectAccount(demoAddress, demoAbi)
  getTableData();
}, {
  immediate: true
});
</script>

<style lang="scss">
.ethers-test {
  font-size: 18px;
  font-weight: 600;
}
</style>
