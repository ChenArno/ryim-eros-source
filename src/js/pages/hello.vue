<template>
	<div>
		<vanz-im-view ref="imview" class="container">
			<text>好友列表</text>
			<div class="swiper" v-for="item in imLists" @click="enterRoom(item)">
				<!-- <text>{{item.name}}</text> -->
				<image class="swiper-img" :src="item.portraitUri"></image>
				<text>{{item.name}}</text>
			</div>
			<text>会话列表</text>
			<div class="swiper" v-for="item in lastMsg" @click="enterRoom(item)">
				<!-- <text>{{item.name}}</text> -->
				<image class="swiper-img" :src="item.portraitUri"></image>
				<div class="swiper-right">
					<text>{{item.content}}</text>
					<text>{{item.lastTime}}</text>
				</div>
			</div>
		</vanz-im-view>
	</div>
</template>
<script>
const ryIm = weex.requireModule('ryIm')
import person from 'Config/person.json'
const globalEvent = weex.requireModule('globalEvent')
export default {
  data() {
    return {
      imLists: [],
      lastMsg: []
    }
  },
  eros: {
    // 页面周期相关 start
    beforeAppear(params, options) {
      this.imLists = person.userInfo.filter(v => {
        return v.userId !== params.userId
      })
      this.init(params.token)
    },
    disappeared() {
      // ryIm.logout()
    }
  },
  mounted() {
    globalEvent.addEventListener('activity.back', options => {
      //do soming
      //监听会话页面返回
    })
    globalEvent.addEventListener('ryMsg.received', options => {
      let { sentTime, content, targetId } = options
      this.selectList()
      //do soming
      //监听收到消息
    })
    globalEvent.addEventListener('ryMsg.send', options => {
      let { targetId, content, sentTime } = options
      this.selectList()
      //do soming
      //监听发送消息
    })
  },
  methods: {
    init(token) {
      ryIm.init(
        token,
        res => {
          console.log('===>连接成功，userId:' + res)
          this.selectList()
        },
        err => {
          console.log('===>' + err)
        }
      )
    },
    selectList() {
      this.$refs.imview.selectList(r => {
        if (!r || r.length == 0) return
        this.lastMsg = r
        console.log('===>获取数据成功' + JSON.stringify(r))
      })
    },
    enterRoom({ userId, name }) {
      // 聊天类型
      // NONE(0, "none"),
      // PRIVATE(1, "private"),//单聊
      // DISCUSSION(2, "discussion"),
      // GROUP(3, "group"),
      // CHATROOM(4, "chatroom"), //聊天室
      // CUSTOMER_SERVICE(5, "customer_service"),
      // SYSTEM(6, "system"),
      // APP_PUBLIC_SERVICE(7, "app_public_service"),
      // PUBLIC_SERVICE(8, "public_service"),
      // PUSH_SERVICE(9, "push_service");
      this.$refs.imview.enterRoom(1, userId, name)
    }
  }
}
</script>
<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 750;
  background-color: transparent;
}
.swiper {
  width: 750;
  padding: 0 20;
  align-items: center;
  justify-content: space-between;
  height: 140;
  flex-direction: row;
  background-color: #ffffff;
}
.swiper-img {
  width: 120;
  height: 120;
  border-radius: 60;
}
.swiper-right {
  height: 140;
  align-items: flex-end;
  justify-content: center;
}
.title {
  font-size: 100px;
}
.desc {
  font-size: 30px;
}
</style>