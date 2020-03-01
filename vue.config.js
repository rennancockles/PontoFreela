const path = require('path');

module.exports = {
    devServer: {
        open: true,
        // port: 9090,
    },
    chainWebpack: config => {
        config.resolve.alias.set("@@", path.join(__dirname, "./src/components"));
    },
}
