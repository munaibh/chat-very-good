const hotMiddleware = require('webpack-hot-middleware/client?reload=true')

hotMiddleware.subscribe(payload => {
  const shouldReload = payload.action === 'reload' || payload.reload === true
  if (shouldReload) window.location.reload()
})

module.exports = hotMiddleware