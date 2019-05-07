<template>
  <div>
  <c-header></c-header>
  <c-post-list></c-post-list>
  </div>
</template>

<script>
import cHeader from './components/c-header.vue'
import cPostList from './components/c-post-list.vue'

export default {
  name: 'app',
  components: {
    cHeader,cPostList
  }
}
</script>

<style>
*,*::after,*::before{
  box-sizing: border-box;
}

.clearfix::after{
  display: block;
  content: '';
  clear: both;
}

a{
  color: inherit;
  text-decoration: none;
}

body{
  background: #e4e2e4;
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
