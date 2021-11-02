 const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
// const bodyParser = require('body-parser')

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body parser
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())



//set view engine
app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/ejs'));

//load assets
app.use('/styles', express.static(path.resolve(__dirname, 'assets/styles')))
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))


//load routers
app.use('/', require('./server/routes/router'));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})