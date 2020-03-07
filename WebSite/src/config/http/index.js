import Vue from 'vue'
import axios from 'axios'
import Auth from '@/auth.js'

const http = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        accept: '*/*'
    }
})

const request = {
    success: req => {
        if (Auth.isLoggedIn()) req.headers.Authorization = `Bearer ${Auth.getItem('authToken')}`
        return req
    },
    error: error => {
        return Promise.reject(error)
    }
}
http.interceptors.request.use(request.success, request.error)

const response = {
    success: res => {
        return res
    },
    error: error => {
        return Promise.reject(error)
    }
}
http.interceptors.response.use(response.success, response.error)

Vue.prototype.$http = http
Vue.prototype.$axios = axios

export default http
