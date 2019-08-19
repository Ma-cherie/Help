// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
/**
 * 用户校验，校验成功返回true，反之返回false
 */
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID

  if (event.uid == openid) {
    return true
  } else {
    return false
  }
}