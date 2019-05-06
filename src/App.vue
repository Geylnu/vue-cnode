<template>
  <div>
  <c-header></c-header>
  </div>
</template>

<script>
import cHeader from './components/c-header.vue'

export default {
  name: 'app',
  components: {
    cHeader
  }
}
</script>

<style>
.clearfix::after{
  display: block;
  content: '';
  clear: both;
}

a{
  color: inherit;
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
