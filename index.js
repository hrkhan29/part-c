const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('build'))
require('dotenv').config()
const cors = require('cors')
app.use(cors())

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    console.log('validation', error.message)
    return response.status(500).send({ error: error.message })
  }

  next(error)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(entries => { if(entries) {
    response.json(entries) } else {response.status(404).end()}
  })
})


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


