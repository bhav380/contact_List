const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ Extended: false }));
app.use(express.static('assets'));


app.get('/', function(req, res) {

    Contact.find({}, function(err, contacts) {

        if (err) {
            console.log("Error while fetching contacts from database");
            return;
        }

        return res.render('home', {
            title: "Contact List",
            contact_list: contacts

        });
    });
});

app.post('/create-contact', function(req, res) {

    // contactList.push(req.body);

    Contact.create({

        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if (err) {
            console.log('Error while creating new contact!');
            return;
        }

        console.log("**********", newContact);

        return res.redirect('back');

    });

});



app.get('/delete-contact', function(req, res) {

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log("Error while deleting contact from database");
            return;
        }

        return res.redirect('back');
    })



});

app.listen(port, function(err) {

    if (err) {
        console.log(err);
        return;
    }

    console.log("server running at port number ", port);

});