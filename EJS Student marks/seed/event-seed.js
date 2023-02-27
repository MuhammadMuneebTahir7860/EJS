const db = require('../config/database')
const Event = require('../models/Evnet')


let newEvents = [

    new Event({
        title: 'Documentation',
        description: ' System Analysis',
        location: 'KSA Library',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'Operating System',
        description: ' Operating System,OS',
        location: '1',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'Operation Research',
        description: ' Operation Research,OR',
        location: '3',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'C++',
        description: ' C,C++,C#',
        location: '5',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'Java',
        description: ' Java Intro',
        location: '8',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'Computer Skills',
        description: ' CS',
        location: '8',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'Python',
        description: ' Python,Python',
        location: '8',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'Introduction to computer Skills',
        description: ' Introduction to computer Skills,CS',
        location: '3',
        date: Date.now(),
        created_at: Date.now()
    }),
    new Event({
        title: 'Visual Basic',
        description: ' Visual Basic,VB',
        location: '2',
        date: Date.now(),
        created_at: Date.now()
    }),
    
]

newEvents.forEach( (event)=> {
    event.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})
// let newEvent = new Event({
//     title: ' this is event 1',
//     description: ' ths is the best event in world',
//     location: 'oman',
//     date: Date.now()

// })


// newEvent.save( (err)=> {
    
//     if(!err) {
//         console.log('record was added')
//     } else {
//         console.log(err)
//     }
    
// })




