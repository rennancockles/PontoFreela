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
            @click="setActive(account)"
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
import API from '@/api/account'

export default {
    name: 'AccountsMenu',
    computed: {
        ...mapGetters(['accounts', 'activeAccount'])
    },
    methods: {
        ...mapActions(['changeActive']),
        setActive (account) {
            if (account.active) return

            this.setLoading(true)

            API.setActive(account)
                .then(({ data }) => {
                    const accountResponse = data.data.account

                    if (accountResponse && accountResponse.id) {
                        this.changeActive(accountResponse)
                        this.$auth.setAccounts(this.accounts)
                    }

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        }
    }
}
</script>
