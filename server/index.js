require('dotenv').config();
const express = require('express');
const cors = require('cors');
const models = require('./models/models')
const sequelize = require('./db');

const PORT = process.env.PORT || 5050
const app = express();
app.use(cors())


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log('Server started on port ' + PORT);
        })
    }
    catch (e) {
        console.log(e);
    }
}

start();