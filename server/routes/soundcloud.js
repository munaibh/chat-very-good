var express = require('express')
var router  = express.Router()
var SC      = require('node-soundcloud')

SC.init({
  id: process.env.SOUNDCLOUD_ID,
  secret: process.env.SOUNDCLOUD_SECRET,
  uri: 'http://localhost:3000/callback'
})

router.get('/callback', (req, res) => {
  var code = req.query.code
  SC.authorize(code, function(err, accessToken) {
    if (err) { throw err }
    else { console.log('access token:', accessToken) }
  })
})

module.exports = { router: router, soundcloud: SC }
