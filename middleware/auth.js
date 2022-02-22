/*
 * @Author: your name
 * @Date: 2022-01-26 09:52:28
 * @LastEditTime: 2022-01-26 17:58:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\validate\tokenValidate.js
 */
const jwt = require('../util/jwt')
const { jwtKey } = require('../config/secretKey ');
module.exports = async(req, res, next) => {
    const resultData = {
            code: null,
            codeMessage: null
        }
        // console.log(req.headers.authorization)
    const token = req.headers.authorization
    if (!token) {
        resultData.error = "token失效"
        return res.end(JSON.stringify(resultData))
    }
    try {
        await jwt.verify(token, jwtKey)
        next()
    } catch (error) {
        resultData.error = "token失效"
        return res.end(JSON.stringify(resultData))
    }
}