//https://webpack.js.org/configuration/

const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = function (options) {
    const sourcePath = path.resolve(__dirname, "../src");
    
    const alias = {  
        components: path.resolve(__dirname, "../src/components/"),
        modules: path.resolve(__dirname, "../src/modules/"),       
        utils: path.resolve(__dirname, "../src/utils/"),

        src: path.resolve(__dirname, "../src/"),
        config: path.resolve(__dirname, "../config/"),        
    };

    /*** Loaders ***/

    const loaders = [
        {
            test: [/\.jsx?$/],
            exclude: /node_modules/,
            use: ["babel-loader"],
        },
        {
            test: [/\.tsx?$/],
            exclude: /node_modules/,
            use: [
                {
                    loader: "ts-loader",
                    options: {
                        configFile:
                            options.mode === "development"
                                ? "tsconfig.json"
                                : "tsconfig.build.json",
                    },
                },
            ],
        },
        {
            // test: /\.s[ac]ss$/i,
            test: /\.(sa|sc|c)ss$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "sass-loader",
                    options: {
                        // Prefer `dart-sass`
                        // implementation: require("sass"),
                        // sourceMap: true,
                    },
                },
            ],
        },
        
        {
            test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
            type: "asset/resource",
            generator: {
                filename: "assets/[name][ext]",
            },
        },
        
        {
            test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
            type: "asset/inline",
        },        
    ];

    /*** Plugins ***/
    
    options.plugins = [
        new webpack.DefinePlugin({            
            __DEV__: options.mode === "development" ? true : false
        }),

        new HtmlWebPackPlugin({
            title: "React + MobX + MUI Boilerplate",
            template: path.join(sourcePath, "index.html"),
            filename: "index.html",
            // favicon: path.resolve(__dirname, '../../public/assets/favicon.ico'),
        }),

        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

        ...(options.plugins || []),
    ];
    
    return {
        context: sourcePath,
        // https://stackoverflow.com/a/25565222/925504
        // node: {
        //     __filename: true,
        //     __dirname: true,
        // },
        // -------------------------------------------        
        entry: "./index.tsx",
        module: {
            rules: loaders,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".jsx"],
            modules: [sourcePath, "node_modules"],            
            alias,
        },        
        ...options,
    };
};
