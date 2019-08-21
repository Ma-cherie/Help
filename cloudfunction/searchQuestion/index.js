// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 根据地区，关键字搜索问题
 */
exports.main = async (event, context) => {

  return await db.collection('Question').where({
    location: event.location,
    title: db.RegExp({
      regexp: event.title,
      options: 'i'
    })
  })
  .orderBy('date', 'desc')
  .limit(event.qLimitNum)
  .skip(event.qSkipNum)
  .get()
  .then(res => {
    return res
  })
  .catch(err => {
    console.error(err)
    return {
      msg: '获取失败',
      success: false
    }
  })
}