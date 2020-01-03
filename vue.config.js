const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const env = require('dotenv').config()

const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

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
      ]),
      //生成仅包含颜色的替换样式（主题色等）
      new ThemeColorReplacer({
        fileName: 'static/css/theme-colors.[hash:8].css',
        matchColors: [
          ...forElementUI.getElementUISeries('#FF6800'),  //element-ui主色系列
          // '#FF6800',
          // '255,104,0,0.65',  //自定义颜色
          // '255,104,0,0.85',
          // '255,104,0,0.07',
          // '255,104,0,0.05',
          // '255,104,0,0.1'
        ],
        // resolveCss (resultCss) {
        //   console.log('resultCss----->', resultCss)
        //   return resultCss
        // },
        changeSelector: forElementUI.changeSelector,
        isJsUgly: process.env.NODE_ENV !== 'development',
        // injectCss: false,
        // resolveCss(resultCss) { // optional. Resolve result css code as you wish.
        //     return resultCss + youCssCode
        // }
      })
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
