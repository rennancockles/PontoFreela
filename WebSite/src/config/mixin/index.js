import Vue from 'vue'

// import swal from 'sweetalert2'

import { mapActions } from 'vuex'

Vue.mixin({
    methods: {
        ...mapActions([
            'setLoading',
            'setBreadcrumbs'
        ]),
        $goHome () {
            this.$router.push('/')
        },
        $goBack () {
            this.$router.go(-1)
        },
        $message (message = 'OK', type = 'warning') {
            console.log(message)
            // return swal.fire('', message, type || '')
        },
        // $askBefore (
        //     fnConfirmation,
        //     title = '',
        //     text = 'Vamos continuar?',
        //     type = 'warning',
        //     confirm = 'Sim',
        //     cancel = 'Não') {
        //     swal.fire({
        //         title,
        //         text,
        //         type,
        //         showCancelButton: true,
        //         cancelButtonColor: '#d33',
        //         cancelButtonText: cancel,
        //         confirmButtonColor: '#3085d6',
        //         confirmButtonText: confirm,
        //         reverseButtons: true
        //     }).then((result) => {
        //         if (result.value) {
        //             this.setLoading(true)
        //             fnConfirmation()
        //         }
        //     })
        // },
        $throwException (error) {
            this.setLoading(false)
            if (typeof error === 'string') {
                this.$message(error, 'error')
            } else {
                const { response } = error
                if (!response) {
                    this.$message('Error Internal Server', 'error')
                } else {
                    const { message, sqlMessage } = response.data
                    if (message === 'JWT Invalid.') {
                        this.$sessionExpired()
                    } else {
                        switch (response.status) {
                        case 400:
                            this.$message(message || sqlMessage || 'Bad Request', 'warning')
                            break
                        case 401:
                            // this.$message('Você não tem permissão para acessar esta página', 'error')
                            // this.$router.push({ path: '/' })
                            this.$sessionExpired()
                            break
                        default:
                            this.$message(message || sqlMessage || 'Error Internal Server', 'error')
                            break
                        }
                    }
                }
            }
        },
        $sessionExpired () {
            this.$router.push({ name: 'auth.logout' })
            this.$message('Sua sessão expirou, por favor refaça o login!', 'info')
        }
    }
})
