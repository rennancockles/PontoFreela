<template>
    <div id="toolbar">
        <v-navigation-drawer fixed clipped app>
            <v-list>
                <v-list-group
                v-for="item in items"
                :key="item.key"
                :prepend-icon="item.icon"
                :append-icon="null"
                no-action
                v-model="item.active"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                    v-for="subItem in item.subitems"
                    :key="subItem.key"
                    router
                    :to="item.to"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="subItem.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <v-divider></v-divider>

                <v-list-item class="default">
                    <v-list-item-avatar color="success">
                        <v-icon x-large dark>mdi-clock-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title><span>30:00</span></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item class="default">
                    <v-list-item-avatar color="info">
                        <v-icon x-large dark>mdi-currency-usd</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title><span>R$ 250,00</span></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar color="primary" dark fixed clipped-left app>
            <v-toolbar-title>
                <router-link tag="a" class="home" :to="{ path: '/' }">
                    {{ appTitle }}
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu origin="center center" transition="scale-transition" bottom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                    v-on="on"
                    color="secondary"
                    class="ma-2 white--text"
                    >
                        AgVen
                        <v-icon right dark>mdi-twitter-retweet</v-icon>
                    </v-btn>
                </template>

                <v-list two-line>
                    <v-list-item key="config" router to="/">
                        <v-list-item-action><v-icon>mdi-cogs</v-icon></v-list-item-action>
                        <v-list-item-content><v-list-item-title><span>Configuração</span></v-list-item-title></v-list-item-content>
                    </v-list-item>
                    <v-list-item key="logout" router to="/">
                        <v-list-item-action><v-icon>mdi-exit-to-app</v-icon></v-list-item-action>
                        <v-list-item-content><v-list-item-title><span>Sair</span></v-list-item-title></v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-menu origin="center center" transition="scale-transition" bottom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                    v-on="on"
                    color="info"
                    class="ma-2 white--text"
                    >
                        {{ user.name }}
                        <v-icon right dark>mdi-chevron-down</v-icon>
                    </v-btn>
                </template>

                <v-list two-line>
                    <v-list-item key="config" router to="/">
                        <v-list-item-action><v-icon>mdi-cogs</v-icon></v-list-item-action>
                        <v-list-item-content><v-list-item-title><span>Configuração</span></v-list-item-title></v-list-item-content>
                    </v-list-item>
                    <v-list-item key="logout" router to="/">
                        <v-list-item-action><v-icon>mdi-exit-to-app</v-icon></v-list-item-action>
                        <v-list-item-content><v-list-item-title><span>Sair</span></v-list-item-title></v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
import Items from './MenuItems'

export default {
    name: 'Toolbar',
    components: {
    },
    data () {
        return {
            items: Items,
            user: {
                name: 'Rennan'
            }
        }
    },
    computed: {
        appTitle () {
            // return `${process.env.VUE_APP_TITLE} ${process.env.VUE_APP_ENV_TITLE}`
            return 'Ponto Freela'
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
