/*
 * @Author: your name
 * @Date: 2022-01-25 09:58:11
 * @LastEditTime: 2022-02-17 15:15:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\config\dbConfig.js
 */
// database.js
// 连接Mysql

const config = {
    // 启动端口
    port: 3000,
    // 数据库配置
    database: {
        DATABASE: 'user',
        USERNAME: 'root',
        // PASSWORD: '123456',
        PASSWORD: '102520',
        PORT: '7056',
        HOST: 'localhost',
        insecureAuth: true,
        useConnectionPooling: true
    }
}

module.exports = config