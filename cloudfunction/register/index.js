// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();

// 云函数入口函数
/**
 * 快问快答注册：通过微信官方接口获取用户openid，
 * openid作为user表中的uid，建立用户数据，同时返回openid给用户，
 * 作为登陆凭证和发问回答的凭证
 */
exports.main = async (event, context) => {
  const userinfo = cloud.getWXContext();

  return await db.collection('User').add({
    data: {
      uid: userinfo.OPENID,
      nickname: '热心网友',
      avatarUrl: 'https://7465-test-38zv4-1300060502.tcb.qcloud.la/user2.svg?sign=f4ac124e9b525fa241419011e10fd081&t=1566381292',
      questions: [],
      answers: [],
      score: 0,
      registDate: new Date(),
    }
  })
    .then(res => {
      return {
        uid: userinfo.OPENID
      }
    })
    .catch(err => {
      console.error('用户表中已经存在用户信息')
      return {
        uid: userinfo.OPENID
      }
    });
}