<template>
    <v-navigation-drawer fixed clipped app>
        <v-list>
            <v-list-item-group color="primary">
                <v-list-item
                v-for="(item, i) in items"
                :key="i"
                router
                :to="item.to"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>

            <v-divider></v-divider>

            <DrawerSummary></DrawerSummary>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import DrawerSummary from './DrawerSummary'
import Items from './MenuItems'

export default {
    name: 'Drawer',
    components: {
        DrawerSummary
    },
    data () {
        return {
            items: Items
        }
    }
}
</script>
