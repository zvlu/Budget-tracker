const WebpackPwaManifest = require("webpack-pwa-manifest")
const path = require("path")

const config = {
    entry: {
        app: "./public/index.js"
    },
    output: {
        path : __dirname + "/public/dist",
        filename: "[name].bundle.js"
    },
    mode: "development",

    plugins: [
        new WebpackPwaManifest({
            name: "Budget Tracker",
            short_name: "Budget",
            description: "A budget tracking App.",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            start_url: "/",
            display: "standalone",
            icons: [{
                src: path.resolve(__dirname, "public/icons/icon-192x192.png"),
                size: [72, 96, 128, 144, 152, 192, 384, 512]
            }]
        })
    ],
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          }
        ]
    }
};

module.exports = config;