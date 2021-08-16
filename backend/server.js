const express = require('express');
const cors = require('cors');
const degree = require('./routes/degree.js');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("failed to connect, exiting process");
        process.exit();
    } else {
        console.log("successfully connected to database");
    }
});

app.get('/', (req, res) => {
    res.json({ "message": "income calculator api" });
});

app.use('/degree', degree);

app.listen(3000, () => {
    console.log(`Node server listening on port ${PORT}`);
});