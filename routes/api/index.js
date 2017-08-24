var router = require('koa-router')();
var activity_router = require('./activity_router');
router.use('/activity', activity_router.routes(), activity_router.allowedMethods());
module.exports = router;