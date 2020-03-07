import Vue from 'vue'

Vue.filter('toISODate', function (value) {
    return value ? Vue.prototype.$moment(String(value)).format('YYYY-MM-DD') : ''
})

Vue.filter('toBRDate', function (value) {
    return value ? Vue.prototype.$moment(String(value)).format('DD/MM/YYYY') : ''
})

Vue.filter('toBRDateTime', function (value) {
    return value ? Vue.prototype.$moment(String(value)).format('DD/MM/YYYY HH:mm') : ''
})

Vue.filter('monthName', function (value) {
    return value ? Vue.prototype.$moment(String(value)).format('MMMM') : ''
})

Vue.filter('toUpper', function (value) {
    return value ? value.toString().toUpperCase() : ''
})
