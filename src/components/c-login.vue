<template>
  <div>
    <div
      class="login-container panel"
      v-show="status !== statusCode.SUCCESS && status !==statusCode.REUSETOKEN"
    >
      <header>登录</header>
      <form>
        <div class="input-wrapper">
          <input
            type="text"
            v-model.trim="accesstoken"
            placeholder="在此粘贴accesstoken"
            @change="verifyInput()"
            @input="debounce(verifyInput,500)()"
          >
        </div>
        <div class="msg" v-show="msg">{{msg}}</div>
      </form>
    </div>
    <div class="info" v-if="status === statusCode.SUCCESS">
      <div class="loginUserInfo-container panel">
        <header>个人信息</header>
        <div class="img-container info">
          <router-link :to="{name: 'userInfo',params:{loginName: info.loginname}}">
            <img :src="info.avatar_url" alt="avatar">
          </router-link>
          <router-link :to="{name: 'userInfo',params:{loginName: info.loginname}}">
            <span class="loginName">{{info.loginname}}</span>
          </router-link>
        </div>
      </div>
      <div class="panel">
        <header>最近收藏的主题</header>
        <div class="list">
          <div class="cell" v-if="topics().length ===0">暂无收藏</div>
          <div class="cell" v-for="topic of topics()" :key="topic.id">
            <router-link
              :to="{name:'topic',params:{id: topic.id, loginName: topic.author.loginname}}"
              :title="topic.title"
            >{{topic.title}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
import token from './token'

const statusCode = {
  NORMAL: "NORMAL",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILD: "FAILD",
  VERIFYFAILD: "VERIFYFAILD",
  REUSETOKEN: "REUSETOKEN"
};

const statusMsg = {
  NORMAL: "",
  PENDING: "验证Token中",
  SUCCESS: "验证成功",
  FAILD: "验证失败",
  VERIFYFAILD: "Token有误"
};

export default {
  name: "cLogin",
  mixins:[token],
  data() {
    let vh = window.innerWidth
    let isMobile = vh <= 960
    return {
      statusCode,
      status: statusCode.NORMAL,
      loginName: "",
      msg: "",
      timerId: 0,
      info: {},
      collectedTopic: [],
      isMobile
    };
  },
  watch: {
    status(newStatus, oldStatus) {
      this.msg = statusMsg[newStatus];
      if (newStatus === this.statusCode.SUCCESS) {
        this.$eventBus.$emit("login",this.info);
      }
    }
  },
  created() {
    this.$eventBus.$on("loginout", () => {
      this.loginout();
    });

    this.reuseToken();
  },
  methods: {
    async reuseToken() {
      if (this.accesstoken !== '') {
        this.status = this.statusCode.REUSETOKEN;
        await this.postToken();
        await this.getCollectTopic();
      }
    },
    topics(limitNum = 5) {
      let topicArray = this.collectedTopic || [];
      if (topicArray.length > limitNum) {
        topicArray = topicArray.slice(0, limitNum);
      }
      return topicArray;
    },
    debounce(func, time, params) {
      return () => {
        if (this.timerId) {
          window.clearTimeout(this.timerId);
        }
        this.timerId = window.setTimeout(() => {
          func.apply(this, params);
        }, time);
      };
    },
    verifyInput() {
      let verifySuccess = true;
      if (this.accesstoken === "") {
        this.status = statusCode.NORMAL;
        return;
      }
      if (this.accesstoken.length < 36) {
        verifySuccess = false;
      }

      if (verifySuccess) {
        this.login();
      } else {
        this.status = this.statusCode.VERIFYFAILD;
      }
    },
    async login(tokenCorrect) {
      if (
        this.status !== this.statusCode.PENDING &&
        this.status !== this.statusCode.SUCCESS
      ) {
        this.status = this.statusCode.PENDING;
        let success = await this.postToken();
        if (success) {
          sessionStorage.setItem("accesstoken", this.accesstoken);
          this.saveToken();
          if(this.isMobile && this.$route.name !== 'root'){
            this.$router.push({name:'root',params:{tab:'all'}})
          }else{
            this.getCollectTopic();
          }
        }
      }
    },
    loginout() {
      this.clearToken()
      this.status = this.statusCode.NORMAL;
    },
    async postToken() {
      try {
        let { data } = await this.$http.post(api.login, {
          accesstoken: this.accesstoken
        });
        this.info = data;
        this.status = this.statusCode.SUCCESS;
        return true;
      } catch (error) {
        let { response:{status} } = error;
        if (status === 401) {
          this.status = this.statusCode.FAILD;
          return false;
        }else{
          throw error
        }
      }
    },
    async getCollectTopic() {
      let {
        data: { data, success }
      } = await this.$http.get(api.collected + this.info.loginname);
      if (success) {
        this.collectedTopic = data;
      }
    }
  }
};
</script>

<style scoped>
form {
  padding: 15px 10px;
}

form input {
  padding: 2px;
  position: relative;
}

form input[type="text"] {
  width: 100%;
}

form .msg {
  padding: 2px;
  margin-top: 5px;
  font-size: 14px;
  color: gray;
}

.info .img-container {
  vertical-align: middle;
  font-size: 16px;
  padding: 10px;
}

.info img {
  width: 50px;
  vertical-align: bottom;
}

.info .loginName {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info .loginName {
  display: inline-block;
  vertical-align: top;
  line-height: 50px;
  margin-left: 0.5em;
  color: #778087;
  width: 70%;
}

.list {
  padding: 10px;
}

.cell {
  max-width: 270px;
  margin: auto auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #778087;
  font-size: 14px;
}

.cell a {
  line-height: 30px;
}

.cell a:hover {
  text-decoration: underline;
}

@media (max-width: 961px){
  .login-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top:30vh;
    width: 90%;
  }

  header,form{
    width: 100%;
  }
}
</style>
