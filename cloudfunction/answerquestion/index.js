// 云函数入口文件
const cloud = require('wx-server-sdk')
const uuid = require('uuid')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 回答问题：在已有的问题下添加回答
 * 
 * 接受：回答内容
 * 返回：回答ID
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
      random_aid = uuid.v1()
      // 向Answer表中插入数据
      db.collection('Answer').add({
        data: {
          aid: random_aid,
          uid: event.uid,
          content: event.content,
          like: 0,
          location: event.location,
          imageUrl: event.imageUrl,
          date: new Date()
        }
      })
      // 向Q2A中间表插入数据
      db.collection('Q2A').add({
        data: {
          qid: event.qid,
          aid: random_aid,
          uid: event.uid,
          hostuid: event.hostuid,
          date: new Date()
        }
      })
    } catch (err) {
      console.error('新建回答出错')
      console.error(err)
      return {
        msg: '新建回答失败',
        success: false
      }
    }
    return {
      qid: random_aid,
      msg: '新建回答成功',
      success: true
    }
  }
}