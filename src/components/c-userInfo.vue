<template>
  <div></div>
</template>

<script>
export default {
  name: "cUserinfo",
  data() {
    return {
      info: []
    };
  },
  methods: {
    async getData() {
      let { loginName } = this.$route.params;
      let {
        data: { data, success }
      } = await this.$http.get();
     if (success){
         this.info = data
     }
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<style scoped>
</style>

