// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 根据问题ID获取回答
 * 
 */
exports.main = async (event, context) => {
  return await db.collection('Answer').where({
    qid: event.qid
  })
  .orderBy('date', 'desc')
  .limit(event.aLimitNum)
  .skip(event.aSkipNum)
  .get()
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
    return {
      msg: '获取回答失败',
      success: false
    }
  })
}