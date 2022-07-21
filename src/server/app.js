const Koa = require('koa')

const {resolve} = require('path')

var staticCache = require("koa-static-cache");

const app = new Koa()

const router = require("./router");
router(app);


app.listen(3000, () => {
  console.log('listening 3000')
})

// app.use(server(resolve(__dirname,'../../dist')));
app.use(
  staticCache(resolve(__dirname, "../../dist"), {
    maxAge: 7 * 24 * 60 * 60,
    gzip: true, //开启
    dynamic: true,
  })
);