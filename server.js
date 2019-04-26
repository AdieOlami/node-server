const path = require('path')
const fs = require('fs')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = 3000

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    const now =  new Date().toString();
    const log = `${now}: ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    })
    next();
})


hbs.registerPartials(path.join(__dirname, '/views/includes'))
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.send({
        name: 'Adie',
        likes: [
            'Coding',
            'Sleeping'
        ]
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
    })
})
app.listen(port, () => console.log(`Example app listening on port ` + port))