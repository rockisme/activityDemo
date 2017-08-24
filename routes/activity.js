const router = require('koa-router')()
router.prefix('/ticket')

router.get('/:id/index', function (ctx, next) {
    const id = ctx.params.id;
    console.log("===================")
    console.log(id)
    console.log("===================")
    ctx.body = 'this is a test :id='+id
})
module.exports = router
