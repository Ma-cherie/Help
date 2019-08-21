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
  return await db.collection('Q2A').where({
    hostuid: event.uid
  })
  .orderBy('date', 'desc')
  .get()
  .then(res => {
    console.log(event.uid)
    console.log(res)
    return res
  })
}