const mongoose = require('mongoose')

let db = mongoose.connect('mongodb://127.0.0.1:27017/WebDB', { useNewUrlParser: true }, (err) => {

    if (err) {
        console.log(err)
    } else {
        console.log('connected to db succcesfuly...')
    }
})
