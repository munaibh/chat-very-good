export default function(req, res, next) {
  const isProduction = process.env.NODE_ENV === "production"
  const isInsecure = !req.secure && req.get('x-forwarded-proto') !== 'https'
  if (isInsecure && isProduction) {
    return res.redirect('https://' + req.get('host') + req.originalUrl)
  }
  next()
}