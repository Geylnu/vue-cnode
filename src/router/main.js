import Vue from 'vue'
import VueRouter from 'vue-router'

import cPostList from '../components/c-post-list'
import cArtical from '../components/c-article'
import cUserinfo from '../components/c-userInfo'
import cSlidebar from '../components/c-slidebar'
import cLogin from '../components/c-login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/all' },
    {
      name: 'root',
      path: '/:tab',
      components: {
        main: cPostList,
        slidebar: cLogin,
      }
    },
    {
      name: 'topic',
      path: '/topic/:loginName/:id',
      components: {
        main: cArtical,
        slidebar: cSlidebar,
      }
    },
    {
      name: 'userInfo',
      path: '/user/:loginName',
      components: {
        slidebar: cSlidebar,
        main: cUserinfo,
      }
    }
  ]
})

export default router
