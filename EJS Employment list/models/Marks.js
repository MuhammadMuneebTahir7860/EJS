const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
    emplname: {
        type: String,
        required: true
    },
    compname: {
        type: String,
        required: true
    },
    dayhours: {
        type: String,
        required: true
    },
    weekhours: {
        type: String,
        required: true
    },
    sallary: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Marks = mongoose.model('Marks', eventSchema, 'Marks')

module.exports = Marks