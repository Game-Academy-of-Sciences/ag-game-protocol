const Koa = require('koa');
const Router = require('koa-better-router')
const serve = require('koa-better-static');
const convert = require('koa-convert')
const authLogin = require('./client/utils/login');
const koaBetterBody = require('koa-better-body');

const { analysis } = require('./client/utils/ag/analysis');



const app = new Koa();

let router = Router().loadMethods();

router.get('/authLogin', async(ctx) => {
    // 试玩
    ctx.body = JSON.stringify(await authLogin(undefined));
    ctx.type = 'application/json';
    ctx.status = 200;
});


router.post('/analysis', async(ctx) => {
    var buffer = Buffer.from(ctx.request.body.buffer, 'base64');
    var result = analysis(buffer);

    ctx.body = JSON.stringify(result);
    ctx.type = 'application/json';
    ctx.status = 200;
});



app.use(convert(serve('./client/dist', {
    index: 'index.html'
})));
app.use(convert(koaBetterBody({
    fields: 'body',
    files: true,
    multipart: true,
    jsonStrict: false,
    strict: false,
    buffer: true
})));

app.use(router.middleware());



app.listen(5000, () => {
    console.log('======> server run port: ' + 5000)
});