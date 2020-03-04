<template>
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
