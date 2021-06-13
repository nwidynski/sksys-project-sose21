import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Private from '../pages/Private.vue'
import ReceiptFeed from '../pages/ReceiptFeed.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSidebarMenu from 'vue-sidebar-menu'

// Import Bootstrap an BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueSidebarMenu)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/private',
    name: 'Private',
    component: Private,
    children: [
      {
        path: '/',
        redirect: 'profile'
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'receiptfeed',
        name:'ReceiptFeed',
        component: ReceiptFeed
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
