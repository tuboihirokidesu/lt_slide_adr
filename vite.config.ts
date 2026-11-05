// roughjs は依存のない ESM の1ファイルなので、事前バンドルせずにそのまま読む
export default {
  optimizeDeps: { exclude: ['roughjs'] },
}
