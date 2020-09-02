<template>
    <v-dialog v-model="show" max-width="700" persistent @keydown.esc="$emit('close')">
        <v-card
        color="grey lighten-4"
        min-width="650px"
        flat
        >
            <v-card-title class="primary white--text title">
                Upload NF-e
            </v-card-title>

            <v-card-text>
                <v-row>
                    <v-col>
                        <v-form v-model="frmValid">
                            <v-row>
                                <v-col cols="12">
                                    <v-file-input
                                    label="Arquivo"
                                    accept=".pdf"
                                    @change="onFileChange"
                                    ></v-file-input>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn class="danger white--text" @click="$emit('close')">Fechar</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onUploadInvoice" :disabled="!frmValid">Concluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'UploadInvoice',

    props: ['show'],

    data () {
        return {
            file: {},
            frmValid: true
        }
    },
    methods: {
        onFileChange (file) {
            this.file = {}

            const reader = new FileReader()
            reader.onload = () => {
                this.file = {
                    filename: file.name,
                    base64: reader.result
                }
            }
            reader.readAsDataURL(file)
        },
        onUploadInvoice () {
            this.$emit('uploadInvoice', this.file)
        }
    }
}
</script>
