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
        <div class="loadMore" v-show="!loadMore">已经看完{{page}}页了，再次下滑加载更多</div>
        <div class="loadMore" v-show="loadMore">加载中。。。</div>
      </main>
    </div>
    <div class="test" v-if="readyLoadMore"></div>
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
      page: 1,
      limit: 40,
      postList: [],
      title: "CNode：Node.js专业中文社区",
      readyLoadMore: false,
      loadMore: false
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
        params: {
          tab: this.$route.params.tab,
          page: this.page,
          limit: this.limit
        }
      });
      if (success) {
        this.postList =
          this.postList.length !== 0 ? this.postList.concat(data) : data;
      }
      return success
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
  mounted() {
    this.scrollLoad = (e) => {
      let sTop = document.documentElement.scrollTop
      let vh = window.innerHeight || document.documentElement.clientHeight;
      let dh = document.body.clientHeight
      if ( dh - sTop -vh === 0) {
        if (!this.readyLoadMore){
          setTimeout(() => {
            this.readyLoadMore = true;
          }, 400);
        }

        if (this.readyLoadMore === true && !this.loadMore) {
          this.page += 1;
          this.loadMore = true;
          this.getData().then((success) => {
            if (success) {
              this.loadMore = false;
              this.readyLoadMore = false
            } else {
              this.loadMoreSuccess = false;
            }
          });
        }
      }
    }
    document.addEventListener("scroll",this.scrollLoad);
  },
  destroyed(){
    document.removeEventListener('scroll',this.scrollLoad)
  }
};
</script>

<style scoped>
.test {
  height: 1em;
  background-color: transparent;
  visibility: hidden;
}
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

.loadMore {
  text-align: center;
}
</style>

