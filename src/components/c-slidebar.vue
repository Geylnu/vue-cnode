<template>
  <div v-if="info.loginname !== undefined">
    <div class="panel userInfo">
      <header v-if="info.loginName==='topic'">作者</header>
      <header v-else-if="info.loginName='userInfo'">个人信息</header>
      <div class="info">
        <div class="img-container">
          <router-link :to="{name: 'userInfo',params:{loginName: info.loginname}}">
            <img :src="info.avatar_url" alt="avatar">
          </router-link>
          <router-link :to="{name: 'userInfo',params:{loginName: info.loginname}}">
            <span class="loginName">{{info.loginname}}</span>
          </router-link>
        </div>
        <dl>
          <dt class="github" v-if="info.githubUsername">
            <img src="../assets/github.svg" alt="github" srcset>
          </dt>
          <dd class="github" v-if="info.githubUsername">
            <a :href="'https://github.com/'+info.githubUsername">@{{info.githubUsername}}</a>
          </dd>
          <dt class="score">积分</dt>
          <dd class="score">{{info.score}}</dd>
          <dt class="registTime">注册时间</dt>
          <dd class="registTime">{{info.create_at|formatDate}}</dd>
        </dl>
      </div>
    </div>
    <div class="panel otherTopic" v-if="$route.name!=='userInfo'">
      <header>作者其它话题</header>
      <div class="list">
        <div class="cell" v-for="topic of topics()" :key="topic.id">
          <router-link :to="{name:'topic',id:topic.id}" :title="topic.title">{{topic.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import api from "../api.js";

export default {
  name: "cslidebar",
  data() {
    return {
      info: {},
      showAll: false
    };
  },
  methods: {
    async getData() {
      let { loginName } = this.$route.params;
      let {
        data: { data, success }
      } = await this.$http.get(api.userInfo + loginName);
      if (success) {
        this.info = data;
      }
    },
    topics(limitNum = 5) {
      let replyArray = this.info.recent_topics || [];
      if (replyArray.length > limitNum && this.showAll === false) {
        replyArray = replyArray.slice(0, limitNum);
      }
      return replyArray;
    }
  },
  watch: {
    $route: function() {
      this.getData();
    },
    info: function() {
      this.$eventBus.$emit("infoChanged", this.info);
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
dd,
dt {
  display: inline-block;
  padding: 5px;
}

dt {
  width: 35%;
}
dd {
  width: 65%;
  margin-left: 0px;
}

.info {
  padding: 10px;
}

.info .img-container {
  vertical-align: middle;
  font-size: 16px;
}

.info img {
  width: 50px;
  vertical-align: bottom;
}

.info .github,
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

.info .github img {
  width: 20px;
}

.info .github a {
  cursor: pointer;
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
</style>
