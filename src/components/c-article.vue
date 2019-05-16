<template>
  <div class="article">
    <div class="loading" v-if="loading"></div>
    <main v-else>
      <div class="panel topic">
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
            <li class="tap" v-if="post.tab">
              来自
              <span>{{post|tagParse(false)}}</span>
            </li>
          </ul>
        </div>
        <div class="content author" v-html="post.content"></div>
      </div>
      <div class="panel comment">
        <header>
          <span>{{post.replies.length}} 回复</span>
        </header>
        <div class="list">
          <c-comment
            :reply="item"
            :index="index"
            v-for="(item,index) of post.replies"
            :key="item.id"
            :test="post.replies"
          ></c-comment>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from "../api.js";
import cComment from "./c-comment.vue";

export default {
  name: "c-article",
  data() {
    return {
      post: {},
      loading: true
    };
  },
  components: {
    cComment
  },
  methods: {
    async getTopicInfo() {
      let id = this.$route.params.id;
      let {
        data: { data, success }
      } = await this.$http.get(api.topic + id);
      if (success) {
        this.post = data;
        this.loading = false;
      }
    }
  },
  beforeMount() {
    this.getTopicInfo();
  }
};
</script>

<style scoped>
.panel.topic,
.panel.comment {
  width: 90%;
  max-width: 1400px;
  min-width: 960px;
}

.panel .header {
  padding-top: 20px;
  padding-bottom: 5px;
}

.panel .header,
.panel .content.author {
  padding-left: 10px;
  padding-right: 10px;
}

.panel .content.author {
  border-top: 1px solid rgb(229, 229, 229);
}

.panel .content.author .markdown-text {
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

div.top span {
  vertical-align: 30%;
  margin-right: 0.5em;
}

div.top h1 {
  display: inline;
  font-size: 22px;
}

ul.detail {
  padding: 0px;
}

ul.detail li {
  float: left;
  list-style: none;
  margin: 0px 5px;
  font-size: 12px;
  color: #838383;
}

ul.detail li::before {
  content: "•";
  margin-right: 0.5em;
}

.comment header {
  background-color: #f6f6f6;
  padding: 10px;
}

.comment header span {
  line-height: 20px;
}
</style>