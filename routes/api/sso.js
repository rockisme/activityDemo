const router = require('koa-router')()
//错误
const ApiError = require('../../error/ApiError');
const ApiErrorNames = require('../../error/ApiErrorNames');

//发送手机验证码
router.get('/sendCode', function (ctx, next) {
    const mobile = ctx.params.mobile;
    ctx.body = {
        id:id
    }
})
module.exports = router