let url = 'https://cnodejs.org/api/v1'

let api  = {
    topics: '/topics',
    topic: '/topic/',
}

for (const key in api) {
    if (api.hasOwnProperty(key)) {
        const nextPath = api[key];
        api[key] = url+nextPath
    }
}

api.apiPath = url

export default api