const path = require('path');

module.exports = {
    devServer: {
        open: true
    },
    chainWebpack: config => {
        config.resolve.alias.set("@@", path.join(__dirname, "./src/components"));
    },
    transpileDependencies: [
        'vuetify'
    ]
}
