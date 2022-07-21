const Router = require('@koa/router')

const router = new Router()

const { resolve } = require("path");
const { renderToPipeableStream , renderToString} = require("react-dom/server");


const fs = require("fs");
const template = fs.readFileSync(
  resolve(__dirname, "../../../dist/index.html"),
  "utf-8"
);


const handleTemplate = (template) => {
  return (props) =>
    template.replace(
      '<div id="root"></div>',
      `<div id="root">${props.html}</div>${props.store}`
    );
};


const ServerBundle = require("../../../dist/server.bundle").default;
module.exports = (app) => {
  router.get(["/", "/about"], async (ctx, next) => {

    const render = handleTemplate(template);

    const jsx = await ServerBundle(ctx);
    const html = renderToString(jsx);
    const body = render({
      html,
      store: `<script>window.REDUX_STATE = ${JSON.stringify(
        ctx.window
      )}</script>`,
    });
    console.log(body)

    ctx.body = body
  //   return new Promise(async (_resolve, reject) => {
  //   let didError = false;
  //   try {

  //     const jsx = await ServerBundle(ctx);
  //     const stream =  renderToPipeableStream(jsx,       {
  //       bootstrapScripts: ['/main.js'],
  //       onShellReady() {
  //         ctx.respond = false;
  //         ctx.res.statusCode = didError ? 500 : 200;
  //         ctx.response.set('content-type', 'text/html');
  //         stream.pipe(ctx.res);
  //         ctx.res.end();
  //       },
  //       onError(error) {
  //         console.log(error)
  //         didError = true;
  //         reject();
  //         ctx.res.end();
  //       },
  //     });
  //   } catch(err) {
  //     console.log(err)
  //   }
  // })
  });
  app.use(router.routes()).use(router.allowedMethods());
};
