<template>
    <v-app>
        <!-- <bounce-loader :loading="loading" :color="'#337ab7'" :size="'70px'"   ></bounce-loader> -->

        <template v-if="isLoggedIn && !isLogin">
            <toolbar></toolbar>

            <v-content class="default">
                <v-container grid-list-xl>
                    <router-view></router-view>
                </v-container>
            </v-content>
        </template>

        <template v-else>
            <v-content class="default">
                <v-container class="fill-height">
                    <router-view></router-view>
                </v-container>
            </v-content>
        </template>

        <v-footer app>
            <div>{{ version }}</div>
            <v-spacer></v-spacer>
            <div>R3Ck &copy; {{ currentYear }}</div>
        </v-footer>
    </v-app>
</template>

<script>
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
        ...mapGetters(['isLoggedIn']),
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
            'setAccounts',
            'setIsLoggedIn'
        ]),
        redirectLogin () {
            this.$router.push({ name: 'auth.login' })
        }
    },
    created () {
        if (this.$auth.isLoggedIn()) {
            this.setIsLoggedIn(true)
            this.setUser(this.$auth.getUser())
            this.setAccounts(this.$auth.getAccounts())
        } else {
            this.redirectLogin()
        }
    }
}
</script>
