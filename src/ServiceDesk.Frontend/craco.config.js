const CracoLessPlugin = require("craco-less")

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#00D29D",
                            "@font-size-base": "15px",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
