import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListUserView from '../views/UserView/ListUserView.vue'
import AddUserView from '../views/UserView/AddUserView.vue'
import UpdateUserView from '../views/UserView/UpdateUserView.vue'
import ListProjectView from '../views/ProjectView/ListProjectView.vue'
import AddProjectView from '../views/ProjectView/AddProjectView.vue'
import UpdateProjectView from '../views/ProjectView/UpdateProjectView.vue'
import ListAttendanceView from '../views/AttendanceView/ListAttendanceView.vue'
import AddAttendanceView from '../views/AttendanceView/AddAttendanceView.vue'
import UpdateAttendanceView from '../views/AttendanceView/UpdateAttendanceView.vue'

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
    path: '/user/them',
    name: 'adduser',
    component: AddUserView
  },
  {
    path: '/user/sua/:id',
    name: 'updateuser',
    component: UpdateUserView
  },
  {
    path: '/project',
    name: 'project',
    component: ListProjectView
  },
  {
    path: '/project/them',
    name: 'addproject',
    component: AddProjectView
  },
  {
    path: '/project/sua/:id',
    name: 'updateproject',
    component: UpdateProjectView
  },
  {
    path: '/attendance',
    name: 'attendce',
    component: ListAttendanceView
  },
  {
    path: '/attendance/them',
    name: 'addattendce',
    component: AddAttendanceView
  },
  {
    path: '/attendance/sua/:id',
    name: 'updateattendce',
    component: UpdateAttendanceView
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
