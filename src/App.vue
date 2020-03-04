<template>
    <v-app>
        <!-- <bounce-loader :loading="loading" :color="'#337ab7'" :size="'70px'"   ></bounce-loader> -->

        <toolbar></toolbar>

        <v-content class="default">
            <v-container grid-list-xl>
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer app>
            <div>{{ version }}</div>
            <v-spacer></v-spacer>
            <div>R3Ck &copy; {{ currentYear }}</div>
        </v-footer>
    </v-app>
</template>

<script>
import Toolbar from '@@/nav/toolbar/Toolbar'

export default {
    name: 'App',
    components: {
        Toolbar
    },
    data: () => ({
    //
    }),
    computed: {
        currentYear () {
            return new Date().getFullYear()
        },
        version () {
            // return process.env.VUE_APP_VERSION
            return '0.1.0'
        }
    }
}
</script>
