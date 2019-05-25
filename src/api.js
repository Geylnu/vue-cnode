let baseUrl = 'https://cnodejs.org/api/v1'

let api  = {
    topics: '/topics',
    topic: '/topic/',
    userInfo: '/user/',
    login: '/accesstoken',
    collected: '/topic_collect/',
    collectTopic: '/topic_collect/collect',
    cancelCollect: '/topic_collect/de_collect'
}

for (const key in api) {
    if (api.hasOwnProperty(key)) {
        const nextPath = api[key];
        api[key] = baseUrl+nextPath
    }
}

api.baseUrl = baseUrl

export default api