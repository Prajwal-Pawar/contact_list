const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'viewFiles'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: 'prajwal',
        phone: '1231231231'
    },
    {
        name: 'akash',
        phone: '1231231231'
    }
];

app.get('/', function(req, res){
    return res.render('index', {
        contact_list: contactList
    });
});

app.get('/new_contact', function(req, res){
    return res.render('new_contact');
});

app.post('/create-contact', function(req, res){
    contactList.push(req.body);
    return res.redirect('/');
});

// deleting a contact
app.get('/delete-contact', function(req, res){
    //getting a phone number from query
    let phone = req.query.phone;

    // searching index of that phone in contactList
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    //checking if phone number exists and deleting it
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('server is running on port', port);
});