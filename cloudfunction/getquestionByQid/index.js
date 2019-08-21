// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection('Question').where({
    qid: event.qid
  })
  .get()
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
    return {
      msg: '获取问题失败',
      success: false
    }
  })
}