<template>
    <v-menu
    ref="timeActivator"
    v-model="timeActivator"
    :close-on-content-click="false"
    transition="scale-transition"
    :return-value.sync="payload.time"
    offset-y
    max-width="290px"
    min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
            v-model="payload.time"
            :label="label"
            :rules="$rules.required"
            readonly
            v-on="on"
            >
                <template v-slot:append-outer>
                    <v-btn bottom icon @click="onDelete()">
                        <v-icon color="danger">mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
            </v-text-field>
        </template>
        <v-time-picker
        v-if="timeActivator"
        no-title
        v-model="payload.time"
        locale="pt-br"
        format="24hr"
        color="secondary"
        @click:minute="$refs.timeActivator.save(payload.time)"
        ></v-time-picker>
    </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'NewRecord',
    props: ['index'],
    data () {
        return {
            timeActivator: false,
            payload: {
                id: null,
                time: ''
            }
        }
    },
    computed: {
        ...mapGetters(['records']),
        label () {
            return (this.index % 2 === 0) ? `Entrada ${this.index / 2 + 1}` : `Saída ${(this.index + 1) / 2}`
        },
        formattedTime () {
            return this.$options.filters.toBRTime(this.time)
        }
    },
    created () {
        this.getTime()
    },
    methods: {
        ...mapActions(['removeRecord', 'updateRecord']),
        getTime () {
            this.payload = this.records[this.index]
        },
        onDelete () {
            this.removeRecord(this.index)
            this.getTime()
        }
    },
    watch: {
        payload: {
            handler: function (newValue) {
                this.updateRecord({ index: this.index, ...newValue })
            },
            deep: true
        },
        records () {
            this.getTime()
        }
    }
}
</script>
