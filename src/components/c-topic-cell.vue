<template>
  <div>
    <div class="cell" v-if="!isMobile">
      <router-link :to="{name:'userInfo',params:{loginName:topic.author.loginname}}" class="avatar">
        <img class="avatar" :src="topic.author.avatar_url" alt :title="topic.author.loginname" />
      </router-link>
      <span class="replayAndVisited" v-if="topic.visit_count!== undefined">
        <span class="reply_count">{{topic.reply_count}}</span>
        <span class="count_seperator">/</span>
        <span class="visites_count">{{topic.visit_count}}</span>
      </span>
      <span class="topicList">
        <span
          v-if="topic.tab || topic.good || topic.top"
          :class="['tag',{spe: topic.good || topic.top}]"
        >{{topic | tagParse}}</span>
        <span class="topic_title">
          <router-link
            :title="topic.title"
            :to="{name:'topic',params:{id: topic.id,loginName:topic.author.loginname}}"
          >{{topic.title}}</router-link>
        </span>
      </span>
      <span class="lastReplayTime">{{topic.last_reply_at | formatDate}}</span>
    </div>
    <!-- 移动端兼容布局 -->
    <div class="cell mobile" v-else>
              <router-link
          :to="{name:'userInfo',params:{loginName:topic.author.loginname}}"
          class="avatar"
        >
          <img class="avatar" :src="topic.author.avatar_url" alt :title="topic.author.loginname" />
        </router-link>
      <div class="topicDetail">
        <div class="userInfo">
          <span class="loginName">{{topic.author.loginname}}</span>
          <span
            v-if="topic.tab || topic.good || topic.top"
            :class="['tag',{spe: topic.good || topic.top}]"
          >{{topic | tagParse}}</span>
        </div>

        <div class="topicData">
          <span class="lastReplayTime">{{topic.last_reply_at | formatDate}}</span>
          <div class="right-wrapper" v-if="topic.reply_count!=undefined && topic.visit_count !=undefined ">
            <span class="reply_count">{{topic.reply_count}} 回复</span>
            <span class="visites_count">{{topic.visit_count}}次阅读</span>
          </div>
        </div>
        <span class="topicList">
          <span class="topic_title">
            <router-link
              :title="topic.title"
              :to="{name:'topic',params:{id: topic.id,loginName:topic.author.loginname}}"
            >{{topic.title}}</router-link>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cTopicCell",
  props: ["topic"],
  data() {
    let vh = window.innerWidth;
    let isMobile = vh <= 960;
    return {
      isMobile
    };
  }
};
</script>

<style scoped>
.cell {
  display: flex;
  justify-items: center;
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
}

.replayAndVisited {
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

.topicList {
  white-space: nowrap;
  width: 80%;
  display: block;
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
  color: #778087;
  font-size: 12px;
  margin-left: auto;
  margin-right: 0;
}

.cell.mobile .tag {
  margin-bottom: 5px;
  line-height: 1.5em;
}

.cell.mobile .topicList {
  display: flex;
  white-space: normal;
  width: 100%;
  flex-shrink: 1 0 auto;
}

.cell.mobile .topicDetail {
  display: flex;
  flex-direction: column;
  margin-left: 0.5em;
  width: 100%;
}

.cell.mobile .topicDetail .userInfo .tag{
  margin-left: 0.5em;
}

.cell.mobile .topicDetail .loginName {
  line-height: 1.2em;
  margin-bottom: 0.25em;
}

.cell.mobile .topic_title {
  margin: 0;
}

.cell.mobile .topicData {
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 0.25em;
}

.cell.mobile .topicData span {
  text-align: left;
  min-width: 50px;
  color: #778087;
  font-size: 12px;
  line-height: 1.2em;
}

.cell.mobile .topicData .right-wrapper {
  margin-left: auto;
  margin-right: 0;
  line-height: 1.2em;
}

.cell.mobile .topicData span.reply_count,
.cell.mobile .topicData span.visites_count {
  margin-left: 1em;
}

.cell.mobile .lastReplayTime {
  margin: 0;
}
</style>
