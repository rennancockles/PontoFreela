import Vue from 'vue'
import moment from 'moment'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import auth from './auth'
import vuetify from './plugins/vuetify'
import VueCurrencyFilter from 'vue-currency-filter'
import './config'

moment.locale('pt-BR')

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
