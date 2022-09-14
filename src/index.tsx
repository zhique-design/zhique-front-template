import dva, { Router } from 'dva';
import createLoading from 'dva-loading';
import ZhiQue from './ZhiQue';
// 初始化dvaApp
const app = dva({
  // eslint-disable-next-line global-require
  history: require('history').createBrowserHistory(),
});

// 将dvaApp示例保存到window对象中，以便在其他地方调用
window.dvaApp = app;

app.router(ZhiQue as Router);

app.use(createLoading());

app.model(require('./models/global').default);

app.start('#root');
