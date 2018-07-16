module.exports ={
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase:__dirname + "/dist",
    port: 3000
  }
};
