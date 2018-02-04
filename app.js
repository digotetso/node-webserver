const express = require('express');
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;

var app =  express();

//tell express which view engine you wanna use

app.set('view engine', 'hbs')
app.use((req, res, next) => {
    res.render('maintenance.hbs')
})

app.use((req, res, next) => {
var now = new Date().toString()
var log = `${now} ${req.url} ${req.method}`
fs.appendFile('server.log', log +  '\n', (error) =>{
    if(error){
        console.log('Unable to save logs on server,js')
    }
})
console.log(log)
next()
})


//register partials you want to use, to inject template dymanically & create re-usable templates
hbs.registerPartials(__dirname + '/views/partials')

//register helper, 
hbs.registerHelper('getFullYear', () =>{
    return new Date().getFullYear()
})


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
   res.render('home.hbs',{
    WelcomeMessage: 'Welcome to my website',
       pageTitle:'dee',
       pageHeading: 'Home',
   })
})

app.get('/about', (req, res) => {
    res.render('home.hbs',{
        pageTitle:'dee',
        pageHeading: 'About page'
    })
 })
// app.get('/badrequest', (req, res) => {
//     res.send('bad request')
// })

app.listen(port,() => console.log(`server runing at port ${port}`));