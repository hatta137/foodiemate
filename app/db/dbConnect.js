const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deine-datenbank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});