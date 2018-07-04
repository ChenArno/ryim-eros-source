<template>
	<div class="container">
		<bui-swipe-cell :items="lists" :title="item.title" v-for="item in imLists"></bui-swipe-cell>
	</div>
</template>
<script>
import { buiSwipeCell } from 'bui-weex'
const ryIm = weex.requireModule('ryIm')
export default {
  data() {
    return {
			imLists:[{
				id:1,
				title:"张三",
				token:"2222"
			},{
				id:2,
				title:"李四",
				token:'ssss'
			}],
      lists: [
        {
          title: '删除',
          bgcolor: '#fa3300'
        }
      ]
    }
  },
  components: {
    buiSwipeCell
	},
	mounted(){
		ryIm.init("sss",res=>{
			console.log(res);
		});
	}
}
</script>
<style scoped>
.container {
	width: 750;
	margin-top: 60;
}
.title {
  font-size: 100px;
}
.desc {
  font-size: 30px;
}
</style>