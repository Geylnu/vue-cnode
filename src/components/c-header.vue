<template>
  <header>
    <nav class="inner">
      <div class="container clearfix">
        <a href="/" class="logo">
          <img src="../assets/logo.svg" alt class="logo">
        </a>
        <ul class="clearfix">
          <li><a href="###">首页</a></li>
          <li><a href="###">新手入门</a></li>
          <li><a href="###">API</a></li>
          <li><a href="###">关于</a></li>
          <li><a href="###">登录</a></li>
          <li><a href="###">注册</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "c-header"
};
</script>

<style scoped>
header {
  height: 50px;
  background-color: #444;
}

.container{
  min-width: 960px;
  max-width: 1440px;
  margin: auto;
}

a.logo {
  float: left;
  display: block;
  height: 34px;
  padding: 3px 0px;
}

img.logo {
  vertical-align: middle;
  width: 120px;
}

nav.inner {
    background-color: inherit;
  width: 90%;
  margin: auto;
  padding: 5px;
}

ul {
  float: right;
  line-height: 20px;
  margin: 0px;
  padding: 0px;
}

ul > li {
  font-size: 13px;
  padding: 10px 15px;
  float: left;
  color: #ccc;
  list-style: none;
}

ul > li  a:hover {
    color: #fff;
}

ul > li a:active{
    color: #3f82c4;
}
</style>