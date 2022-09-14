import { Effect, SubscriptionAPI } from 'dva';
import { extractAccessTokenFromHash, setAccessToken } from '@/utils/token';

interface GlobalModelState {
}

interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
  };
  reducers: {
  };
  subscriptions: {
    setup: (props: SubscriptionAPI) => void;
  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
  },
  effects: {
  },
  reducers: {
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

