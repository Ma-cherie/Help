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
    await db.collection('Answer').where({
      aid: answerIDList[i].aid
    })
      .get()
      .then(res => {
        answerList.push(res)
      })
  }

  return {
    msg: '获取回答成功',
    success: true,
    answerList: answerList
  }
}