// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 更新用户个人信息：目前主要用于更新用户名和用户头像
 * 
 * 接受：来自小程序端的新用户信息，并修改相应的数据
 * 返回：操作结果消息
 */
exports.main = async (event, context) => {

  try {
    db.collection('User').where({
      uid: event.uid,
    })
    .update({
      data: {
        nickname: event.nickname,
        avatarUrl: event.avatarUrl
      }
    })
  } catch(err) {
    console.error('更新用户信息失败')
    console.error(err)
    return {
      msg: '更新失败',
      success: false
    }
  }

  return {
    msg: '更新成功',
    success: true
  }
}