<template>
  <div>
  <c-header></c-header>
  <router-view name='main'></router-view>
  </div>
</template>

<script>
import cHeader from './components/c-header.vue'
import cPostList from './components/c-post-list'
import cArtical from './components/c-article'
import router from './router/main.js'


export default {
  name: 'app',
  router,
  components: {
    cHeader,cPostList,cArtical
  }
}
</script>

<style>
/* 处理内容加载出现滚动条导致平移的问题 */
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}

*,*::after,*::before{
  box-sizing: border-box;
}

.clearfix::after{
  display: block;
  content: '';
  clear: both;
}

a{
  color: inherit;
  text-decoration: none;
}

body{
  background: #e4e2e4;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
