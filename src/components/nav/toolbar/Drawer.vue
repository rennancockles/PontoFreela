<template>
    <v-navigation-drawer fixed clipped app>
        <v-list>
            <v-list-group
            v-for="item in items"
            :key="item.key"
            :prepend-icon="item.icon"
            :append-icon="null"
            no-action
            v-model="item.active"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                v-for="subItem in item.subitems"
                :key="subItem.key"
                router
                :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>

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
