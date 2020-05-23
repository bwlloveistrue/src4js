import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
// console.log('process',process)
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  // publicPath:'/logisticsCenter/',
  devtool: 'source-map',
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/orderTaker',
              icon: 'form',
              name: 'orderTaker',
              routes: [
                {
                  name: 'orderTakerTab',
                  icon: 'smile',
                  path: '/orderTaker/orderTakerTab',
                  component: './orderTaker/orderTakerTab',
                },
                {
                  name: 'selectOrderTakers',
                  icon: 'smile',
                  path: '/orderTaker/selectOrderTakers',
                  component: './orderTaker/selectOrderTakers',
                },
                {
                  name: 'selectOrderApportion',
                  icon: 'smile',
                  path: '/orderTaker/selectOrderApportion',
                  component: './orderTaker/selectOrderApportion',
                },
                {
                  name: 'selectOrderReceipt',
                  icon: 'smile',
                  path: '/orderTaker/selectOrderReceipt',
                  component: './orderTaker/selectOrderReceipt',
                },
              ],
            },
            {
              path: '/truckCenter',
              icon: 'form',
              name: 'truckCenter',
              routes: [
                {
                  name: 'selectTruck',
                  icon: 'smile',
                  path: '/truckCenter/selectTruck',
                  component: './truckCenter/selectTruck',
                },
                {
                  name: 'addTruck',
                  icon: 'smile',
                  path: '/truckCenter/addTruck',
                  component: './truckCenter/addTruck',
                },
              ],
            },
            {
              path: '/hrmCenter',
              icon: 'form',
              name: 'hrmCenter',
              routes: [
                {
                  name: 'addClient',
                  icon: 'smile',
                  path: '/hrmCenter/addClient',
                  component: './hrmCenter/addClient',
                },
                {
                  name: 'addDriver',
                  icon: 'smile',
                  path: '/hrmCenter/addDriver',
                  component: './hrmCenter/addDriver',
                },
                {
                  name: 'selectClient',
                  icon: 'smile',
                  path: '/hrmCenter/selectClient',
                  component: './hrmCenter/selectClient',
                },
                {
                  name: 'selectDriver',
                  icon: 'smile',
                  path: '/hrmCenter/selectDriver',
                  component: './hrmCenter/selectDriver',
                },
              ],
            },
            {
              path: '/assetCenter',
              icon: 'form',
              name: 'assetCenter',
              routes: [
                {
                  name: 'selectAsset',
                  icon: 'smile',
                  path: '/assetCenter/selectAsset',
                  component: './assetCenter/selectAsset',
                },
                {
                  name: 'assetChartForm',
                  icon: 'smile',
                  path: '/assetCenter/assetChartForm',
                  component: './assetCenter/assetChartForm',
                },
              ],
            },
            {
              path: '/fee',
              icon: 'form',
              name: 'fee',
              routes: [
                {
                  name: 'selectFee',
                  icon: 'smile',
                  path: '/fee/selectFee',
                  component: './fee/selectFee',
                },
                {
                  name: 'feeChartForm',
                  icon: 'smile',
                  path: '/fee/feeChartForm',
                  component: './fee/feeChartForm',
                },
              ],
            },
            {
              path: '/chartForm',
              icon: 'form',
              name: 'chartForm',
              routes: [
                {
                  name: 'driverChartForm',
                  icon: 'smile',
                  path: '/chartForm/driverChartForm',
                  component: './chartForm/driverChartForm',
                },
                {
                  name: 'clientChartForm',
                  icon: 'smile',
                  path: '/chartForm/clientChartForm',
                  component: './chartForm/clientChartForm',
                },
              ],
            },
            {
              path: '/setting',
              icon: 'form',
              name: 'setting',
              routes: [
                {
                  name: 'selectGoodsType',
                  icon: 'smile',
                  path: '/setting/selectGoodsType',
                  component: './setting/selectGoodsType',
                },
                {
                  name: 'selectFeeType',
                  icon: 'smile',
                  path: '/setting/selectFeeType',
                  component: './setting/selectFeeType',
                },
                {
                  name: 'selectCommercial',
                  icon: 'smile',
                  path: '/setting/selectCommercial',
                  component: './setting/selectCommercial',
                },
                {
                  name: 'selectCompulsory',
                  icon: 'smile',
                  path: '/setting/selectCompulsory',
                  component: './setting/selectCompulsory',
                },
              ],
            },
            {
              path: '/userCenter',
              icon: 'form',
              name: 'userCenter',
              routes: [
                {
                  name: 'signUp',
                  icon: 'smile',
                  path: '/userCenter/signUp',
                  component: './userCenter/signUp',
                },
                {
                  name: 'selectUser',
                  icon: 'smile',
                  path: '/userCenter/selectUser',
                  component: './userCenter/selectUser',
                },
                {
                  name: 'userDetail',
                  icon: 'smile',
                  path: '/userCenter/userDetail',
                  component: './userCenter/userDetail',
                },
              ],
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  name: 'analysis',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                {
                  name: 'monitor',
                  icon: 'smile',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                },
                {
                  name: 'workplace',
                  icon: 'smile',
                  path: '/dashboard/workplace',
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              path: '/form',
              icon: 'form',
              name: 'form',
              routes: [
                {
                  name: 'basic-form',
                  icon: 'smile',
                  path: '/form/basic-form',
                  component: './form/basic-form',
                },
                {
                  name: 'step-form',
                  icon: 'smile',
                  path: '/form/step-form',
                  component: './form/step-form',
                },
                {
                  name: 'advanced-form',
                  icon: 'smile',
                  path: '/form/advanced-form',
                  component: './form/advanced-form',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'list',
              routes: [
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/articles',
                    },
                    {
                      name: 'articles',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                    },
                    {
                      name: 'projects',
                      icon: 'smile',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                    },
                    {
                      name: 'applications',
                      icon: 'smile',
                      path: '/list/search/applications',
                      component: './list/search/applications',
                    },
                  ],
                },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                },
                {
                  name: 'basic-list',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                },
              ],
            },
            {
              path: '/profile',
              name: 'profile',
              icon: 'profile',
              routes: [
                {
                  name: 'basic',
                  icon: 'smile',
                  path: '/profile/basic',
                  component: './profile/basic',
                },
                {
                  name: 'advanced',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              name: 'result',
              icon: 'check-circle-o',
              path: '/result',
              routes: [
                {
                  name: 'success',
                  icon: 'smile',
                  path: '/result/success',
                  component: './result/success',
                },
                {
                  name: 'fail',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  name: 'center',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: 'settings',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  name: 'flow',
                  icon: 'smile',
                  path: '/editor/flow',
                  component: './editor/flow',
                },
                {
                  name: 'mind',
                  icon: 'smile',
                  path: '/editor/mind',
                  component: './editor/mind',
                },
                {
                  name: 'koni',
                  icon: 'smile',
                  path: '/editor/koni',
                  component: './editor/koni',
                },
              ],
            },
            {
              path: '/',
              redirect: '/orderTaker/orderTakerTab',
              authority: ['admin', 'user'],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
  history: 'hash',
} as IConfig;
