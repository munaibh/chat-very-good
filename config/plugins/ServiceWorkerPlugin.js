const path = require("path")
const version = require('./WebpackPluginUtils').version()
module.exports = class ServiceWorkerPlugin {
  constructor({output, template} = {}) {
    this.pluginName = 'webpackServiceWorkerPlugin'
    this.template = template || './client/service-worker.js'
    this.output = output || 'service-worker.js'
  }

  get cacheName() {
    return JSON.stringify(`static-${version}`)
  }

  replace(compilation, path) {
    const data = require("fs").readFileSync(path, "utf8")
    const manifest = compilation.assets['manifest.json'].source()
    return data
      .replace('__VERSION__', this.cacheName)
      .replace('__MANIFEST__', manifest);
  }

  apply(compiler) {
    compiler.hooks.emit.tap(this.pluginName, compilation => {
      const template = path.join(compiler.context, this.template)
      const content = this.replace(compilation, template)
      compilation.fileDependencies.add(template);
      compilation.assets[this.output] = {
        source:() => content,
        size: () => content.length,
      }
    })
  }
}