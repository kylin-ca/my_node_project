/*
 * @Author: your name
 * @Date: 2022-01-26 14:42:58
 * @LastEditTime: 2022-01-26 16:24:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\config\example.js
 */
/* Copyright (c) 2018, 2021, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   example.js
 *
 * DESCRIPTION
 *   A basic node-oracledb example using Node.js 8's async/await syntax.
 *
 *   For connection pool examples see connectionpool.js and webapp.js
 *   For a ResultSet example see resultset1.js
 *   For a query stream example see selectstream.js
 *
 *   This example requires node-oracledb 5 or later.
 *
 *****************************************************************************/

// Using a fixed Oracle time zone helps avoid machine and deployment differences
process.env.ORA_SDTZ = 'UTC';

const fs = require('fs');
const oracledb = require('oracledb');
// const dbConfig = require('./dbconfig.js');

// On Windows and macOS, you can specify the directory containing the Oracle
// Client Libraries at runtime, or before Node.js starts.  On other platforms
// the system library search path must always be set before Node.js is started.
// See the node-oracledb installation documentation.
// If the search path is not correct, you will get a DPI-1047 error.
let libPath;
libPath = 'D:\\oracle\\instantclient_19_13';
// if (process.platform === 'win64') { // Windows
//     libPath = 'D:\\oracle\\instantclient_19_13';
// } else if (process.platform === 'darwin') { // macOS
//     libPath = process.env.HOME + '/Downloads/instantclient_19_8';
// }
if (libPath && fs.existsSync(libPath)) {
    oracledb.initOracleClient({ libDir: libPath });
}
async function run() {
    let connection;
    try {

        connection = await oracledb.getConnection({
            user: "sunars",
            password: "sunars",
            connectString: "172.1.3.234:1521/ars600pdb"
        });

        console.log('连接成功')
        sql = `SELECT *
        FROM MD_MODEL_INFO_TB
        WHERE MODEL_ID='20211104172658684696'`;
        binds = {};
        // For a complete list of options see the documentation.
        options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT, // query result format
            // extendedMetaData: true,               // get extra metadata
            // prefetchRows:     100,                // internal buffer allocation size for tuning
            // fetchArraySize:   100                 // internal buffer allocation size for tuning
        };
        result = await connection.execute(sql, binds, options);
        console.log(result);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
run();