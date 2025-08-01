// Introduce mongoose into project
const mongoose = require('mongoose');
// Grab password from process argument
const password = process.argv[2];
// Embed password into Mongo cluster URL
const url = `mongodb+srv://kajaj2026:${password}@cluster0.6eq5mib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Set strictQuery to false
mongoose.set('strictQuery', false);
// connect Mongoose to the cluster via url
mongoose.connect(url);

// Schema for creating a new "Person" model
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

// Create new "Person" model using personSchema
const Person = mongoose.model('Person', personSchema);

// Handle command line inputs based on length of argv (# of commands input)
if(process.argv.length == 3) {
    // Fetch all persons from cluster, log to console, then terminate connection
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
} else if(process.argv.length == 5) {
    // Create new person by using Person schema
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    // Save new person to cluster, then terminate connection
    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook!`);
        mongoose.connection.close();
    });
}