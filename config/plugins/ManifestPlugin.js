module.exports = class ManifestPlugin {
  constructor({output, transform, basePath} = {}) {
    this.pluginName = 'webpackManifestPlugin'
    this.output = output || 'manifest.json'
    this.basePath = basePath || '/'
    this.transform = transform || this.transform
  }

  transform(files, [filename]) {
    if(filename.includes('hot-update')) return files
    const value = this.basePath + filename
    const key = value.replace(/(\.[a-f0-9].*)(\..*)$/, '$2')
    return (files[key] = value) && files
  }

  apply(compiler) {
    compiler.hooks.emit.tap(this.pluginName, compilation => {
      const stats = Object.entries(compilation.assets)
      const files = stats.reduce(this.transform.bind(this), {})
      compilation.assets[this.output] = {
        source: () => JSON.stringify(files, null, 2),
        size: () => files.length,
      }
    })
  }
}