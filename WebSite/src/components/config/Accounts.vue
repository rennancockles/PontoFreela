<template>
    <v-card flat>
        <v-tabs background-color="default" v-model="tab">
            <v-tab
            v-for="account in payload"
            :key="account.originalName"
            >
                {{ account.originalName }}
            </v-tab>
            <v-tab @click.stop.capture="addAccount">
                <v-icon large color="primary">mdi-plus</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
            v-for="account in payload"
            :key="account.originalName"
            >
                <v-card flat>
                    <v-card-text>
                        <v-form v-model="frmValid">
                            <v-row wrap>
                                <v-col xs="12" sm="6" md="3">
                                    <v-text-field
                                    label="Nome"
                                    v-model="account.name"
                                    :rules="$rules.required"
                                    ></v-text-field>
                                </v-col>
                                <v-col xs="12" sm="6" md="3">
                                    <v-text-field
                                    label="Valor/Hora"
                                    v-model="account.hourlyRate"
                                    v-money="money"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />
                        <v-btn v-if="!onlyOneAccount" color="danger" @click="onDelete(account)" dark>Remover</v-btn>
                        <v-btn color="primary" @click="onSubmit(account)" :disabled="!frmValid">Salvar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>

            <v-tab-item>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/account'

export default {
    name: 'Accounts',
    data () {
        return {
            tab: null,
            frmValid: true,
            payload: [],
            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2
            }
        }
    },
    computed: {
        ...mapGetters(['accounts']),
        onlyOneAccount () {
            return this.payload.filter(account => account.id).length === 1
        }
    },
    created () {
        this.payload = this.accounts.map(acc => ({ ...acc, originalName: acc.name }))
    },
    methods: {
        ...mapActions(['updateAccounts', 'setAccounts']),
        onSubmit (account) {
            this.setLoading(true)
            account.hourlyRate = parseFloat(account.hourlyRate.replace('R$ ', '').replace('.', '').replace(',', '.'))

            API.upsert(account)
                .then(({ data }) => {
                    const accountResponse = data.data.account

                    if (accountResponse && accountResponse.id) {
                        this.updateAccounts(accountResponse)
                        this.$auth.setAccounts(this.accounts)
                    }

                    this.setLoading(false)
                    this.$goHome()
                })
                .catch(this.$throwException)
        },
        onDelete (account) {
            if (account.id) {
                this.deleteFromServer(account)
            } else {
                this.deleteFromMemory(account)
            }
        },
        deleteFromMemory (account) {
            this.payload = this.payload.filter(acc => acc.originalName !== account.originalName)
            this.tab = 0
        },
        deleteFromServer (account) {
            this.setLoading(true)
            account.hourlyRate = parseFloat(account.hourlyRate.replace('R$ ', '').replace('.', '').replace(',', '.'))

            API.delete(account)
                .then(({ data }) => {
                    const accountsResponse = data.data.accounts

                    if (accountsResponse && accountsResponse.length > 0) {
                        this.setAccounts(accountsResponse)
                        this.$auth.setAccounts(accountsResponse)
                    }

                    this.payload = accountsResponse.map(acc => ({ ...acc, originalName: acc.name }))
                    this.tab = 0

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        addAccount () {
            const qtdNewAccount = this.payload.filter(account => account.originalName.includes('Nova Conta')).length
            const suffix = qtdNewAccount === 0 ? '' : ` ${qtdNewAccount}`
            const newAccountName = `Nova Conta${suffix}`

            this.payload.push({
                originalName: newAccountName,
                name: newAccountName,
                active: false,
                hourlyRate: '0.00'
            })

            this.tab = this.payload.length
        }
    }
}
</script>
