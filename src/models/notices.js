import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';

import { NoticeIconData } from '@/components/NoticeIcon';
import { queryNotices } from '@/services/notices';

const GlobalModel = {
  namespace: 'notices',

  state: {
    collapsed: false,
    notices: [],
    notifyCount:0,
    unreadCount:0,
  },

  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      yield put({
        type: 'saveNotices',
        payload: data,
      });
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select((state) =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });

      yield put({
        type: 'changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload.datas,
        notifyCount: payload.notifyCount,
        unreadCount: payload.unreadCount,
      };
    },
    saveClearedNotices(state = { notices: [], collapsed: true }, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter((item) => item.type !== payload),
      };
    },
    changeNotifyCount(
      state,
      action,
    ) {
      return {
        ...state,
        notifyCount: action.payload.totalCount,
        unreadCount: action.payload.unreadCount,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
