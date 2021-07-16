const express = require("express");
const cors = require("cors");
var path = require('path');
const app = express();

const db = require("./food/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
// const corsOptions = {
//     origin: [
//       'http://www.example.com',
//       'http://localhost:8080',
//     ],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   };

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './client/build')));

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

require("./food/routes/food.routes")(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
