import path from 'path'
import fs from 'fs'
import * as functions from './functions'

const tryCatch = (value, fallback)  => {
  const isFunc = typeof value === 'function'
  try { return isFunc ? value() : value }
  catch(e) { return fallback }
}

const PugHelpers = function() {
  const version = process.env.VERSION || 'unknown'
  const environment = process.env.NODE_ENV || 'development'
  
  let manifest = initialise()
  let inlineCache = {}

  function initialise() {
    if (environment !== 'production') return {}
    const filePath = path.join(__dirname, '..', '..', 'public', 'manifest.json')
    const config = { encoding: 'utf-8', flag: 'r' }
    return tryCatch(JSON.parse(fs.readFileSync(filePath, config)), {})
  }

  function inline(assetPath) {
    if(inlineCache[assetPath]) return inlineCache[assetPath]
    const asset = manifest[assetPath] ? manifest[assetPath] : assetPath
    const filePath = path.join(__dirname, '..', '..', 'public', asset)
    return inlineCache[assetPath] = tryCatch(fs.readFileSync(filePath, 'utf8').trim(), '')
  }

  function middleware(_req, res, next) {
    res.locals.version = version
    res.locals.environment = environment
    res.locals.inline = inline
    res.locals.asset = path => manifest[path] ? manifest[path] : path
    res.locals = { ...res.locals, ...functions}
    next()
  }

  return middleware
}

export default PugHelpers()