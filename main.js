// requires
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// own imports
Genre = require('./models/genre');
Book = require('./models/book');

// variables
var app = express();
const port = 3000;

//middlewares
app.use(bodyParser.json())

// Connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
// We need a mongo db intance
var db = mongoose.connection;

// routes
app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
        if (err){
            throw err;
        }else{
            res.json(genres);
        }
    })
});

app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if (err){
            throw err;
        }else{
            res.json(books);
        }
    })
});

app.post('/api/genres', function(req, res){
    let genre = req.body;
    Genre.addGenre(genre,function(err, genre){
        if (err){
            throw err;
        }else{
            res.json(genre);
        }
    })
});

app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    let genre = req.body;
    Genre.updateGenre(id, genre, {},function(err, genre){
        if (err){
            throw err;
        }else{
            res.json(genre);
        }
    })
});

app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    Genre.deleteGenre(id, function(err, genre){
        if (err){
            throw err;
        }else{
            res.json(genre);
        }
    })
});


app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){
        if (err){
            throw err;
        }else{
            res.json(book);
        }
    })
});

app.post('/api/books', function(req, res){
    let book = req.body;
    Book.addBook(book,function(err, book){
        if (err){
            throw err;
        }else{
            res.json(book);
        }
    })
});

app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    let book = req.body;
    Book.updateBook(id, book, {},function(err, book){
        if (err){
            throw err;
        }else{
            res.json(book);
        }
    })
});

app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    Book.deleteBook(id, function(err, book){
        if (err){
            throw err;
        }else{
            res.json(book);
        }
    })
});


app.listen(process.env.port || port, function(){
    console.log(`Listening on the port ${port}...`);
});

