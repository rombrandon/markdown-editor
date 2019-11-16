module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: 8090,
    proxy: {
      '/token': {
        target: 'http://m.yet.ink/token',
        changeOrigin: true,
        pathRewrite: {
          '^/token': '',
        },
      },
    },
  },
}
