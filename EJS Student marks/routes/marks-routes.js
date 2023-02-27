const express = require("express")
const router = express.Router()
const Event = require('../models/Marks')
// validate input
// const { check, validationResult } = require('express-validator/check')
// date and time
const moment = require('moment');
moment().format();

// middleware to check if user is loogged in

isAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

//create new events

router.get('/create', (req,res)=> {
   
    res.render('Marks/create', {
        errors: req.flash('errors')
    })
})
// route to home events
router.get('/:pageNo?', (req,res)=> {   
    let pageNo = 1

    if ( req.params.pageNo) {
        pageNo = parseInt(req.params.pageNo)
    }
    if (req.params.pageNo == 0)   {
        pageNo = 1
    }
    
    let q = {
        skip: 5 * (pageNo - 1),
        limit: 5
    }
    //find totoal documents
    let totalDocs = 0 

    Event.countDocuments({}, (err,total)=> {

    }).then( (response)=> {
        totalDocs = parseInt(response)
        Event.find({},{},q, (err,events)=> {
            //     res.json(events)
                 let chunk = []
                 let chunkSize = 3
                 for (let i =0 ; i < events.length ; i+=chunkSize) {
                     chunk.push(events.slice( i, chunkSize + i))
                 }
                 //res.json(chunk)
                  res.render('Marks/index', {
                      chunk : chunk,
                      message: req.flash('info'),
                      total: parseInt(totalDocs),
                      pageNo: pageNo
                  })
             })
    })

  
})


// save event to db
function computeGrade(Total){
    if (Total>=90) {
        grade='A'
    } else if (Total>=80) {
        grade='B' 
    } else if (Total>=70) {
        grade='C' 
    } else if (Total>=60) {
        grade='D'  
        } else {
        grade='F'
        }
        return grade
}
router.post('/create' , (req,res)=> {


        Total=parseFloat(req.body.Quiz1)+parseFloat(req.body.Quiz2)+parseFloat(req.body.MedExam)+parseFloat(req.body.FinalExam)
        console.log(Total)
        Grade=computeGrade(Total)
        var newEvent = new Event({
            stdname:req.body.stdname,
            stdid:req.body.stdid,
            Quiz1: req.body.Quiz1,
            Quiz2: req.body.Quiz2,
            MedExam: req.body.MedExam,
            FinalExam: req.body.FinalExam,
            Total:Total,
            Grade:Grade,
            // user_id:  req.user.id,
            created_at: Date.now()
        })
        
        newEvent.save( (err)=> {
            if(!err) {
                console.log('Marks was added')
                req.flash('info', ' The Marks was created successfuly')
                res.redirect('/Marks')
            } else {
                console.log(err)
            } 
        })
 
   
})

// show single event
router.get('/show/:id', (req,res)=> {
    Event.findOne({_id: req.params.id}, (err,event)=> {
        
       if(!err) {
           
        res.render('Marks/show', {
            event: event
        })

       } else {
           console.log(err)
       }
    
    })
 
})

// edit route

router.get('/edit/:id',(req,res)=> {
    Event.findOne({_id: req.params.id}, (err,event)=> {
        
        if(!err) {
            console.log(req.params.id,event.id)

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

router.post('/update',(req,res)=> {
    
    // const errors = validationResult(req)
    // if( !errors.isEmpty()) {
       
    //     req.flash('errors',errors.array())
    //     res.redirect('/Marks/edit/' + req.body.id)
    // } else {
       // crete obj
       Total=parseFloat(req.body.Quiz1)+parseFloat(req.body.Quiz2)+parseFloat(req.body.MedExam)+parseFloat(req.body.FinalExam)
       console.log( Total,      parseFloat(req.body.Quiz1),parseFloat(req.body.Quiz2),parseFloat(req.body.MedExam),parseFloat(req.body.FinalExam)
       )
       Grade=computeGrade(Total)
   
       let newfeilds = {
        stdname:req.body.stdname,
        stdid:req.body.stdid,
        Quiz1: req.body.Quiz1,
        Quiz2: req.body.Quiz2,
        MedExam: req.body.MedExam,
        FinalExam: req.body.FinalExam,
        Total: Total,
        Grade: Grade
    }
       let query = {_id: req.body.id}
       console.log(req.body.id)
       Event.updateOne(query, newfeilds, (err)=> {
           if(!err) {
               req.flash('info', " The Marks was updated successfuly"),
            //    res.redirect('/events/edit/' + req.body.id)
               res.redirect('/Marks')

           } else {
               console.log(err)
           }
       })
    // }
   
})

//delete event

router.delete('/delete/:id', (req,res)=> {

    let query = {_id: req.params.id}

    Event.deleteOne(query, (err)=> {

        if(!err) {
            res.status(200).json('deleted')
        } else {
            res.status(404).json('There was an error .Book was not deleted')
        }
    })
})

module.exports = router 