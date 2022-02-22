/*
 * @Author: your name
 * @Date: 2022-01-25 09:50:56
 * @LastEditTime: 2022-02-09 11:19:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\routes\user.js
 */
var express = require('express');

var router = express.Router();

const userRegister = require('../controller/user/registerController.js')
const userLogin = require('../controller/user/loginUserController.js')
const getUserInfo = require('../controller/user/userInfoController.js')
const auth = require('../middleware/auth')

/* 
  用户注册
*/
router.post('/register', (req, res, next) => {
    userRegister(req.body, data => {
        res.end(JSON.stringify(data))
    })
})


/* 
  用户登录
*/
router.post('/login', async(req, res, next) => {
    userLogin(req.body, data => {
        res.end(JSON.stringify(data))
    })
})

/* 
  获取用户信息
*/
router.post('/userInfo', auth, async(req, res, next) => {
    getUserInfo(req.body, data => {
        res.end(JSON.stringify(data))
    })
})

module.exports = router;