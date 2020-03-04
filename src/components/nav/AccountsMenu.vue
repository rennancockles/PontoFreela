<template>
    <v-menu origin="center center" transition="scale-transition" bottom offset-y>
        <template v-slot:activator="{ on }">
            <v-btn
            v-on="on"
            color="secondary"
            class="ma-2 white--text"
            >
                {{ activeAccount.name }}
                <v-icon right dark>mdi-twitter-retweet</v-icon>
            </v-btn>
        </template>

        <v-list>
            <v-subheader>Selecione uma conta</v-subheader>
            <v-list-item
            v-for="account in accounts"
            :key="account.name"
            @click="setActive(account.name)"
            >
                <v-list-item-icon>
                    <v-icon v-if="account.active" color="success">mdi-check-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="account.name"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AccountsMenu',
    computed: {
        ...mapGetters(['accounts', 'activeAccount'])
    },
    methods: {
        ...mapActions(['setActive'])
    }
}
</script>
