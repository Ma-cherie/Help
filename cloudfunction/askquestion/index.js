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
  random_qid = uuid.v1()
  return await db.collection('Question').add({
    data: {
      qid: random_qid,
      uid: event.uid,
      title: event.title,
      content: event.content,
      location: event.location,
      imageUrl: event.imageUrl,
      disable: 0,
      tag: event.tag,
      date: new Date()
    }
  })
  .then(res => {
    return {
      msg: '提问成功',
      qid: random_qid
    }
  })
  .catch(err => {
    console.error(err)
    return err
  })
  
}