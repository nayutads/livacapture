
const path=require('path');

module.exports = {
    entry: [ 
       './entry.js' 
     ], 
    target:'electron-renderer',
     output: { 
       path: __dirname, 
       publicPath: '/', 
       filename: 'bundle.js' 
     }, 
     module: { 
       rules: [{ 
        exclude:path.resolve(__dirname,'node_modules/.bin'),
         loader: 'babel-loader', 
         query: { 
           presets:['@babel/preset-env','@babel/preset-react']
         }
       }] 
     }, 
     resolve: { 
       extensions: ['.js', '.jsx'] 
     }, 
     devServer: { 
       historyApiFallback: true, 
       contentBase: __dirname 
     } 
   }; 