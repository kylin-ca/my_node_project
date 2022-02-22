/*
 * @Author: your name
 * @Date: 2022-01-26 09:52:28
 * @LastEditTime: 2022-01-26 16:30:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\validate\tokenValidate.js
 */
const jwt = require('jsonwebtoken');
exports.tokenValidate = (req, res, error) => {
    console.log(req.headers.authorization)
        // jwt.verify(token, 'shhhhh', function(err, decoded) {
        //     console.log(decoded.foo) // bar
        //   });
}