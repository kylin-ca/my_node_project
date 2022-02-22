/*
 * @Author: your name
 * @Date: 2022-01-25 09:50:50
 * @LastEditTime: 2022-01-25 16:38:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\routes\index.js
 */
var express = require('express');

var router = express.Router();
router.use('/users', require('./users'))
module.exports = router;