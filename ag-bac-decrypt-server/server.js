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
    const authUrl = 'http://gci.ig258.com:81/forwardGame.do?params=BfUOR2ITCv/M7XuVWKRFoAUC7dC4hoSVoGvkcu3eVahOhDZACGgvXL9ReD6Zw8h/VsHyi923drCIbyZNpg50TItiLfSGnarM7MOo/TWTyvUo33+IO9H7t2sW2+HGAKbWzSGWFIa70wHdDHTKVwXUCa5e4MII9vJWZkQ6L5kVtXXJ056/YB6TYM8iV0RwlvpmkOmxz44Bpw5YcZOPGk/hvAkq0RuK2QkyS0kkyf4577M=&key=308104dd67c446568e156e411c74b238';
    ctx.body = JSON.stringify(await authLogin(authUrl));
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