import Vue from 'vue'
import VueRouter from 'vue-router'

import cHeader from '../components/c-header.vue'
import cPostList from '../components/c-post-list'
import cArtical from '../components/c-article'

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
      }
    ]
  })

export default router
