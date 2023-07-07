const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]
const appName = `PhonebookDB`

const url =
  `mongodb+srv://benjaminakerlund:${password}@cluster0.qrvfmu5.mongodb.net/${appName}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)


/** Create entry schema for singular contacts
 * and initialize
 */
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
const Contact = mongoose.model('Contact', contactSchema)


if (newName && newNumber) {
    /** Add a new document (contact) to the DB */
    const contact = new Contact({
        name: newName,
        number: newNumber,
    })

    contact.save().then(result => {
        console.log(`added ${newName} number ${newNumber} to phonebook`);
        mongoose.connection.close()
    })
} else { //print out phonebook contents
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact)
        })
        mongoose.connection.close()
    })
}

