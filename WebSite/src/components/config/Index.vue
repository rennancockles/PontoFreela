<template>
    <v-card>
        <v-tabs background-color="primary" dark>
            <v-tab>
                <v-icon left>mdi-account</v-icon>
                Informações do Usuário
            </v-tab>
            <v-tab>
                <v-icon left>mdi-badge-account-horizontal</v-icon>
                Contas
            </v-tab>
            <v-tab>
                <v-icon left>mdi-lock</v-icon>
                Senha
            </v-tab>

            <v-tab-item>
                <UserInfo></UserInfo>
            </v-tab-item>
            <v-tab-item>
                <Accounts></Accounts>
            </v-tab-item>
            <v-tab-item>
                <UserPassword></UserPassword>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import UserInfo from './UserInfo'
import UserPassword from './UserPassword'
import Accounts from './Accounts'

export default {
    components: {
        UserInfo,
        UserPassword,
        Accounts
    }
}
</script>
