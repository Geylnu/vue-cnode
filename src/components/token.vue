<script>
export default {
  data() {
    return {
      accesstoken: ""
    };
  },
  methods: {
    saveToken() {
      sessionStorage.setItem("accesstoken", this.accesstoken);
    },
    clearToken() {
      this.accesstoken = ''
      sessionStorage.removeItem("accesstoken");
    }
  },
  created() {
    let token = sessionStorage.getItem("accesstoken");
    if (token !== null) {
      this.accesstoken = token;
    }
  }
};
</script>