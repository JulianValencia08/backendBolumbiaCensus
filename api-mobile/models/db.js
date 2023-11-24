const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Conectó la bd')
}).catch(err => console.log(err.message));