<template>
  <div>
    <div class="cell clearfix">
      <router-link :to="{name:'userInfo',params:{loginName:topic.author.loginname}}" class="avatar">
        <img class="avatar" :src="topic.author.avatar_url" alt :title="topic.author.loginname">
      </router-link>
      <span class="replayAndVisited" v-if="topic.visit_count!== undefined">
        <span class="reply_count">{{topic.reply_count}}</span>
        <span class="count_seperator">/</span>
        <span class="visites_count">{{topic.visit_count}}</span>
      </span>
      <span class="lastReplayTime">{{topic.last_reply_at | formatDate}}</span>
      <span class="topicList">
        <span
          :class="['tag',{spe: topic.good || topic.top}]"
        >{{topic | tagParse}}</span>
        <span class="topic_title">
          <router-link
            :title="topic.title"
            :to="{name:'topic',params:{id: topic.id,loginName:topic.author.loginname}}"
          >{{topic.title}}</router-link>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "cTopicCell",
  props: ["topic"]
};
</script>

<style scoped>
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
  float: left;
}

.avatar {
  width: 30px;
  height: 30px;
}

.replayAndVisited {
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

.topicList{
  white-space: nowrap;
  width: 80%;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
}

.tag {
  font-size: 12px;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  background-color: #e5e5e5;
  white-space: nowrap;
}

.tag.spe {
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

.topic_title a:visited {
  color: #888;
}

.lastReplayTime {
  text-align: right;
  min-width: 50px;
  float: right;
  color: #778087;
  font-size: 12px;
}
</style>
