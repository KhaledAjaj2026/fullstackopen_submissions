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

// List of people to send as JSON data to server
// (This would normally be the database)
let people = [
  { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

// Get address to which JSON list of people is sent
app.get('/api/persons', (req, res) => {
    res.json(people);
});

// Get total number of persons in database, and show request's date & time
app.get('/info', (req, res) => {
  const personsCount = people.length;
  res.send(`<p>Phonebook has info for ${personsCount} people</p><p>${Date()}</p>`);
});

// Get data for a single person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const personFound = people.find(person => person.id === id);

  if(personFound) {
    res.json(personFound);
  } else {
    res.status(404).end();
  }
});

// Delete data for a single person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  people = people.filter(person => person.id !== id);
  res.status(204).end();
})

// Generate an ID for a new person entry based on the current largest id in the list
const generateId = () => {
  const maxId = people.length > 0 ? Math.max(...people.map(person => Number(person.id))) : 0;
  return String(maxId + 1);
}

// Create a new person entry and pushes it to the people list
app.post('/api/persons', (req, res) => {
  const body = req.body;

  // Find duplicate name
  const duplicateName = people.find(person => person.name === body.name);

  // Error check body content
  if(!body) {
    return res.status(400).json({
      error: 'content missing'
    });
  } else if(!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  } else if(!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  } else if(duplicateName) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  // Create new person object
  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  // Concatenate new person to people list, send to server
  people = people.concat(newPerson);
  res.json(newPerson);
});

// App listens for changes on port 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});