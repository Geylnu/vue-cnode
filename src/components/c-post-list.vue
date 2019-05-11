<template>
  <div class="content">
    <div class="panel">
      <header class="topicTap">
        <a href="###" class="topicTap active">全部</a>
        <a href="###" class="topicTap">精品</a>
        <a href="###" class="topicTap">分享</a>
        <a href="###" class="topicTap">问答</a>
        <a href="###" class="topicTap">招聘</a>
      </header>
      <main>
        <div class="topics">
          <div class="cell clearfix" v-for="topic of postList" :key="topic.id">
            <img class="avatar" :src="topic.author.avatar_url" alt :title="topic.author.loginname">
            <span class="interactivre">
              <span class="reply_count">{{topic.reply_count}}</span>
              <span class="count_seperator">/</span>
              <span class="visites_count">{{topic.visit_count}}</span>
            </span>
            <span class="topicList">
              <span :class="['tag',{spe: topic.good || topic.top}]">{{topic | tagParse}}</span>
              <span class="topic_title">
                <router-link :to="{name:'topic',params:{id: topic.id}}">{{topic.title}}</router-link>
              </span>
            </span>
            <span class="lastReplayTime">{{topic.last_reply_at | formatDate}}</span>
          </div>
        </div>
        <div class="pagination"></div>
      </main>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "c-post-list",
  data() {
    return {
      postList: [],
      title: 'CNode：Node.js专业中文社区'
    };
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
.panel {
  width: 90%;
  max-width: 1400px;
  min-width: 960px;
  min-height: 400px;
  border-radius: 5px;
  margin: 15px 240px;
  overflow: hidden;
  font-size: 15px;
  line-height: 2em;
}

header.topicTap {
  padding: 12px 10px;
  background: #f9f7f9;
  margin: 0px;
}

.topicTap {
  color: #80bd01;
  margin-right: 20px;
}

.topicTap a:hover{
  color: #005580;
}

.topicTap.active {
  background-color: #80bd01;
  color: #fff;
  padding: 3px 5px;
  border-radius: 3px;
}

.cell {
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
  padding: 10px;
  vertical-align: bottom;
}

.cell:hover {
  background: #f8f6f8;
}

.avatar {
  width: 30px;
  height: 30px;
  float: left;
}

.interactivre {
  float: left;
  width: 70px;
  text-align: center;
  margin: 0 6px;
  vertical-align: bottom;
}
.reply_count {
  color: #7885c0;
}
.visites_count {
  font-size: 12px;
  color: #b4b4b4;
}
.count_seperator {
  font-size: 10px;
}
.tag {
  font-size: 12px;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  background-color: #e5e5e5;
}

.tag.spe{
  background: #80bd01;
  color: white;
}
  
.topic_title {
  margin-left: 1em;
  vertical-align: middle;
  font-size: 16px;
  color: rgb(51, 51, 51);
  line-height: 30px;
}

.topic_title a:hover {
  text-decoration: underline;
}

.topic_title a:visited{
  color: #888;
}

.lastReplayTime {
  text-align: right;
  min-width: 50px;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}
</style>

