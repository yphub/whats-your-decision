const Router = require('koa-router');
const router = new Router();

module.exports = router;

router.get('/index',async(ctx,next)=>{
    await next();
    ctx.response.body = "hello world!";
})