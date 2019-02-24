require("dotenv").config();
var Spotify = require("node-spotify-api");
var moment = require("moment");
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var userCommand = process.argv[2];

function commandParser() {
    if (userCommand === "concert-this") {
        console.log("Bands in Town request")
    }
    else if (userCommand === "spotify-this-song") {
        console.log("Spotify request")
    }
    else if (userCommand === "movie-this") {
        console.log("OMDB request")
    }
    else if (userCommand === "do-what-it-says") {
        console.log("random FS request")
    }
}

commandParser();