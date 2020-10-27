var express = require('express')
var router  = express.Router()

router.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  res.render('error', {
    status: err.status,
    message: err.message
  })
});

module.exports = router
