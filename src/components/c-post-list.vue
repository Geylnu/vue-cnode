<template>
  <div class="content">
    <div class="panel topicList">
      <header class="topicTap">
        <a href="###" class="topicTap active">全部</a>
        <a href="###" class="topicTap">精品</a>
        <a href="###" class="topicTap">分享</a>
        <a href="###" class="topicTap">问答</a>
        <a href="###" class="topicTap">招聘</a>
      </header>
      <main>
        <div class="topics">
          <c-topicCell  v-for="topic of postList" :key="topic.id" :topic="topic"></c-topicCell>
        </div>
        <div class="pagination"></div>
      </main>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
import cTopicCell from "./c-topic-cell"

export default {
  name: "c-post-list",
  data() {
    return {
      postList: [],
      title: "CNode：Node.js专业中文社区"
    };
  },
  components:{
    cTopicCell
  },
  methods: {
    async getData() {
      let {
        data: { data, success }
      } = await this.$http.get(api.topics);
      if (success) {
        this.postList = data;
      }
    }
  },
  beforeMount() {
    this.getData();
  },
  filters: {
    topicUrl(id) {
      return api.topic + id;
    }
  }
};
</script>

<style scoped>

.panel.topicList {
  width: 90%;
  max-width: 1400px;
  min-width: 960px;
  min-height: 400px;
  font-size: 15px;
  line-height: 2em;
}

.topicTap a{
  color: #80bd01;
  margin-right: 20px;
}

.topicTap a:hover {
  color: #005580;
}

.topicTap.active {
  background-color: #80bd01;
  color: #fff;
  padding: 3px 5px;
  border-radius: 3px;
}
</style>

