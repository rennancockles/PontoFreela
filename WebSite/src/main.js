import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import moment from 'moment'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import auth from './auth'
import vuetify from './plugins/vuetify'
import money from 'v-money'
import VueCurrencyFilter from 'vue-currency-filter'
import './config'

Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
    environment: process.env.NODE_ENV
})

moment.locale('pt-BR')

Vue.use(money)

Vue.use(VueCurrencyFilter, {
    symbol: 'R$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
})

Vue.prototype.$auth = auth
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
