<template>
    <v-app>
        <bounce-loader :loading="loading" :color="'#337ab7'" :size="'70px'"></bounce-loader>

        <template v-if="isLoggedIn && !isLogin">
            <toolbar></toolbar>

            <v-main class="default">
                <v-container grid-list-xl>
                    <router-view></router-view>
                </v-container>
            </v-main>
        </template>

        <template v-else>
            <v-main class="default">
                <v-container class="fill-height">
                    <router-view></router-view>
                </v-container>
            </v-main>
        </template>

        <v-footer app>
            <div>{{ version }}</div>
            <v-spacer></v-spacer>
            <div>R3Ck &copy; {{ currentYear }}</div>
        </v-footer>
    </v-app>
</template>

<script>
import * as Sentry from '@sentry/browser'
import { mapActions, mapGetters } from 'vuex'
import Toolbar from '@@/nav/Toolbar'

export default {
    name: 'App',
    components: {
        Toolbar
    },
    data: () => ({
    //
    }),
    computed: {
        ...mapGetters(['isLoggedIn', 'loading']),
        currentYear () {
            return new Date().getFullYear()
        },
        version () {
            return process.env.VUE_APP_VERSION
        },
        isLogin () {
            return (this.$route.name || '').includes('auth')
        }
    },
    methods: {
        ...mapActions([
            'setUser',
            'setIsLoggedIn'
        ]),
        redirectLogin () {
            this.$router.push({ name: 'auth.login' })
        }
    },
    created () {
        this.setIsLoggedIn(this.$auth.isLoggedIn())
        if (this.isLoggedIn) {
            const user = this.$auth.getUser()

            this.setUser(user)

            Sentry.configureScope(function (scope) {
                scope.setUser(user)
            })
        }
        // else {
        //     this.redirectLogin()
        // }
    }
}
</script>

<style lang="scss">
.v-spinner {
    position: fixed;
    background-color: #000;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
    z-index: 9999;
    .v-bounce {
        margin: 20% auto;
    }
}
</style>
