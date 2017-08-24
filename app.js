const Koa = require('koa')
const app = new Koa()
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

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

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
