/*
 * @Author: kylin
 * @Date: 2022-01-25 14:11:42
 * @LastEditTime: 2022-01-26 16:59:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\controller\user\register_controller.js
 */
/**
 *
 *
 * @param {*} data
 * @param {*} success
 */
// let _ = require('lodash')
let DBHelp = require('../../config/DBHelp.js');
let getUserInfo = (data, callback) => {
    const { userName } = data
    const resultData = {
            code: null,
            data: null,
            codeMessage: null
        }
        // 这里写sql 语句
    let SQL = `SELECT * FROM user_info WHERE userName="${userName}"`
        /**
         * resultData
         * @code: 状态码
         * @data：data
         * @codeMessage: 状态消息
         */
    DBHelp(SQL, (error, result, fields) => {
        if (error) {
            resultData.code = 500;
            resultData.error = "error.message"
            callback(resultData);
        } else {
            resultData.code = 200;
            resultData.codeMessage = 'success'
            const { userName, phone, email, height, weight } = result[0]
            resultData.data = {
                userName: userName || "",
                phone: phone || "",
                email: email || "",
                height: height || "",
                weight: weight || ""
            }
            callback(resultData);
        }
    })
}
module.exports = getUserInfo