require("dotenv").config();
var Spotify = require("node-spotify-api");
var moment = require("moment");
moment().format();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

//api command
var command = process.argv[2];
//parse query string
var terms = process.argv.slice(3)
//divider for log.txt
var divider = "~~~~~~~~~~~~~~~~~~~~~~~~~LIRI~~~~~~~~~~~~~~~~~~~~~~~~~";
//API switcheroo
switch (command) {
  case "concert-this":
  if (terms.length > 1) {
    bandTownData(terms.join(""));
  }
  else {
    bandTownData(terms);
  }
    break;

  case "spotify-this-song":
    if (terms) {
      spotifySong(terms.join("%20"));
    }
    else {
      spotifySong("the sign ace of base");
    }
    break;

  case "movie-this":
    if (terms) {
      omdbData(terms.join("%20"));
    }
    else {
      omdbData("Mr. Nobody");
    }
    break;

  case "do-what-it-says":
    doAThing();
    break;

  default:
    console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
    break;
}

var cb = function(err) {
  if (err) throw err;
};

function bandTownData(artist) {
  var bitUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(bitUrl).then(function (response) {
    var tourData = response.data[0];
    console.log(divider);
    console.log("Event name: " + tourData.venue.name);
    console.log("Event date: " + moment(tourData.datetime).format("MM/DD/YYYY"));
    console.log("Venue location: " + tourData.venue.city + ", " + tourData.venue.country);
    
    fs.appendFile('log.txt', divider, cb);
    fs.appendFile('log.txt', "\nEvent name: " + tourData.venue.name, cb);
    fs.appendFile('log.txt', "\nEvent date: " + moment(tourData.datetime).format("MM/DD/YYYY"), cb);
    fs.appendFile('log.txt', "\nVenue location: " + tourData.venue.city + ", " + tourData.venue.region, cb);
  })
    .catch(function (error) {
      console.log('Error occurred: ' + error);
      console.log("Try searching for a different band!");
      fs.appendFile('log.txt', "\nBands in Town - error occured: " + error, cb);
    });
}

function spotifySong(song) {
  spotify.search(
    {
      type: 'track',
      query: song,
      limit: 5
    }).then(
      function (response) {
        var songData = response.tracks.items[0];
        console.log(divider);
        console.log("Artist: " + songData.artists[0].name);
        console.log("Song: " + songData.name);
        console.log("Preview URL: " + songData.preview_url);
        console.log("Album: " + songData.album.name);

        fs.appendFile('log.txt', divider, cb);
        fs.appendFile('log.txt', "\n" + songData.artists[0].name, cb);
        fs.appendFile('log.txt', "\n" + songData.name, cb);
        fs.appendFile('log.txt', "\n" + songData.preview_url, cb);
        fs.appendFile('log.txt', "\n" + songData.album.name, cb);
      })
    .catch(function (error) {
      console.log('Error occurred: ' + error);
      fs.appendFile('log.txt', "\nSpotify - error occured: " + error, cb)
    })
}

function omdbData(movie) {
  var omdbURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie + '&plot=short&tomatoes=true';

  axios.get(omdbURL).then(function (response) {
    var movie = response.data;
    console.log(divider);
    console.log("Title: " + movie.Title);
    console.log("Release Year: " + movie.Year);
    console.log("IMdB Rating: " + movie.imdbRating);
    console.log("Rotten Tomatoes Rating: " + movie.tomatoRating);
    console.log("Country: " + movie.Country);
    console.log("Language: " + movie.Language);
    console.log("Plot: " + movie.Plot);
    console.log("Actors: " + movie.Actors);

    fs.appendFile('log.txt', divider, cb);
    fs.appendFile('log.txt', "\nTitle: " + movie.Title, cb);
    fs.appendFile('log.txt', "\nRelease Year: " + movie.Year, cb);
    fs.appendFile('log.txt', "\nIMdB Rating: " + movie.imdbRating, cb);
    fs.appendFile('log.txt', "\nRotten Tomatoes Rating: " + movie.tomatoRating, cb);
    fs.appendFile('log.txt', "\nCountry: " + movie.Country, cb);
    fs.appendFile('log.txt', "\nLanguage: " + movie.Language, cb);
    fs.appendFile('log.txt', "\nPlot: " + movie.Plot, cb);
    fs.appendFile('log.txt', "\nActors: " + movie.Actors, cb);

    if (movie === "Mr. Nobody") {
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
    }
  })
    .catch(function (error) {
      console.log('Error occurred: ' + error)
      fs.appendFile('log.txt', "\nBands in Town - error occured: " + error, cb)
    });
}

function doAThing() {
  fs.readFile('./random.txt', "utf8", function (error, data) {
    if (error) {
      console.log("Error occurred: " + error)
    }
    else {
    var txt = data.split(',');
    spotifySong(txt[1]);
    }
  })
}