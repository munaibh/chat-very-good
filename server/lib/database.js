import mongoose from 'mongoose'

const MongoConnector = function() {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB, MONGO_URI } = process.env

  const resolveConnectionUrl = _ => {
    if(!MONGO_USERNAME && !MONGO_PASSWORD && !MONGO_DB && !MONGO_URI) return
    return (!MONGO_URI || MONGO_URI === '') 
      ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo:27017/${MONGO_DB}?authSource=admin`
      : MONGO_URI 
  }

  const init = () => {
    const connectionUrl = resolveConnectionUrl()
    const options = { useNewUrlParser: true, useUnifiedTopology: true, }
    if(!connectionUrl) return
    mongoose.connect(connectionUrl, options)
      .then(_ => console.log('MongoDB is connected!'))
      .catch(_ => console.log('MongoDB failed to connect!'))
  }

  return { init }
}

export default MongoConnector()