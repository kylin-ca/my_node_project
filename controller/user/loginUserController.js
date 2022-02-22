/*
 * @Author: your name
 * @Date: 2022-01-25 10:25:16
 * @LastEditTime: 2022-02-09 14:34:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\controller\user\loginUser_controller.js
 */
const { Console } = require('console');
const jwt = require('../../util/jwt')
const md5 = require('md5-node')
    /**
     *
     *
     * @param {*} data
     * @param {*} success
     */
let _ = require('lodash')
let DBHelp = require('../../config/DBHelp.js');
const { passWordKey, jwtKey } = require('../../config/secretKey .js');
let userLogin = (data, callback) => {
    const { userName, password } = data
    // 这里写sql 语句
    let SQL = `SELECT * FROM USER WHERE userName="${userName}"`
        /**
         * resultData
         * @code: 状态码
         * @data：data
         * @codeMessage: 状态消息
         */
    const resultData = {
        code: null,
        data: null
    }
    DBHelp(SQL, async(error, result, fields) => {
        if (error) {
            resultData.code = 500;
            resultData.error = error.message
        } else {
            if (result.length === 0) {
                resultData.code = 500;
                resultData.error = "用户名错误"
            } else {
                let checkPassword = result[0].password === password
                if (!checkPassword) {
                    resultData.code = 500;
                    resultData.error = "密码错误"
                } else {
                    resultData.code = 200;
                    resultData.error = "登录成功"
                    resultData.token = await jwt.sign({ userName, }, jwtKey, { expiresIn: '1day' })
                }
            }
        }
        callback(resultData)
    })
}
module.exports = userLogin