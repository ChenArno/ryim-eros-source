<template>
  <div class="cont">
    <div class="button" @click="enter(1)">用户1</div>
    <div class="button">用户2</div>
  </div>
</template>

<script>
export default {
  methods:{
    enter(val){
      this.$router.open({name:"hello"})
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
