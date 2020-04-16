var express = require('express');        //accessing express library
var app = express();        //accessing a part of express library
var handlebars = require('express-handlebars');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Contact = require('./models/Contact');

app.set('view engine','hbs');
app.engine('hbs', handlebars({
layoutsDir: __dirname + '/views/layouts',
extname: 'hbs'
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => { //fat arrow means function
    Contact.find({}).lean()
    .exec((err, contacts) => {
        if (contacts.length){
            res.render('index', { layout: 'main', contacts: contacts, contactsExist: true }); //send this info to /
        } else {
            res.render('index', { layout: 'main', contacts: contacts, contactsExist: false });
        }
    
    //res.render('index', { layout: 'main', contacts: contacts }); //send this info to /
})
});
app.post('/addContact', (req, res) => {
    const { name, email, number} = req.body;
    var contact = new Contact ({
        name,
        email,
        number

    });
    contact.save();
    res.redirect('/');

})

app.get('/about', (req, res) => { //fat arrow means function
    res.render('about',{ layout: 'main'}); //send this info to /

});
app.get('/contact', (req, res) => { //fat arrow means function
    res.send('This is the contact page'); //send this info to /

});

app.get('/extras', (req, res) => { //fat arrow means function
    res.send('This is the extra page'); //send this info to /

});

mongoose.connect('mongodb://localhost:27017/handlebars', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

//listening to request for port no 3000 vv
app.listen(3000, () => {        //fat arrow for callback
    console.log('Server listening on port 3000');
}); 