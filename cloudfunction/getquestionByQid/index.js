// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  // 用户校验
  const res = await cloud.callFunction({
    name: 'auth',
    data: {
      uid: event.uid
    }
  })

  // 业务逻辑
  if (!res) {
    return {
      msg: '用户校验失败',
      success: false
    }
  } else {
    try {
      return await db.collection('Question').where({
        qid: event.qid
      }).get()
    } catch(err) {
      console.error('根据qid获取问题失败')
      console.error(err)
      return {
        msg: '获取问题失败',
        success: false
      }
    }
  }
}