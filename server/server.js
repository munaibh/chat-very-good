import express from 'express'
import path from 'path'
import template from './helpers/template'
import secure from './helpers/forceSecure'
import compression  from 'compression'
import hotLoader from '../config/plugins/HotLoader'

const app = express()
const _compiler = __DEV__ && hotLoader.watch(app)

app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(template)
app.use(compression())
app.use(secure)

app.get('/', (req, res, next) => {
  res.render('index')
})

app.use((req, res, next) => {
  res.status(404)
  res.send('404: File Not Found')
})

export default app