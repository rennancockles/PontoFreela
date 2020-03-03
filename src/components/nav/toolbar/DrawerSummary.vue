<template>
    <div>
        <v-list-item class="default">
            <v-list-item-avatar color="success">
                <v-icon x-large dark>mdi-clock-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    <span class="success--text title">{{ time }}</span>
                    <br>
                    <span class="caption">Tempo trabalhado</span>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item class="default">
            <v-list-item-avatar color="info">
                <v-icon x-large dark>mdi-currency-usd</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    <span class="info--text title">{{ money | currency }}</span>
                    <br>
                    <span class="caption">Valor acumulado</span>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </div>
</template>

<script>
export default {
    name: 'DrawerSummary',
    data () {
        return {
            time: '30:00',
            money: 600.50
        }
    }
}
</script>
