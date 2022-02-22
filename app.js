/*
 * @Author: your name
 * @Date: 2022-01-25 09:45:23
 * @LastEditTime: 2022-02-09 11:19:44
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \my_node_project\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //方便操作客户端中的cookie值。
var morgan = require('morgan'); //打印日志
const logger = require('./logger')

// var indexRouter = require('./routes/index');
var router = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json()); //处理传过来的json数据
app.use(express.urlencoded({ extended: false })); //通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //设置静态文件目录：
// //注册路由
// app.use('/', indexRouter);
app.all('*', function(req, res, next) {
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    next();
})
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//处理非404的错误(throw出来的错误)
const _errorHandler = (err, req, res, next) => {
    logger.error(`${req.method} ${req.originalUrl}` + err.message)
    const errMsg = err.message
    res.status(err.status || 500).json({
        code: -1,
        success: false,
        message: errMsg,
        data: {}
    })
}
app.use(_errorHandler)

module.exports = app;