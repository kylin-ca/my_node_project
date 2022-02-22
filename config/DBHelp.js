/*
 * @Author: yihaosun
 * @Date: 2022-01-17 10:45:52
 * @LastEditTime: 2022-02-17 15:48:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \demoExpress\config\DBHelp.js
 */
let DB_MYSQL = require('mysql');
let DB_CONFIG = require('../config/dbConfig');

/**
 * 数据库连接池
 * @type {Pool}
 * 
 */
let pool = DB_MYSQL.createPool({
    host: DB_CONFIG.database.HOST,
    user: DB_CONFIG.database.USERNAME,
    password: DB_CONFIG.database.PASSWORD,
    database: DB_CONFIG.database.DATABASE,
    port: DB_CONFIG.database.PORT
});

/**
 * 通用方法
 * @param sql
 * @param options
 * @param callback
 */
let query = (sql, options, callback) => {
    pool.getConnection((error, connection) => {
        if (error) {
            callback(error, null, null)
        } else {
            let sqlArray = sql.split(";")
            sqlArray.forEach(item => {
                    connection.query(item, options, (error, results, fields) => {
                        //事件驱动回调
                        callback(error, results, fields)
                    })
                })
                //释放连接
            connection.release()
        }
    });
};
module.exports = query