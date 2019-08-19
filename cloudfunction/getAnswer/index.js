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
  // 用户校验
  const res = await cloud.callFunction({
    name: 'auth',
    data: {
      uid: event.uid
    }
  })

  // 业务逻辑
  if (!res) {
    return {
      msg: '用户校验失败',
      success: false
    }
  } else {
    try {
      // 获取回答ID列表
      const answerIDList = await db.collection('Q2A').where({
        qid: event.qid
      })
        .orderBy('date', 'desc')
        .limit(event.aLimitNum)
        .skip(event.aSkipNum)
        .get()

      // 获取回答具体内容
      var answerList = []
      for (var i = 0; i < answerIDList.length; i++) {
        answerList.push(await db.collection('Answer').where({
          aid: answerIDList[i].aid
        }).get())
      }

      return {
        msg: '获取回答成功',
        success: true,
        answerList: answerList
      }
    } catch(err) {
      console.error('获取回答出错')
      console.error(err)
      return {
        msg: '获取回答失败',
        success: false
      }
    }
  }
}