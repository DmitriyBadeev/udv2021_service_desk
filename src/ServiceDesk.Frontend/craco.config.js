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
                            "@font-family": "'Open Sans', sans-serif",
                            "@body-background": "#f5f5f5",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
