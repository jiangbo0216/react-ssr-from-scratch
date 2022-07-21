import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { Routes, routes } from "./router";
import { Provider } from "react-redux";
import { createServerStore } from "./store";
import Html from '../client/pages/Html'

export default (ctx) => {
  return new Promise((resolve) => {
    const store = createServerStore();
    const promises = [];
    let stime = new Date().getTime(); // 记录当前时间戳

    routes.some((route) => {
      if (route.path === ctx.request.path && route.loadData) {
        promises.push(route.loadData());
    
      }
    });

    console.log('===fdfdf===')
    Promise.all(promises).then((res) => {
      res[0] && (ctx.window = res[0].data.data);
      
      let endTime = new Date().getTime(); // 所有中间件执行完成后记录当前时间
      console.log(`****接口请求响应时间：${endTime - stime}ms*****`);
      // const inject = <script dangerouslySetInnerHTML={{__html: `window.REDUX_STATE = ${JSON.stringify(
      //   {name: 'hello'}
      // )}`}}></script>
      resolve(
        // <Html title="React SSR Demo" REDUX_STATE={inject}>
          <Provider store={store}>
            <StaticRouter location={ctx.originalUrl}>{Routes()}</StaticRouter>
          </Provider>
        // </Html>

      );
    });
  });
};
