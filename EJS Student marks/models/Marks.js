const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
    stdname: {
        type: String,
        required: true
    },
    stdid: {
        type: String,
        required: true
    },
    Quiz1: {
        type: String,
        required: true
    },
    Quiz2: {
        type: String,
        required: true
    },
    MedExam: {
        type: String,
        required: true
    },
    FinalExam: {
        type: String,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    Grade: {
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