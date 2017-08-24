const router = require('koa-router')()
//错误
const ApiError = require('../../error/ApiError');
const ApiErrorNames = require('../../error/ApiErrorNames');

router.get('/:id/index', function (ctx, next) {
    const id = ctx.params.id;
    ctx.body = {
        id:id
    }
})
module.exports = router