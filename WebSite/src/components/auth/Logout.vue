<template lang="html">
    <div id="logout">
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'AuthLogout',
    created () {
        this.$auth.clear()
        this.setIsLoggedIn(false)
        this.setUser({})
        this.$router.push({ name: 'auth.login' })
    },
    methods: {
        ...mapActions([
            'setIsLoggedIn',
            'setUser'
        ])
    }
}
</script>
