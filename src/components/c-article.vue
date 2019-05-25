<template>
  <div class="article">
    <div class="loading" v-if="loading"></div>
    <main v-else>
      <div class="panel topic">
        <div class="header clearfix">
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
          <button
            :class="['collect',{active: post.is_collect}]"
            v-if="accesstoken!==''"
            @click="postCollect()"
          >{{post.is_collect?'取消收藏':'收藏'}}</button>
        </div>
        <div class="content author" v-html="post.content"></div>
      </div>
      <div class="panel comment">
        <header>
          <span>{{post.replies.length|formatReplaies}}回复</span>
        </header>
        <div class="list">
          <c-comment
            :reply="item"
            :index="index"
            v-for="(item,index) of post.replies"
            :key="item.id"
          ></c-comment>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from "../api.js";
import cComment from "./c-comment.vue";
import token from "./token";

export default {
  name: "c-article",
  mixins: [token],
  data() {
    return {
      post: {},
      loading: true
    };
  },
  components: {
    cComment
  },
  filters: {
    formatReplaies(value) {
      let str = value + " ";
      if (value === 0) {
        str = "暂无";
      }
      return str;
    }
  },
  methods: {
    async getTopicInfo() {
      let id = this.$route.params.id;
      let config = {
        method: "get",
        url: api.topic + id
      };
      if (this.accesstoken) {
        config.params = {
          accesstoken: this.accesstoken
        };
      }
      let {
        data: { data, success }
      } = await this.$http(config);
      if (success) {
        this.post = data;
        this.loading = false;
      }
    },
    async postCollect() {
      let id = this.$route.params.id;
      let config = {
        method: "post",
        url: this.post.is_collect ? api.cancelCollect : api.collectTopic,
        data: {
          topic_id: this.$route.params.id,
          accesstoken: this.accesstoken
        }
      };
      let {
        data: { success }
      } = await this.$http(config);

      if (success) {
        this.post.is_collect = !this.post.is_collect;
      }
    }
  },
  created() {
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

.panel .content {
  padding: 10px;
}

.panel .content.author {
  border-top: 1px solid rgb(229, 229, 229);
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

button.collect {
    display: inline-block;
    float: right;
    border: none;
    border-radius: 3px;
    padding: 3px 10px;
    margin: 0;
    font-size: 14px;
    transition: all .2s ease-in-out;
    letter-spacing: 2px;
    box-shadow: none;
    line-height: 2em;
    vertical-align: middle;
    color: #fff;
    cursor: pointer;
    background: #80bd01;
    transform: 0.3s all;
}

button.collect:hover{
  background: #6ba44e
}

button.collect.active{
  background: #e5e5e5;
  color: black;
}

button.collect.active:hover{
  background: #909090;
  color: white;
}


ul.detail {
  padding: 0px;
  float: left;
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