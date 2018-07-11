# eros-android-ryim
安卓融云通信

- 进入Android目录工程目录`/platforms/android/WeexFrameworkWrapper/` 目录下 clone 对应的插件。
```Java
git clone https://github.com/ChenArno/eros-android-ryim.git "vanzRyim"
```
- 打开Android目录工程目录`/platforms/android/WeexFrameworkWrapper/`,编辑settings.gradle,添加引入。 在settings.gradle 中 添加如下代码。

```Java
//这里只需要在最后添加 , ':ryim',':IMKit',':IMLib' 
include ':app',':sdk',':nexus', ':wxframework', ':ryim',':IMKit',':IMLib'  
...
// 融云通信
project(':ryim').projectDir = new File(settingsDir,'/vanzRyim/ryim')
project(':IMKit').projectDir = new File(settingsDir,'/vanzRyim/IMKit')
project(':IMLib').projectDir = new File(settingsDir,'/vanzRyim/IMLib')
```
- 打开Android目录工程目录`/platforms/android/WeexFrameworkWrapper/app`,编辑app目录下build.gradle 文件 dependencies 下添对应 插件引用。

```Java
dependencies {
        ....
        //融云通信
        compile project(':ryim')
    }
```
- 打开Android目录工程目录`/platforms/android/WeexFrameworkWrapper/app/src/main/AndroidManifest.xml`,编辑`AndroidManifest.xml`,插入以下配置

```Java
 <!--融云配置开始-->
        <!--android:authorities：您的应用applicationId-->
        <provider
            android:name="android.support.v4.content.FileProvider"
            android:authorities="${APP_ID}.FileProvider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/rc_file_path" />
        </provider>


        <!--融云会话界面-->
        <activity
            android:name="com.vanz.ryim.ConversationActivity"
            android:screenOrientation="portrait"
            android:theme="@style/AppTheme.NoActionBar"
            android:windowSoftInputMode="stateHidden|adjustResize">

            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />

                <!--android:host要改成应用当前APPLICATION_ID-->
                <data
                    android:host="${APP_ID}"
                    android:pathPrefix="/conversation/"
                    android:scheme="rong" />
            </intent-filter>
        </activity>
        <!--融云配置结束-->
```
引用插件，构造完毕以后，
在gradle.properties中增加该配置
融云appid从官方获取
- [https://developer.rongcloud.cn/app](https://developer.rongcloud.cn/app)
- appid 分测试和正式版本，在上线之后一定要跟测试版本分开来
```Html
RONGYUN_APPID=xxxxxx
```
并在主app文件夹找到App.java
添加
```Java
public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;

        ImApp.getImApp(this);
    }

}
```

在融云官网注册以后，填入userId获取token(改token应当通过后台获取，测试阶段可以从官网获取)
当应用启动后，获取token，通过ryIm方法注册调用
```Js
const ryIm = weex.requireModule('ryIm')
ryIm.init(token,res => {
          console.log('===>连接成功，userId:' + res)
        },
        err => {
          console.log('===>' + err)
        }
      )
```

聊天列表组件，子组件需包含在该组件下
获取当前聊天对象列表

```Js
<vanz-im-view ref="imview">
  ...
  <div @click="enterRoom(item)">111</div>
  ...
</vanz-im-view>

this.$refs.imview.selectList(r => {
  console.log('===>获取数据成功' + JSON.stringify(r))
})
let type = 1; //单聊模式
//userId为注册时的唯一id，name为进入聊天窗口的标题
this.$refs.imview.enterRoom(type, userId, name)
```

删除该聊天记录

```Js
let type = 1; //单聊模式
this.$refs.imview.deleteItem(type,userId,res=>{
  console.log(res)
})
```
监听聊天页面返回动作
此处可执行刷新动作this.$refs.imview.selectList
```Js
    globalEvent.addEventListener('activity.back', options => {
      //do soming
      //监听会话页面返回
    })
```
监听收到消息动作
此处可执行刷新动作this.$refs.imview.selectList
```Js
    globalEvent.addEventListener('ryMsg.received', options => {
      let { sentTime, content, targetId } = options
      this.selectList()
      //do soming
      //监听收到消息
    })
```
监听发送消息动作
```Js
    globalEvent.addEventListener('ryMsg.send', options => {
      let { targetId, content, sentTime } = options
      // this.selectList()
      //do soming
      //监听发送消息
    })
```

### 20180711-新增头像用户更新功能
```Js
 //当前当前登录用户信息刷新
this.$refs.imview.refreshLoginInfo(userId, name, portraitUri)
//聊天用户信息刷新
this.$refs.imview.refreshUserInfo(userId,name,imgUrl)
```

具体例子详见

- [https://github.com/ChenArno/ryim-eros-source.git] (https://github.com/ChenArno/ryim-eros-source.git)