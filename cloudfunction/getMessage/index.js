// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 获取最新回答消息
 */
exports.main = async (event, context) => {
  // 用户校验
  const res = await cloud.callFunction({
    name: 'auth',
    data: {
      uid: event.uid
    }
  })

  if (!res) {
    return {
      msg: '用户校验失败',
      success: false
    }
  } else {
    try {
      // 获取回答了自己提出的问题的人
      const userIDList = await db.collection('Q2A').where({
        hostuid: event.uid
      })

      // 获取回答者的头像昵称等信息
      var userInfoList = []
      for (var i=0; i<userIDList.length; i++) {
        userIDList.push(await db.collection('User').where({
          uid: userIDList[i].uid
        }).get())
      }

      return {
        msg: '获取消息成功',
        success: true,
        userInfoList: userInfoList
      }
    } catch(err) {
      console.error('获取消息出错')
      console.error(err)
      return {
        msg: '获取消息失败',
        success: false
      }
    }
  }
}