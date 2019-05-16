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
  },
  
}
</script>

<style>
/* md样式文件 */
@import url("./assets/github-markdown.css");

/* 面板基础样式 */
.panel {
  border-radius: 5px;
  margin: 15px auto;
  overflow: hidden;
  font-size: 15px;
  background: #ffffff;
  color: #444;
}

.panel header {
  background-color: #f6f6f6;
  padding: 10px;
}

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

/* 重置盒模型 */

*,*::after,*::before{
  box-sizing: border-box;
}

.clearfix::after{
  display: block;
  content: '';
  clear: both;
}

/*重置a标签*/

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
