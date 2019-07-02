# cnode
使用vue构建的cnode官网

## 支持的功能
* - [ ] 全局顶部加载进度条显示
* - [ ] 标签页title显示话题title
* - [x] 返回顶部
* - [x] 移动端兼容
    * - [x] 导航栏兼容
    * - [x] 话题显示兼容
* - [x] 首页多话题加载
    * - [x] 滚动加载话题
    * - [ ] ~~显示最近回复的人~~ topics接口不提供，topic接口提供但会发起大量请求
* - [x] 话题详情显示
    * - [x] 评论显示
    * - [ ] 评论显示回复人
* - [x] 用户个人主页
    * - [x] 最近回复（api限制，只能获取5个最新回复）
    * - [x] 最近创建的主题
    * - [ ] 收藏的主题
* - [x] 登录功能
    * - [x] 收藏功能
    * - [ ] ~~点赞功能~~ 相关接口下线

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
