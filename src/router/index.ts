import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import workbench from '@/view/workbench/index.vue'
import ethersTest from '@/view/ethers-test/index.vue'
import stake from '@/view/stake/index.vue'
import fcb from '@/view/fcb/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/workbench'
  },
  {
    path: '/workbench',
    name: 'workbench',
    component: workbench
  },
  {
    path: '/ethers-test',
    name: 'ethers-test',
    component: ethersTest
  },
  {
    path: '/stake',
    name: 'stake',
    component: stake
  },
  {
    path: '/fcb',
    name: 'fcb',
    component: fcb
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_VUE_APP_BASE_PATH),
  routes
})

export default router
