import Vue from 'vue'

const rules = {
    required: [v => !!v || 'Campo obrigatório'],
    requiredLength: [v => v.length > 0 || 'Campo obrigatório'],
    cpf: [v => (!v || /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(v)) || 'CPF inválido'],
    cnpj: [v => (!v || /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(v)) || 'CNPJ inválido'],
    telefone: [v => (!v || /\(\d{2}\) \d{4}-\d{4}/.test(v)) || 'Telefone inválido'],
    celular: [v => (!v || /\(\d{2}\) \d{5}-\d{4}/.test(v)) || 'Celular inválido'],
    email: [v => (!v || /.+@.+\..+/.test(v)) || 'E-mail inválido']
}

Vue.prototype.$rules = rules

export default rules
