// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import store from './store'
// import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueI18n from 'vue-i18n'
import en from './locales/en/translations'
import fr from './locales/fr/translations'

Vue.use(VueI18n)

const locale = 'fr'

const messages = {
  en: en,
  fr: fr
}

const i18n = new VueI18n({
  locale,
  messages
})

// Vue.use(VueResource)
Vue.use(VueAxios, axios)
Vue.use(VueFire)

const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})

Vue.config.productionTip = false

const requireComponent = require.context(
  './lib/components',
  true,
  /Component+\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace('/Component.vue', '')
  let finalName = ''
  for (let i = componentName.length - 1; i >= 0; i--) {
    if (componentName[i] !== '/') {
      finalName += componentName[i]
    } else {
      i -= componentName.length
    }
  }
  finalName = finalName.split('').reverse().join('')
  Vue.component(
    finalName,
    componentConfig.default || componentConfig
  )
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

export default i18n
