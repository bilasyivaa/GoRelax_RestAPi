const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors');

require('dotenv').config()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors())

//import routes
const authRoutes = require('./routes/auth')
const addGoRelaxRoutes = require('./routes/addGoRelax')

app.use('/auth', authRoutes)
app.use('/addGoRelax', addGoRelaxRoutes)


app.get("/", (req, res) => {
  res.send("Hallo Apa Kabarnya? ");
})

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let db = mongoose.connection

//handel error
db.on('error', console.error.bind(console, 'Error Establishing Database Connection'))
//handel sukses
db.once('open', () => {
  console.log('Database Is Connected');
})

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});