const http = require('http')
const PORT = process.env.PORT || 8080

let currentApp = require('./server').default
let server = http.createServer(currentApp).listen(PORT, function () {
  if(process.env.NODE_ENV !== 'production') return
  console.info(`Server started on: http://localhost:${PORT}`)
})

if (module.hot) {
  module.hot.accept("./server", () => {
    server.removeListener("request", currentApp)
    currentApp = require('./server').default
    server.on("request", currentApp)
  })
  
  module.hot.accept(err => console.log(err))
  module.hot.dispose(_ => {
    console.log('Disposing entry module...')
    server.close()
  })
}