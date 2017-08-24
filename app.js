const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')();
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

//koa-session2 保证session存储在redis里
const session = require("koa-session2");
const Store = require("./model/Store");

const index = require('./routes/index')
const users = require('./routes/users')
const activity = require('./routes/api')

//api 返回json
const response_formatter = require('./middlewares/response_formatter');

//api
const api = require('./routes/api');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
//view
/*app.use(views(__dirname + '/views', {
  extension: 'pug'
}));*/
app.use(views(__dirname + '/views-ejs', {
    extension: 'ejs'
}));
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//添加格式化处理响应结果的中间件，在添加路由之前调用
//仅对/api开头的url进行格式化处理
app.use(response_formatter('^/api'));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(activity.routes(), activity.allowedMethods())

//apis
router.use("/api",api.routes(), api.allowedMethods())
app.use(router.routes(), router.allowedMethods())

//session保存在redis
app.use(session({
    key: "SESSIONID",   //default "koa:sess"
    store: new Store()
}));

/*
session用法
app.use(ctx => {
    let user = ctx.session.user;
    ctx.session.view = "index";
});*/

// response
app.on('error', function(err, ctx){
    console.log(err)
    logger.error('server error', err, ctx);
});
module.exports = app
