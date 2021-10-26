const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true }).
then(con=>    console.log('MongoDb database connection established successfully')).
catch(error => console.log(error));

const orderRouter = require('./routes/orderRoutes')
app.use('/order', orderRouter)
app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})