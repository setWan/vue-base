const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const env = require('dotenv').config()

module.exports = {
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除
  outputDir: 'public',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: 'resources',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // lintOnSave: process.env.NODE_ENV !== 'production',
  pages: {
    index: {
      // page 的入口
      entry: './src/main.js',
      // 模板来源
      template: './src/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  configureWebpack: {
    output: {
      hotUpdateChunkFilename: 'hot/[hash].hot-update.js',
      hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/static'),
          to: 'static',
          ignore: ['.*']
        }
      ])
    ],
    externals: {
    }
  },
  devServer: {
    disableHostCheck: false,		// 外网穿透
    proxy: (process.env.DEV_PROXY === 'true') ? {
      '/frontend/': {
        ws: false,
        changeOrigin: true,
        target: process.env.DEV_PROXY_PATH
      }
    } : false
  }
}
