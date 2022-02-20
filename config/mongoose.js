// import and require mongoose
const mongoose = require('mongoose');

// connect db to project
mongoose.connect('mongodb://localhost/contact_list_db');

// assign connection (to check connection status)
const db = mongoose.connection;

// if error
db.on('error', console.error.bind(console, 'error connecting to database'));

// if connected
db.once('open', function(){
    console.log('connection established');
});