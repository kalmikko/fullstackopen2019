const express = require('express')
const app = express()
var morgan = require('morgan')
morgan.token('content', function(req, res){
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const mongoose = require("mongoose")


const password = "fullstack"


const url =`mongodb+srv://fullstack:${password}@cluster0-kd1ta.mongodb.net/phoneDB?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phoneSchema = new mongoose.Schema({
name: String,
number: String
})

const Phone = mongoose.model('Phone', phoneSchema)

/*let phonebook = [
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
        "name": "Mikko Meikäläinen",
        "number": "040-130067"
    }
]*/

app.post('/api/persons', (req,res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
        error: 'content missing' 
        })
    }
    var i
    for(i=0;i<phonebook.length;i++){
        if(body.name === phonebook[i].name){
            return res.status(400).json({
                error: 'name must be unique'
            })
        }
    }
    
    const person = {
        id: Math.floor(Math.random()*1000000),
        name: body.name,
        number: body.number
    }
    phonebook = phonebook.concat(person)
    res.json(person)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(person => person.id === id)
    if (person) {    
        response.json(person)  
    } else {    
        response.status(404).end()  
    }
  })

app.get('/', (req, res) => {
  res.send('<h1>phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    Phone.find({}).then(notes => {
      response.json(notes)
    })
  })

app.get('/info', (req, res) => {
    var datestamp = new Date()
    res.write(`<div>Phonebook has info for ${phonebook.length} people</div>`)
    res.write(`<div>${JSON.stringify(datestamp)}</div>`)
    res.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})