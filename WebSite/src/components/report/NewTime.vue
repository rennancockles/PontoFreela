<template>
    <v-menu
    ref="timeActivator"
    v-model="timeActivator"
    :close-on-content-click="false"
    transition="scale-transition"
    :return-value.sync="time"
    offset-y
    max-width="290px"
    min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
            v-model="time"
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
        v-model="time"
        locale="pt-br"
        format="24hr"
        color="secondary"
        @click:minute="$refs.timeActivator.save(time)"
        ></v-time-picker>
    </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'NewTime',
    props: ['id'],
    data () {
        return {
            timeActivator: false,
            time: ''
        }
    },
    computed: {
        ...mapGetters(['recordTime']),
        label () {
            return (this.id % 2 === 0) ? `Entrada ${this.id / 2 + 1}` : `Saída ${(this.id + 1) / 2}`
        },
        formattedTime () {
            return this.$options.filters.toBRTime(this.time)
        }
    },
    created () {
        this.getTime()
    },
    methods: {
        ...mapActions(['removeTime', 'setRecordTime']),
        getTime () {
            this.time = this.recordTime(this.id)
        },
        onDelete () {
            this.removeTime(this.id)
            this.getTime()
        }
    },
    watch: {
        time: function (newValue) {
            this.setRecordTime({ index: this.id, value: newValue })
        }
    }
}
</script>
