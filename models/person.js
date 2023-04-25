require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
/*const url = 'mongodb+srv://hafiz:Zn8wmzqjMhCtG4e6@cluster0.cxw2nav.mongodb.net/persons?retryWrites=true&w=majority'*/
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)