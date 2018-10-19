var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

// Get genres
module.exports.getGenres = function(callback, limitIn){
    Genre.find(callback).limit(limitIn);
}

// Add Genre
module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}

// update Genre
module.exports.updateGenre = function(id, genre, options, callback){
    var query = {_id: id};
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callback);
}

// Delete Genre
module.exports.deleteGenre = function(id, callback){
    var query = {_id: id};
    Genre.remove(query, callback);
}