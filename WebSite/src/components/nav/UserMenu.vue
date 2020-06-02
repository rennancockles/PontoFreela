<template>
    <v-menu origin="center center" transition="scale-transition" bottom offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
            v-on="on"
            color="info"
            class="ma-2 white--text"
            >
                <span class="hidden-xs-only">
                    {{ user.name }}
                    <v-icon right dark>mdi-chevron-down</v-icon>
                </span>
                <span class="hidden-sm-and-up">
                    <v-icon dark>mdi-account</v-icon>
                </span>
            </v-btn>
        </template>

        <v-list>
            <v-subheader class="hidden-sm-and-up" inset>{{ user.name }}</v-subheader>
            <v-list-item key="config" router :to="{ name: 'config.index' }">
                <v-list-item-action><v-icon>mdi-cogs</v-icon></v-list-item-action>
                <v-list-item-content><v-list-item-title><span>Configuração</span></v-list-item-title></v-list-item-content>
            </v-list-item>
            <v-list-item key="logout" router :to="{ name: 'auth.logout' }">
                <v-list-item-action><v-icon>mdi-exit-to-app</v-icon></v-list-item-action>
                <v-list-item-content><v-list-item-title><span>Sair</span></v-list-item-title></v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'AccountsMenu',
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
