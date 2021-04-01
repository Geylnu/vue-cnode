<template>
  <main class="userInfo">
    <div class="panel recentTopics">
      <header>最近创建的话题</header>
      <div class="list">
        <div v-if="topics().length === 0" class="cell">还没有创建过什么话题</div>
        <c-topic-cell v-for="topic of topics()" :key="topic.id" :topic="topic"></c-topic-cell>
        <div class="moreTopic" v-if="!showAll && needShowMore">
          <span @click="showAll = true">
          查看更多»
          </span>
        </div>
      </div>
    </div>
    <div class="panel recentReplies" v-if="!showAll">
      <header>最近参与的话题</header>
      <div class="list">
      <div class="cell" v-if="info.recent_replies && info.recent_replies.length === 0">还没有参与什么话题</div>
        <c-topic-cell v-for="topic of info.recent_replies" :key="topic.id" :topic="topic"></c-topic-cell>
      </div>
    </div>
  </main>
</template>

<script>
import cTopicCell from "./c-topic-cell";

export default {
  name: "cUserinfo",
  data() {
    return {
      info: {},
      showAll: false,
      needShowMore: false,
    };
  },
  components: {
    cTopicCell
  },
  methods: {
    topics(limitNum = 5) {
      let replyArray = this.info.recent_topics || [];
      let needShowMore = replyArray.length > limitNum
      this.needShowMore = needShowMore
      if (needShowMore && this.showAll === false) {
        replyArray = replyArray.slice(0, limitNum);
      }
      return replyArray;
    }
  },
  created() {
    this.$eventBus.$on('infoChanged',info=>{this.info =info})
  }
};
</script>

<style scoped>
.moreTopic {
  padding: 10px;
  border-top: 1px solid #f0f0f0;
}

.moreTopic span{
  cursor: pointer
}

.cell{
  padding: 10px;
}
</style>

