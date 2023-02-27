const express = require("express")
const router = express.Router()
const multer = require('multer');
const path = require("path");

const Event = require('../models/Marks')
// validate input
// const { check, validationResult } = require('express-validator/check')
// date and time
const moment = require('moment');
moment().format();

// middleware to check if user is loogged in


//create new events

router.get('/create', (req, res) => {

    res.render('Marks/create', {
        errors: req.flash('errors')
    })
})
// route to home events
router.get('/', (req, res) => {
    res.render('Marks/index', {
    })
})


// save event to db
function computeGrade(Total) {
    if (Total >= 90) {
        grade = 'A'
    } else if (Total >= 80) {
        grade = 'B'
    } else if (Total >= 70) {
        grade = 'C'
    } else if (Total >= 60) {
        grade = 'D'
    } else {
        grade = 'F'
    }
    return grade
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })

router.post('/create', (req, res) => {


    const Total = parseFloat(req.body.dayhours) * parseFloat(req.body.weekhours) + parseFloat(req.body.MedExam) * 100;
    var newEvent = new Event({
        emplname: req.body.emplname,
        compname: req.body.compname,
        dayhours: req.body.dayhours,
        weekhours: req.body.weekhours,
        sallary: Total,
        created_at: Date.now()
    })
    newEvent.save((err) => {
        if (!err) {
            console.log('Data was added')
            req.flash('info', ' The data was created successfuly')
            res.redirect('/Marks/list')
        } else {
            console.log(err)
        }
    })


})

// show single event
router.get('/list', (req, res) => {
    Event.find((err, employees) => {
        if (!err) {
        console.log(employees);
            res.render('Marks/list', {
                employees: employees,
            })

        } else {
            console.log(err)
        }

    })
})

// edit route

router.get('/edit/:id', (req, res) => {
    Event.findOne({ _id: req.params.id }, (err, event) => {

        if (!err) {
            console.log(req.params.id, event.id)

            res.render('Marks/edit', {
                event: event,
                eventDate: moment(event.date).format('YYYY-MM-DD'),
                errors: req.flash('errors'),
                message: req.flash('info')
            })

        } else {
            console.log(err)
        }

    })

})

// update the form

router.post('/update', upload.single('image'), (req, res) => {

    // const errors = validationResult(req)
    // if( !errors.isEmpty()) {

    //     req.flash('errors',errors.array())
    //     res.redirect('/Marks/edit/' + req.body.id)
    // } else {
    // crete obj
    Total = parseFloat(req.body.Quiz1) + parseFloat(req.body.Quiz2) + parseFloat(req.body.MedExam) + parseFloat(req.body.FinalExam)
    console.log(Total, parseFloat(req.body.Quiz1), parseFloat(req.body.Quiz2), parseFloat(req.body.MedExam), parseFloat(req.body.FinalExam)
    )
    Grade = computeGrade(Total)

    let newfeilds = {
        stdname: req.body.stdname,
        stdid: req.body.stdid,
        Quiz1: req.body.Quiz1,
        Quiz2: req.body.Quiz2,
        MedExam: req.body.MedExam,
        FinalExam: req.body.FinalExam,
        Total: Total,
        Grade: Grade,
        image: req.body.image,
    }
    if (req?.file?.path) {
        newfeilds.image = `${req.file.path}`
    }
    let query = { _id: req.body.id }
    console.log(req.body.id)
    Event.updateOne(query, newfeilds, (err) => {
        if (!err) {
            req.flash('info', " The Marks was updated successfuly"),
                //    res.redirect('/events/edit/' + req.body.id)
                res.redirect('/Marks/list')

        } else {
            console.log(err)
        }
    })
    // }

})

//delete event

router.delete('/delete/:id', (req, res) => {

    let query = { _id: req.params.id }

    Event.deleteOne(query, (err) => {

        if (!err) {
            res.status(200).json('deleted')
        } else {
            res.status(404).json('There was an error .Book was not deleted')
        }
    })
})

module.exports = router 