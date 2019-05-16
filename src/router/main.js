import Vue from 'vue'
import VueRouter from 'vue-router'

import cPostList from '../components/c-post-list'
import cArtical from '../components/c-article'
import cUserinfo from '../components/c-userInfo'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
      {
        name:'root',
        path: '/',
        components: {
          main: cPostList
        }
      },
      {
          name: 'topic',
          path: '/topic/:id',
          components:{
              main: cArtical
          }
      },
      {
        name: 'userInfo',
        path: '/user/:loginName',
        components:{
          main: cUserinfo
        }
      }
    ]
  })

export default router
