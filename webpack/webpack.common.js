const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

//todo: The MiniCssExtractPlugin should be configured but I was getting errors so omitted it
//          see https://dev.to/deepanjangh/setting-up-css-and-sass-with-webpack-3cg

module.exports = {
    entry: {
      popup: path.join(srcDir, 'popup/index.tsx'),
      options: path.join(srcDir, 'options/index.tsx'),
      background: path.join(srcDir, 'background.ts'),
      content_script: path.join(srcDir, 'content_script.tsx'),
      welcome: path.join(srcDir, 'welcome/index.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
              return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader','css-loader', 'sass-loader'] 
             },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
            options: {},
        }),
    ],
};
