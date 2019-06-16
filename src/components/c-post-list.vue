<template>
  <div class="content">
    <div class="panel topicList">
      <header class="topicTap">
        <router-link
          v-for="tab of tabs"
          :class="['topicTap',{active: $route.params.tab === tab.key}]"
          :key="tab.key"
          :to="{name:'root',params:{tab:tab.key}}"
        >{{tab.text}}</router-link>
      </header>
      <main>
        <div class="topics">
          <c-topicCell v-for="topic of postList" :key="topic.id" :topic="topic"></c-topicCell>
        </div>
        <div class="pagination"></div>
      </main>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
import cTopicCell from "./c-topic-cell";

export default {
  name: "c-post-list",
  data() {
    return {
      tabs: [
        { key: "all", text: "全部" },
        { key: "good", text: "精品" },
        { key: "share", text: "分享" },
        { key: "ask", text: "问答" },
        { key: "job", text: "招聘" }
      ],
      postList: [],
      title: "CNode：Node.js专业中文社区"
    };
  },
  components: {
    cTopicCell
  },
  methods: {
    async getData() {
      let {
        data: { data, success }
      } = await this.$http.get(api.topics, {
        params: { tab: this.$route.params.tab }
      });
      if (success) {
        this.postList = data;
      }
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  },
  created() {
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
  font-size: 15px;
  line-height: 2em;
}

.topicTap a {
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

