// Introduce dotenv to the project
require('dotenv').config();
// Import person model
const Person = require('./models/person');
// Introduce Express to the project
const express = require('express');
// Introduce Morgan middleware to the project
const morgan = require('morgan');
// Apply Express to the var "app"
const app = express();
// Introduce CORS policy to the project
const cors =  require('cors');

//*** MIDDLEWARE ***//
// Parse JSON content
app.use(express.json());
// HTTP request logger
app.use(morgan('tiny'));
// CORS policy
app.use(cors());
// Static file hosting capability to Express app
app.use(express.static('dist'));

// Get address to which JSON list of people is sent
app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people);
  })
});

// Get total number of persons in database, and show request's date & time
app.get('/info', (req, res) => {
  const personsCount = People.find({}).then(people => people.length);
  res.send(`<p>Phonebook has info for ${personsCount} people</p><p>${Date()}</p>`);
});

// Get data for a single person
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person);
  });
});

// Delete data for a single person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  people = people.filter(person => person.id !== id);
  res.status(204).end();
})

// Create a new person entry and pushes it to the people list
app.post('/api/persons', (req, res) => {
  const body = req.body;
  
  // Find duplicate name
  Person.find({name: {$eq: body.name}}).then(people => {
    if(people.length > 0) {
      return res.status(400).json({
        error: 'name must be unique'
      });
    } else {
      // Error check body content
      if(!body) {
        return res.status(400).json({
          error: 'content missing'
        });
      } else if(!body.name) {
        return res.status(400).json({
          error: 'name missing'
        });
      } else if(!body.number) {
        return res.status(400).json({
          error: 'number missing'
        });
      }
      
      // Create new person object
      const newPerson = new Person({
        name: body.name,
        number: body.number
      });
      
      // Add new person to DB
      newPerson.save().then(savedPerson => {
        res.json(savedPerson);
      });
    }
  });
});

// App listens for changes on given port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});