const path = require("path");

module.exports = function () {
    
    return require("./common")({
        mode: "development",
        devtool: "eval-source-map",        
        devServer: {
            static: {
                directory: path.join(__dirname, "../public"),
            },
            historyApiFallback: true,
            compress: false,
            // inline: true,
            hot: true,
            liveReload: false,
            // disableHostCheck: true,
            port: 3000,
            host: "0.0.0.0",
            // https://webpack.js.org/configuration/dev-server/#devserverproxy
            proxy: [                               
                {
                    context: "/rest",
                    target: "http://localhost:5000/",
                },                
            ],
        },
        optimization: {
            minimize: false,
        },
        // cache: false,
    });
};
