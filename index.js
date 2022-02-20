const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

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

    Contact.find({}, function(err, contact){
        if(err){
            console.log('error', err);
            return;
        }

        return res.render('index', {
            contact_list: contact
        });
    });

});

app.get('/new_contact', function(req, res){
    return res.render('new_contact');
});

app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error');
            return;
        }
        console.log(newContact);
        return res.redirect('back');
    });
});

// deleting a contact
app.get('/delete-contact', function(req, res){
    //getting a id from query
    let id = req.query.id;

    // deleting a contact using that id
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('cant remove contact', err);
            return;
        }
        
        return res.redirect('back');
    }) 
});

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('server is running on port', port);
});