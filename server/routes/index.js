var express = require('express')
var router  = express.Router()
var SC = require('./soundcloud').soundcloud

var getTracks = (req, res, next) => {
  var limit  = 15
  var page   = parseInt(req.params.id) || 1
  var params = { limit: limit, offset: limit*(page-1), linked_partitioning: 1}

  SC.get('/users/115534756/tracks', params, (err, track)  => {
    if (err || track.collection.length == 0) return next()

    res.render('index', {
      title: 'Podcasts',
      baseURL : `${req.protocol}://${req.get('host')}`,
      pathURL : req.originalUrl,
      tracks  : track.collection,
      hasNext : track.next_href,
      currPage: page,
      nextPage: page + 1,
      prevPage: page - 1,
    })
  })
}

router.get('/:slug', (req,res,next) => {
  SC.get('/tracks',{ q: req.params.slug}, (err, track) => {
    if (err || track.length == 0 || track.length > 1) return next()

    res.render('single', {
      title: track[0].title,
      baseURL : `${req.protocol}://${req.get('host')}`,
      pathURL : req.originalUrl,
      track  : track[0],
    })
  })
})

router.get('/', getTracks)
router.get('/page/:id', getTracks)

module.exports = router
