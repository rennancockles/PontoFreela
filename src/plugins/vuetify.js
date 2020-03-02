import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: colors.indigo.darken4,
                secondary: colors.cyan.darken3,
                default: colors.blueGrey.lighten4,
                disabled: colors.blueGrey.lighten1,
                danger: colors.deepOrange.accent4,
                success: colors.teal.accent4,
                info: colors.lightBlue.accent4
            }
        }
    }
})
