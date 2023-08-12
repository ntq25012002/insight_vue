import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListUserView from '../views/UserView/ListUserView.vue'
import ListProjectView from '../views/ProjectView/ListProjectView.vue'
import ListAttendanceView from '../views/AttendanceView/ListAttendanceView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: ListUserView
  },
  {
    path: '/project',
    name: 'project',
    component: ListProjectView
  },
  {
    path: '/attendance',
    name: 'attendce',
    component: ListAttendanceView
  },
 
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
