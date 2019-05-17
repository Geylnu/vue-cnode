<template>
    <div class="slidebar">
        <div class="container">
            <div class="panel">
                <header>个人信息</header>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'cslidebar',
    data(){
        return {
            info:{}
        }
    },
    methods:{
        async getData(){
            
        }
    },
    watch:{
        '$route': function(){
            
        }
    }
}
</script>

<style scoped>
.slidebar{
    float: right;
    margin-left: 15px;
}

.container{
    width: 290px;
}
</style>
