<template>
  <div>
    <c-return-top></c-return-top>
    <c-header></c-header>
    <main class="clearfix">
      <div class="slidebar">
        <div class="container">
          <router-view name="slidebar"></router-view>
        </div>
      </div>
      <router-view name="main"></router-view>
    </main>
  </div>
</template>

<script>
import cReturnTop from "./components/c-return-top"
import cHeader from "./components/c-header.vue";
import cPostList from "./components/c-post-list";
import cArtical from "./components/c-article";
import router from "./router/main.js";

export default {
  name: "app",
  router,
  components: {
    cReturnTop,
    cHeader,
    cPostList,
    cArtical
  }
};
</script>

<style>
/* 侧边栏样式 */
.slidebar {
  float: right;
  margin-left: 15px;
}

.slidebar .container {
  width: 290px;
}
/* 中心面板样式 */
main {
  max-width: 1400px;
  min-width: 960px;
  margin: auto;
  overflow: auto;
}

@media (max-width: 961px) {
  main {
    min-width: 0;
    width: 100%;
    min-height: calc(100vh-50px)
  }

  .slidebar{
    display: none;
  }
}
/* md样式文件 */
@import url("./assets/github-markdown.css");
.panel .content.author .markdown-text {
  padding: 10px;
}

/* 面板基础样式 */
.panel {
  border-radius: 5px;
  margin: 15px auto;
  overflow: hidden;
  font-size: 15px;
  background: #ffffff;
  color: #444;
}

@media (max-width: 961px){
  .panel{
    margin: auto;
  }
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

@media (max-width: 961px) {
:root body {
  position: static;
}

body {
  width: auto;
  overflow: hidden;
}
}

/* 重置盒模型 */

*,
*::after,
*::before {
  box-sizing: border-box;
}

.clearfix::after {
  display: block;
  content: "";
  clear: both;
}

/*重置a标签*/

a {
  color: inherit;
  text-decoration: none;
}

body {
  background: #e4e2e4;
}
</style>
