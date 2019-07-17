const nodeExternals = require('webpack-node-externals');
const path = require('path');

const mode = process.env.NODE_ENV || 'production';
const watch = process.env.WATCH || false;
const root = path.join(
  process.cwd() || path.resolve(process.env.ROOT_PROGRAM),
  'src',
);

const app = {
  mode,
  watch,
  entry: path.join(root, 'index.js'),
  resolve: {
    modules: ['./node_modules'],
    alias: { '@': path.join(root, 'app') },
    extensions: ['.js', '.json', '.pem'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
  target: 'node',
  output: {
    path: path.join(root, 'build'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
  devtool: 'eval-cheap-module-source-map',
  plugins: [],
};

module.exports = [app];
