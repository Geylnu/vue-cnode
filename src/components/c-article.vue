<template>
  <div class="article">
    <div class="loading" v-if="loading"></div>
    <div class="panel" v-else>
      <div class="header">
        <div class="top">
        <span
          v-if="post.good||post.top"
          :class="['tag',{spe: post.good||post.top}]"
        >{{post|tagParse}}</span>
        <h1>{{post.title}}</h1>
        </div>
        <ul class="detail clearfix">
          <li class="time">发布于{{post.create_at | formatDate}}</li>
          <li class="author">作者: {{post.author&&post.author.loginname}}</li>
          <li class="visitCount">{{post.visit_count}}次浏览</li>
          <li class="tap">
            来自
            <span>{{post|tagParse(false)}}</span>
          </li>
        </ul>
      </div>
      <div class="content" v-html="post.content"></div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "c-article",
  data() {
    return {
      post: {},
      loading: true
    };
  },
  methods: {
    async getTopicInfo() {
      let id = this.$route.params.id;
      let {
        data: { data, success }
      } = await this.$http.get(api.topic + id);
      if (success) {
        this.post = data;
        this.loading =false
      }
    }
  },
  beforeMount() {
    this.getTopicInfo();
  }
};
</script>

<style>
@import url("../assets/github-markdown.css");

.article .panel {
  width: 90%;
  max-width: 1400px;
  min-width: 960px;
  min-height: 400px;
  border-radius: 5px;
  margin: 15px 240px;
  overflow: hidden;
  font-size: 15px;
  background: #ffffff;
}

.panel .header{
  padding-top: 20px;
}

.panel .header{
  padding-bottom: 5px;;
}

.panel .header,
.panel .content{
  padding-left: 10px;
  padding-right: 10px;
}

.panel .content{
  border-top: 1px solid rgb(229, 229, 229);

}

.panel .content .markdown-text{
  padding: 10px;
}

div.top .tag {
  font-size: 12px;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  background-color: #e5e5e5;
}

div.top .tag.spe {
  background: #80bd01;
  color: white;
}

div.top span{
  vertical-align: 30%;
  margin-right: 0.5em;
}

div.top h1{
  display: inline;
  font-size: 22px;
  
}

ul.detail{
  padding: 0px;
}

ul.detail li{
  float: left;
  list-style: none;
  margin: 0px 5px;
  font-size: 12px;
  color: #838383;
}

ul.detail li::before{
  content: '•';
  margin-right: 0.5em;
}
</style>

