module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/, // handles both .js and .mjs files by babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { 
            presets: ['@babel/preset-react', '@babel/preset-env'], 
            plugins: ['@babel/plugin-transform-runtime'] 
          }
        }
      }
    ]
  }
};
