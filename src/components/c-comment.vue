<template>
  <div>
    <div class="cell" @mouseenter="hover.active = true" @mouseleave="hover.active = false">
      <router-link :to="{name: 'userInfo',params:{loginName:reply.author.loginname}}">
        <img class="avatar" :src="reply.author.avatar_url" alt="avatar">
      </router-link>
      <span class="detail">
        <span class="loginName">{{reply.author.loginname}}</span>
        <span class="replyTime">{{reply.create_at|formatDate}}</span>
        <span class="separator">•</span>
        <span>{{index+1}}楼</span>
        <span class="favour" v-show="hover.active ||reply.ups.length">
          <img src="../assets/favour.svg" alt srcset>
          <span class="ups">{{reply.ups.length?reply.ups.length:''}}</span>
        </span>
      </span>
      <div class="content" v-html="reply.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reply", "index"],
  name: "cComment",
  data() {
    return {
      hover: {
        active: false,
        timer: 0
      }
    };
  }
};
</script>

<style scoped>
.cell {
  padding: 10px;
  border-top: 1px solid rgb(229, 229, 229);
  transition: all 0.3s;
}

.cell:hover {
  background-color: #f3f3f3;
}

.loginName {
  font-weight: 700;
  margin-right: 0.5em;
}

.favour {
  float: right;
}

.favour img {
  vertical-align: top;
  height: 15px;
  margin-right: 0.25em;
}

.favour .ups {
  font-size: 15px;
}

.detail {
  margin-left: 10px;
  font-size: 12px;
}

.content {
  margin-left: 40px;
}

.avatar {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.separator {
  margin-left: 0.25em;
  margin-right: 0.25em;
}
</style>

