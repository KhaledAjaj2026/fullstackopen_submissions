// Introduce mongoose into project
const mongoose = require('mongoose');

// Set strictQuery to false to enable document DB
mongoose.set('strictQuery', false);

// Grab DB url from env file
const url =  process.env.MONGODB_URI;

// Alert console of connection to given url
console.log('connecting to ', url);
// Connect to the database via url
mongoose.connect(url)
    .then(res => {
        console.log('Successfully connected to MongoDB');
    })
    .catch(err => {
        console.log('error connecting to MongoDB: ', err.message);
    })

// Schema for creating a new "Person" model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

// Transform documents sent to DB to delete "_id" and "__v"
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);