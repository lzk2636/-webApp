import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path:"/",
    redirect:"/homemusic"
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'homemusic',// 配置首页
        component: () => import("@/views/HomeMusic"),

      },
      {
        path: 'remplaylist',//推荐歌单
        component: () => import("@/views/RecPlaylist"),

      },
      {
        path: 'newmusic',//最新歌单
        component: () => import("@/views/NewMusic"),

      },
      {
        path: 'movice',
        component: () => import("@/views/Movice"),

      }
    ]
  },
  {
    path:"/mv/:id",
    component:()=>import('@/views/MvPlayer')
  },
  {
    path:"/playlist/:id",
    component:()=>import('@/views/PlayerList')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
