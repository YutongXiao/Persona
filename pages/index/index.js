//index.js
var Bmob = require('../../utils/Bmob-2.2.5.min.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '进入',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../introduction/intro/intro'
    })
    const query = Bmob.Query('diary')
    query.set("name", "Bmob")
    query.set("cover", "后端云")
    query.save().then(res => {
      console.log(res)
      console.log('123')
    }).catch(err => {
      console.log(err)
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  //读取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //点击进入按钮转到简介页面
  enter: function(){
    wx.redirectTo({
      url: '../introduction/intro/intro'
    })
  },

  //点击按钮播放音乐
 playmusic:function(){
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  innerAudioContext.src = '/data/气泡.mp3'
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
},

})
