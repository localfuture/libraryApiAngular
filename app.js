const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

mongoose.connect("mongodb://localhost:27017/libraryAngularDB", { useNewUrlParser: true });

//mongoose.connect("mongodb+srv://anand:unicornb1331@cluster0-0tquo.mongodb.net/libraryAngularDB?retryWrites=true&w=majority");

var bookCollection = mongoose.model("bookdetails", {
  isbn: String,
  title: String,
  subtitle: String,
  author: String,
  published: String,
  publisher: String,
  pages: String,
  description: String,
  website: String
});

var authorCollection = mongoose.model("authordetails", {
  author: String,
  country: String,
  imageLink: String,
  language: String,
  link: String,
  pages: String,
  title: String,
  year: String,
  description: String
});

var userCollection = mongoose.model("userdetails", {
  fullname: String,
  email: String,
  password: String
});



//Add Book//
app.post("/addBook", (req, res) => {
  var book = new bookCollection(req.body);
  book.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("data inserted");
      res.send(data);
    }
  })
})

//View Book//
app.get("/viewBooksApi", (req, res) => {
  bookCollection.find((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(data);
    }
  });
});

//Add Authors//
app.post("/addAuthorApi", (req, res) => {
  var author = new authorCollection(req.body);
  author.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("data inserted");
      res.send(data);
    }
  })
});

//View Author
app.get("/showAuthors", (req, res) => {
  authorCollection.find((error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(data);
    }
  });
});

///Register///
app.post("/register", (req, res) => {
  var user = new userCollection(req.body);
  user.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("User Added");
      res.send(data);
    }
  })
})

///Log In///
app.post("/login", (req, res) => {
  var email = req.body.email;
  console.log(email);

  userCollection.find({ email: email }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(" User details corresponding to email address returned ");
      res.send(data);
    }
  });
});

////Hello////
app.get("/", (req, res) => {
  res.send("Hello");
});

//////////////////
app.listen(process.env.PORT || 3000, () => {
  console.log("server is up");
});