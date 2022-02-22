/*
 * @Author: your name
 * @Date: 2022-01-26 16:38:51
 * @LastEditTime: 2022-01-26 16:42:28
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\util\jwt.js
 */
const jwt = require('jsonwebtoken');
const { promisify } = require('util')
exports.sign = promisify(jwt.sign)
exports.verify = promisify(jwt.verify)