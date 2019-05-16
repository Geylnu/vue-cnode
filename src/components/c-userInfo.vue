<template>
  <div class="userInfo">
    <div class="panel profile">
      <header>主页</header>
      <div class="content"></div>
    </div>
    <div class="panel recentTopics">
      <header>最近创建的话题</header>
      <div class="list">
        <c-topic-cell v-for="topic of topics()" :key="topic.id" :topic="topic"></c-topic-cell>
        <div class="moreTopic" v-if="!showAll">
          <span @click="showAll = true">

          查看更多»
          </span>
        </div>
      </div>
    </div>
    <div class="panel recentReplies" v-if="!showAll">
      <header>最近参与的话题</header>
      <div class="list">
        <c-topic-cell v-for="topic of info.recent_replies" :key="topic.id" :topic="topic"></c-topic-cell>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
import cTopicCell from "./c-topic-cell";

export default {
  name: "cUserinfo",
  data() {
    return {
      info: {},
      showAll: false,
    };
  },
  components: {
    cTopicCell
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
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<style scoped>
.moreTopic {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}

.moreTopic span{
  cursor: pointer
}
</style>

