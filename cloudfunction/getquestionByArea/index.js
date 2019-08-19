// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 根据地区获取问题：按时间最新排序，支持分页
 */
exports.main = async (event, context) => {
  // 用户校验
  const res = await cloud.callFunction({
    name: 'auth',
    data: {
      uid: event.uid
    }
  })
  // 业务逻辑
  if (res) {
    try {
      return await db.collection('Question').where({
        location: event.location
      })
      .orderBy('date','desc')
      .limit(event.qLimitNum)
      .skip(event.qSkipNum)
      .get()
    } catch(err) {
      console.error('根据地区获取问题失败')
      console.error(err)
      return {
        msg: '获取失败',
        success: false
      }
    }
  } else {
    return {
      msg: '用户校验失败',
      success: false
    }
  }
}