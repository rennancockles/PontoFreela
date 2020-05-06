<template>
    <div id="toolbar">
        <Drawer :show="showDrawer" @change="onChangeShowDrawer"></Drawer>

        <v-system-bar color="secondary" dark app v-if="$vuetify.breakpoint.smAndDown">
            <v-icon>mdi-clock-outline</v-icon>
            <span>{{ time }}</span>

            <v-spacer></v-spacer>

            <span>{{ money | currency }}</span>
        </v-system-bar>

        <v-app-bar color="primary" dark fixed clipped-left app>
            <v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <router-link tag="a" class="home" to="/">
                    {{ appTitle }}
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <AccountsMenu></AccountsMenu>
            <UserMenu></UserMenu>
        </v-app-bar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Drawer from './Drawer'
import AccountsMenu from './AccountsMenu'
import UserMenu from './UserMenu'

export default {
    name: 'Toolbar',
    data () {
        return {
            showDrawer: false
        }
    },
    components: {
        Drawer,
        AccountsMenu,
        UserMenu
    },
    computed: {
        ...mapGetters(['time', 'money']),
        appTitle () {
            return `${process.env.VUE_APP_TITLE} ${process.env.VUE_APP_ENV_TITLE}`
        }
    },
    methods: {
        onChangeShowDrawer (val) {
            this.showDrawer = val
        }
    }
}
</script>

<style lang="scss">
#toolbar {
    a.home {
        color: #fff;
        text-decoration: none;
    }
}
</style>
