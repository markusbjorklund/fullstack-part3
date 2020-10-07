const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Popps a dieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const randomID = Math.floor(Math.random() * 999)

  const person = request.body
  person.id = randomID

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (req, res) => {
  res.send('<p>Phonebook has info for ' + persons.length + ' people</p> <p>' + Date() + '</p>')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)