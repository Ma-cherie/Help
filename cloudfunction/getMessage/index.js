// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 获取最新回答消息
 */
exports.main = async (event, context) => {

  // 获取回答了自己提出的问题的人
  const userIDList = await db.collection('Q2A').where({
    hostuid: event.uid
  }).get()

  // 获取回答者的头像昵称等信息
  var userInfoList = []
  for (var i = 0; i < userIDList.length; i++) {
    await db.collection('User').where({
      uid: userIDList[i].uid
    })
      .get()
      .then(res => {
        userInfoList.push(res)
      })
  }

  return {
    msg: '获取消息成功',
    success: true,
    userInfoList: userInfoList
  }
}