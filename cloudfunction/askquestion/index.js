// 云函数入口文件
const cloud = require('wx-server-sdk')
const uuid = require('uuid')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 提出问题：基于位置信息，在某个地区提出问题
 * 
 * 接受：问题信息
 * 返回：问题ID
 */
exports.main = async (event, context) => {
  const uid = cloud.getWXContext().OPENID
  if (event.uid == undefined || event.uid != uid) {
    return {
      msg: '用户验证失败',
      success: false,
    }
  } else {
    try {
      random_qid = uuid.v1()
      db.collection('Question').add({
        data: {
          qid: random_qid,
          title: event.title,
          content: event.content,
          location: event.location,
          imageUrl: event.imageUrl,
          disable: 0,
          tag: event.tag,
          date: new Date()
        }
      })
    } catch (err) {
      console.error('新建问题出错')
      console.error(err)
      return {
        msg: '新建问题失败',
        success: false
      }
    }
    return {
      qid: random_qid,
      msg: '新建问题成功',
      success: true
    }
  }
}