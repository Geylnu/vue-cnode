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
        <div class="loadMore" v-show="loadMore">
          <div class="dots">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
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
      page: 1,
      limit: 40,
      postList: [],
      title: "CNode：Node.js专业中文社区",
      loadMore: false
    };
  },
  components: {
    cTopicCell
  },
  methods: {
    async getData(noSwitch = true) {
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
          this.postList.length !== 0 && noSwitch
            ? this.postList.concat(data)
            : data;
      }
      return success;
    },
    handleScroll() {
      let top = this.$el.getBoundingClientRect().bottom;
      let vh = window.innerHeight || document.documentElement.clientHeight;

      if (top - vh < 20 && !this.loadMore) {
        this.loadMore = true;
        this.page++;
        this.getData().then(success => {
          this.loadMore = !success;
        });
      }
    }
  },
  watch: {
    $route() {
      this.getData(false);
    }
  },
  created() {
    this.getData(false);
  },
  mounted() {
    document.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.panel.topicList {
  font-size: 15px;
  line-height: 2em;
}

.topicTap {
  display: flex;
  justify-content: flex-start;
}

.topicTap a {
  color: #80bd01;
  margin-right: 20px;
  padding: 0px 5px;
  background-color: transparent;
}

.topicTap a:hover {
  color: #5c94b1;
}

a.topicTap.active {
  background-color: #80bd01;
  color: #fff;
  border-radius: 3px;
}

.loadMore {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
}

.dots {
  width: 4em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.dots div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #80bd01;
  animation: fade 0.8s ease-in-out alternate infinite;
}

.dots div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.dots div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}


@media (max-width: 961px) {
  .topicTap a.topicTap {
    color: #80bd01;
    margin: auto;
    position: relative;
    flex-wrap: wrap;
    background-color: transparent;
  }

  a.topicTap::after {
    position: absolute;
    top: 100%;
    left: 0px;
    content: "";
    width: 0%;
    background-color: #1f7caa;
    transition: all 0.3s;
    height: 2px;
  }

  a.topicTap.active::after {
    content: "";
    width: 100%;
  }
}
</style>

