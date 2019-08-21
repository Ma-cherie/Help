// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
/**
 * 快问快答注册：通过微信官方接口获取用户openid，
 * openid作为user表中的uid，建立用户数据，同时返回openid给用户，
 * 作为登陆凭证和发问回答的凭证
 */
exports.main = async (event, context) => {
  const userinfo = cloud.getWXContext()
  
  try {
    return await {
      uid: userinfo.OPENID,
      res: db.collection('User').add({
        data: {
          uid: userinfo.OPENID,
          nickname: '热心网友',
          avatarUrl: 'https://7465-test-s7zk5-1256658526.tcb.qcloud.la/my-image.jpg?sign=ad5e3b087656623c19bef3641f2892a6&t=1566138956',
          questions: [],
          answers: [],
          score: 0,
          registDate: new Date(),
        }
      })
    }
  } catch (err) {
    console.error('创建新用户信息出错')
    console.error(err)
  }

  // return {
  //   uid: userinfo.OPENID
  // }
}