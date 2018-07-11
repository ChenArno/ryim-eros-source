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
        <text>{{personLists.filter(x=>{return x.userId ==item.userId})[0].name}}</text>
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
import { showLongTime } from 'Utils'
export default {
  data() {
    return {
      imLists: [],
      lastMsg: [],
      personLists: []
    }
  },
  eros: {
    // 页面周期相关 start
    beforeAppear(params, options) {
      this.personLists = person.userInfo
      this.imLists = person.userInfo.filter(v => {
        return v.userId !== params.userId
      })
      this.init(params)
    }
  },
  mounted() {
    globalEvent.addEventListener('activity.back', options => {
      //do soming
      //监听会话页面返回
      this.selectList()
    })
    globalEvent.addEventListener('ryMsg.received', options => {
      let { sentTime, content, targetId } = options
      this.selectList()
      //do soming
      //监听收到消息
    })
    globalEvent.addEventListener('ryMsg.send', options => {
      let { targetId, content, sentTime } = options
      // this.selectList()
      //do soming
      //监听发送消息
    })
  },
  methods: {
    init(params) {
      let { token, userId, name, portraitUri } = params
      ryIm.init(
        token,
        res => {
          // console.log('===>连接成功，userId:' + res)
          //当前当前登录用户信息刷新
          this.$refs.imview.refreshLoginInfo(userId, name, portraitUri)
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
        //用户名和头像需要自己通过targetId在缓存中寻找
        this.lastMsg = r.map(v => {
          let [one] = this.personLists.filter(x => {
            return x.userId == v.userId
          })
          if (one) {
            v.name = one.name
            v.portraitUri = one.portraitUri
          }
          v.lastTime = showLongTime(parseInt(v.lastTime))
          return v
        })
      })
    },
    enterRoom({ userId, name, portraitUri }) {
      // 聊天类型
      // NONE(0, "none"),
      // PRIVATE(1, "private"),//单聊
      // DISCUSSION(2, "discussion"),//讨论组
      // GROUP(3, "group"),//群组
      // CHATROOM(4, "chatroom"), //聊天室
      // CUSTOMER_SERVICE(5, "customer_service"),//客服
      // SYSTEM(6, "system"),//系统
      // 暂时支持单聊，其他未测试
      this.$refs.imview.enterRoom('1', userId, name)
      this.$refs.imview.refreshUserInfo(userId, name, portraitUri)
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