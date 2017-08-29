import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'
import iView from 'iview'
import VueHighlightJS from 'vue-highlightjs'
import locale from 'iview/src/locale/lang/en-US'

import 'iview/dist/styles/iview.css'
import 'font-awesome/css/font-awesome.min.css'
import 'highlight.js/styles/atom-one-light.css'

import VerticalMenu from '~/verticalMenu/verticalMenu.vue'
import VerticalMenuItem from '~/verticalMenu/verticalMenu-item.vue'

import filters from './utils/filters.js'

import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'

import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/markPoint'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(iView, {locale})
Vue.use(VueHighlightJS)

Vue.component('ECharts', ECharts)
Vue.component(VerticalMenu.name, VerticalMenu)
Vue.component(VerticalMenuItem.name, VerticalMenuItem)

// Vue.use(VueI18n)

// 注册全局消息提示
Vue.prototype.$error = Vue.prototype.$Message.error
Vue.prototype.$info = Vue.prototype.$Message.info
Vue.prototype.$success = Vue.prototype.$Message.success
new Vue(Vue.util.extend({router}, App)).$mount('#app')

