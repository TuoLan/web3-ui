<template>
  <div class="workbench">
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
import { useWeb3EthContract } from "@/hooks/useWeb3EthContract"
const {ethContract, getAccounts} = useWeb3EthContract()
const tableData = ref<{
  name: string;
  count: number
}[]>([])

const dialogFormVisible = ref<boolean>(false)
const form = reactive<{name: string; count: number}>({
  name: "",
  count: 0,
});

const saveTodo = async() => {
  let account = await getAccounts();
  let res = await ethContract.methods
    .addTodo(form.name, form.count)
    .send({ from: account[0] });
  console.log(res);
  await getTableData();
  dialogFormVisible.value = false;
}

const deleteTodo = async (index: any) => {
  if(!ethContract) return
  let account = await getAccounts();
  await ethContract.methods.deleteTodo(index).send({ from: account[0] });
  await getTableData();
  dialogFormVisible.value = false;
};

const getTableData = async() => {
  let account = await getAccounts();
  console.log(account);
  tableData.value = await ethContract.methods
    .getUserTodoList()
    .call({ from: account[0] });
}

onMounted(async () => {
  await getTableData();
});
</script>

<style lang="scss">
.workbench {
  font-size: 18px;
  font-weight: 600;
}
</style>
