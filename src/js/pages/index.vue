<template>
  <div class="cont">
    <div class="button" @click="enter(item)" v-for="item in userInfo">{{item.name}}</div>
  </div>
</template>

<script>
import person from 'Config/person.json'
export default {
  data(){
    return{
      //token通过后台获取,测试可以通过api调式https://developer.rongcloud.cn/apitool/ulIiBYl9S0ex+9ZDW5U=
      userInfo:person.userInfo
    }
  },
  methods:{
    enter(params){
      this.$router.open({name:"hello",params})
    }
  }
}
</script>

<style>
.cont{
  align-items: center;
  justify-content: center;
}
.button{
  width: 300;
  height: 80;
  margin-top: 30;
}
</style>
