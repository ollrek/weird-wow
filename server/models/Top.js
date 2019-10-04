// External Dependancies
const mongoose = require('mongoose')

const topSchema = new mongoose.Schema({
	name: String,
    quantity: Number,
    highest: String,
    character: {
        name: String,
        realm: String,
        origin: String,
    } 
})

module.exports = mongoose.model('Top', topSchema)