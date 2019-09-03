const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
  const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']

  let err = {
    'code': 403,
    'error': true,
    'message': __('fail_athenticated_token')
  }

  if (!token) {
    res.status(403).send(err)
    return false
  }

  try {
    req.decoded = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    res.status(403).send(err)
    return false
  }
}