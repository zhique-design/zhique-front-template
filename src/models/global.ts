import { Effect, SubscriptionAPI } from 'dva';
import { Reducer } from 'redux';
import { extractAccessTokenFromHash, setAccessToken } from '@/utils/token';
import { getResponseList } from '@/utils/request';
import { queryCategoryList } from '@/services/blog/category';

interface GlobalModelState {
  menuData: Array<any>;
}

interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    initBlog: Effect;
  };
  reducers: {
    saveMenuData: Reducer<GlobalModelState>;
  };
  subscriptions: {
    setup: (props: SubscriptionAPI) => void;
  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    menuData: [],
  },
  effects: {
    *initBlog({ callback }, { call, put }) {
      yield put({
        type: 'saveMenuData',
        payload: getResponseList(yield call(queryCategoryList, { level: 1 }))
      });
      if (callback) callback();
    },
  },
  reducers: {
    saveMenuData(state, action) {
      return {
        ...state,
        menuData: action.payload
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      const token = extractAccessTokenFromHash(window.location.hash);
      if (token) {
        setAccessToken(token);
        const { location: { pathname, search } } = history;
        history.push({ pathname, search });
      }
    }
  }
};

export default GlobalModel;

