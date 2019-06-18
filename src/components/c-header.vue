<template>
  <header>
    <nav class="inner">
      <div class="container clearfix">
        <router-link :to="{name: 'root',params:{tab:'all'}}" class="logo">
          <img src="../assets/logo.svg" alt class="logo">
        </router-link>
        <ul class="clearfix">
          <li>
            <a href="###">首页</a>
          </li>
          <li>
            <a href="###">新手入门</a>
          </li>
          <li>
            <a href="###">API</a>
          </li>
          <li>
            <a href="###">关于</a>
          </li>
          <li v-if="isLogin" @click="loginout()" class="loginout"><a >退出</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "c-header",
  data(){
    return {
      isLogin: false
    }
  },
  methods:{
    loginout(){
      this.$eventBus.$emit('loginout')
      this.isLogin = false
    }
  },
  created(){
    this.$eventBus.$on('login',()=>{
      this.isLogin = true
    })
  }
};
</script>

<style scoped>
header {
  height: 50px;
  background-color: #444;
}

.container {
  min-width: 960px;
  max-width: 1440px;
  margin: auto;
}

li.loginout{
  cursor: pointer;
}

a.logo {
  float: left;
  line-height: 40px;
  display: block;
}

img.logo {
  width: 120px;
  vertical-align: middle;
  padding-bottom: 5px;
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

ul > li a:hover {
  color: #fff;
}

ul > li a:active {
  color: #3f82c4;
}
</style>