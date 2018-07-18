module.exports ={
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase:__dirname + "/dist",
    port: 3000
  },
  module: {
   loaders: [{
     test: /(\.js)|(\.jsx)$/,
     exclude: /node_modules/,
     loader: 'babel-loader',
     query: {
       compact:false,
       presets: [
         "babel-preset-es2015",
         "babel-preset-react",
         "babel-preset-stage-2",
       ].map(require.resolve),
     },
   }],
   rules: [
     {
       test: /\.s?css/,
       use: [
         "style-loader",
         "css-loader",
         "sass-loader"
       ]
     }
   ]
 }
};
