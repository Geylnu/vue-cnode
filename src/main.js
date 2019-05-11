import Vue from 'vue'
import App from './App.vue'

import 'normalize.css'
import 'github-markdown-css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

/**
 * 严谨版本应该是现在的和之前的相减
 * */
Vue.filter('formatDate', function (dataStr) {
  let time = new Date().getTime() - new Date(dataStr).getTime()
  time = new Date(time)
  let str = ''
  if (time.getUTCFullYear() !== 1970) {
    str = `${time.getUTCFullYear() - 1970}年前`
  } else if (time.getUTCMonth() !== 0) {
    str = `${time.getUTCMonth()}月前`
  } else if (time.getUTCDate() !== 1) {
    str = `${time.getUTCDate()-1}天前`
  } else if (time.getUTCHours() !== 0) {
    str = `${time.getUTCHours()}小时前`
  }else if (time.getUTCMinutes() !==0){
    str = `${time.getUTCMinutes()}分钟前`
  }else if (time.getUTCSeconds() >= 30){
    str = `${time.getUTCSeconds()}秒前`
  }else{
    str = `刚刚`
  }
  return str
})

Vue.filter('tagParse',function (topic,spe =true) {
    let str = ''
    if (topic.top && spe){
      str = '置顶'
    }else if (topic.good && spe){
      str = '精品'
    }else if (topic.tab === 'share'){
      str = '分享'
    }else if (topic.tab === 'ask'){
      str = '问答'
    }else if (topic.tab === 'job'){
      str = '招聘'
    }
    return str
  })
  
  new Vue({
    render: h => h(App),
  }).$mount('#app')
