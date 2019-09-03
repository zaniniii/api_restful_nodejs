const mongoose = require('mongoose')

let host = ''
if (process.env.NODE_ENV === 'prod') {
  host = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME + '?authSource=admin'
} else {
  host = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
}

mongoose.connect(host, { useCreateIndex: true, useNewUrlParser: true})
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false);

mongoose.connection.on('connected', () => {
  console.log('MongoDb - Connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`MongoDB: ${err}`)
})

module.exports = mongoose