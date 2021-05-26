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
                            "@body-background": "#FAFBFC",
                            "@link-color": "#01B286",
                            "@link-hover-decoration": "underline",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
