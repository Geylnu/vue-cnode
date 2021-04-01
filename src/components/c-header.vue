<template>
  <header>
    <div :class="['mask',{active:ulActive}]"></div>
    <div class="container">
      <div class="m-wrapper">
        <router-link :to="{name: 'root',params:{tab:'all'}}" class="logo">
          <img src="../assets/logo.svg" alt class="logo" />
        </router-link>
        <menu>
          <router-link v-if="isLogin" :to="{name:'userInfo',params:{loginName:info.loginname}}">
            <img class="avatar" :src="info.avatar_url" />
          </router-link>
          <router-link v-else :to="{name:'login'}" @click.native="ulActive=false">登录</router-link>
          <svg
            @click="ulActive=!ulActive"
            :class="{active:ulActive}"
            t="1561186415629"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2237"
          >
            <path
              d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 784H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 472H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
              p-id="2238"
            />
          </svg>
        </menu>
      </div>
      <ul :class="{active:ulActive}">
        <li @click="ulActive=!ulActive">
          <router-link :to="{name: 'root',params:{tab:'all'}}" >首页</router-link>
        </li>
        <li>
          <a href="https://cnodejs.org/getstart">新手入门</a>
        </li>
        <li>
          <a href="https://cnodejs.org/api">API</a>
        </li>
        <li>
          <a href="https://github.com/Geylnu/vue-cnode">关于</a>
        </li>
        <li v-if="isLogin" @click="loginout()" class="loginout">
          <a>退出</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import token from "./token";

export default {
  name: "c-header",
  mixins: [token],
  data() {
    return {
      info: {},
      isLogin: false,
      ulActive: false
    };
  },
  methods: {
    loginout() {
      this.$eventBus.$emit("loginout");
      this.isLogin = false;
      this.info = {};
      this.ulActive = false;
    },
    handScroll() {
      let scrollTop = window.scrollY;
      if (this.ulActive) {
        this.ulActive = !(scrollTop > 5);
      }
    }
  },
  created() {
    this.isLogin = !!this.accesstoken;

    this.$eventBus.$on("login", info => {
      this.isLogin = true;
      this.info = info;
    });
  },
  mounted() {
    window.addEventListener("scroll", this.handScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handScroll);
  }
};
</script>

<style scoped>
header {
  min-height: 50px;
  background-color: #444;
  display: flex;
  justify-content: center;
  align-content: center;
}

.container {
  box-sizing: border-box;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 960px;
  max-width: 1440px;
  margin: auto;
  width: 100%;
}

li.loginout {
  cursor: pointer;
}

a.logo {
  line-height: 40px;
}

img.logo {
  width: 120px;
  vertical-align: middle;
  padding-bottom: 5px;
}

menu {
  display: none;
  padding: 0px;
  margin: 0px;
}

.m-wrapper {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

menu svg {
  display: none;
}

ul {
  display: flex;
  justify-content: center;
  align-content: center;
  align-self: flex-end;
  margin: 0px;
  padding: 0px;
}

ul > li {
  font-size: 13px;
  padding: 10px 15px;
  color: #ccc;
  list-style: none;
  text-align: center;
}

ul > li a:hover {
  color: #fff;
}

ul > li a:active {
  color: #3f82c4;
}

@media (max-width: 961px) {
  .mask {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    transition: all 0.3s;
    z-index: -1;
  }

  .mask.active {
    background-color: rgba(104, 97, 110, 0.4);
    z-index: 5;
  }

  header {
    position: relative;
  }
  .container {
    min-width: 0;
    width: 100%;
    flex-wrap: wrap;
  }

  menu {
    display: flex;
    align-content: center;
    height: 40px;
  }
  menu a {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 40px;
    color: #cdcdcd;
    margin-right: 0.5em;
    font-size: 15px;
  }
  menu svg {
    display: block;
    width: 30px;
    fill: #cdcdcd;
    transition: all 0.3s;
  }

  menu img.avatar {
    width: 30px;
    height: 30px;
    display: block;
  }

  menu svg.active {
    fill: #80bd01;
  }

  .m-wrapper {
    width: 100%;
    z-index: 11;
    background-color: #444;
    padding: 5px 5%;
  }

  ul {
    position: absolute;
    left: 0px;
    top: 95%;
    background-color: #444;
    width: 100%;
    flex-direction: column;
    transform: translateY(-100%);
    transition: all 0.3s;
    z-index: 5;
  }

  ul.active {
    display: flex;
    transform: translateY(0);
  }
}
</style>