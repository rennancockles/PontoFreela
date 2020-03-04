<template>
    <div id="toolbar">
        <Drawer></Drawer>

        <v-app-bar color="primary" dark fixed clipped-left app>
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
import Drawer from './Drawer'
import AccountsMenu from './AccountsMenu'
import UserMenu from './UserMenu'

export default {
    name: 'Toolbar',
    components: {
        Drawer,
        AccountsMenu,
        UserMenu
    },
    computed: {
        appTitle () {
            return `${process.env.VUE_APP_TITLE} ${process.env.VUE_APP_ENV_TITLE}`
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
