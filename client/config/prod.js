const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = function () {
    const buildPath = path.resolve(__dirname, "../../dist/client");

    return require("./common")({
        mode: "production",
        // context: sourcePath,
        devtool: "source-map",
        // externals: ['react', 'react-dom', 'prop-types'],
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "../public/favicon.ico", to: path.join(buildPath, "assets") },
                    // { from: "source", to: "dest" },
                ],
            }),
        ],
        output: {
            path: buildPath,
            filename: "[name].bundle.js",
            clean: true,
            // libraryTarget: 'commonjs2',
        },

        optimization: {
            minimize: true,
            // https://webpack.js.org/plugins/split-chunks-plugin/
            splitChunks: {
                chunks: "async",
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxSize: 300000,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                cacheGroups: {                    
                    defaultVendors: {                        
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    });
};
