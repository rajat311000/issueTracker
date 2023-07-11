 const mongoose = require('mongoose');


 mongoose.connect('mongodb+srv://rajatjain3276:hIDTc7Q3h5LGTeRh@cluster0.p35gpct.mongodb.net/?retryWrites=true&w=majority');

 const db = mongoose.connection;

 db.on('error', console.error.bind(console, 'error in connecting to db'));

//up and runnning
db.once('open', function() {
    console.log("successfully connected to the databasef");
});