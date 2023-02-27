import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// 如果想要中文版 element-ui，按如下方式声明
//导入中文
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
Vue.use(ElementUI, {
  locale: zhLocale,
});
zhLocale.el.pagination = {
  goto: '跳至',
  pagesize: '条/页',
  total: `共计 {total} 条`,
  pageClassifier: '页',
};

//引入全局组件
import CategorySelect from './components/CategorySelect/CategorySelect'
Vue.component(CategorySelect.name,CategorySelect)
import HitButton from './components/HitButton/HitButton'
Vue.component(HitButton.name,HitButton)

Vue.config.productionTip = false

//引入相关的Api接口
import Api from "./api/index"

//引入echarts
import * as echarts from 'echarts';

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate(){
    //组件实例的原型的原型指向的是Vue.prototype
    //任意组件可以使用API相关接口
    Vue.prototype.$Api =  Api
    Vue.prototype.echarts = echarts
  },
  render: h => h(App)
})
