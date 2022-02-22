/*
 * @Author: kylin
 * @Date: 2022-01-25 14:11:42
 * @LastEditTime: 2022-02-09 14:35:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\controller\user\register_controller.js
 */
const md5 = require('md5-node')
    /**
     *
     *
     * @param {*} data
     * @param {*} success
     */
    // let _ = require('lodash')
let DBHelp = require('../../config/DBHelp.js');
const { passWordKey } = require('../../config/secretKey .js');
let userRegister = (data, callback) => {
    const { userName, password } = data
    const resultData = {
            code: null,
            data: null,
        }
        // 这里写sql 语句
    let SQL = `SELECT * FROM user WHERE userName="${userName}"`
        /**
         * resultData
         * @code: 状态码
         * @data：data
         */
    DBHelp(SQL, (error, result, fields) => {
        if (error) {
            resultData.code = 500;
            resultData.error = error.message
            callback(resultData);
        } else {
            if (result.length > 0) {
                resultData.code = 500;
                resultData.error = '该用户名已存在'
                callback(resultData);
            } else {
                SQL = `INSERT INTO user(userName,password) values("${userName}","${md5(passWordKey+password)}"); INSERT INTO user_info(userName) values("${userName}")`
                const resultData = {
                    code: null,
                    data: null,
                }
                DBHelp(SQL, (error, result, fields) => {
                    if (error) {
                        resultData.code = 500;
                        resultData.error = error.message
                        callback(resultData);
                    } else {
                        resultData.code = 200;
                        callback(resultData);
                    }
                })
            }

        }
    })
}
module.exports = userRegister