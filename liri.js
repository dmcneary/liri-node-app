require("dotenv").config();
var Spotify = require("node-spotify-api");
var moment = require("moment");
moment().format();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

//grab CLI input
var command = process.argv[2];
var x;
//attaches multiple word arguments
for (var i = 3; i < process.argv.length; i++) {
  if (i > 3 && i < process.argv.length) {
    x = x + " " + process.argv[i];
  }
  else {
    x = x + process.argv[i];
  }
}

//API switcheroo
switch (command) {
  case "concert-this":
    bandTownData(x);
    break;

  case "spotify-this-song":
    if (x) {
      spotifySong(x);
    }
    else {
      spotifySong("the sign ace of base");
    }
    break;

  case "movie-this":
    if (x) {
      omdbData(x)
    }
    else {
      omdbData("Mr. Nobody")
    }
    break;

  case "do-what-it-says":
    doAThing();
    break;

  default:
    console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
    break;
}

function bandTownData(artist) {
  var bitUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(bitUrl).then(function(body) {
      //var body = JSON.parse(response);

      console.log("Event name: " + body[0].venue.name);
      console.log("Event date: " + moment(body[0].datetime, "MM/DD/YYYY"));
      console.log("Venue location: " + body[0].venue.city + ", " + body.venue.region);

      fs.appendFile('log.txt', "Event name: " + body[0].venue.name);
      fs.appendFile('log.txt', "Event date: " + moment(body[0].datetime, "MM/DD/YYYY"));
      fs.appendFile('log.txt', "Venue location: " + body[0].venue.city + ", " + body.venue.region);
  })
    .catch(function(error) {
      console.log('Error occurred: ' + error)
      fs.appendFile('log.txt', "Bands in Town - error occured: " + error)
  });
}

function spotifySong(song) {
  spotify.search(
    {
      type: 'track',
      query: song,
      limit: 5
    }).then(
    function (data) {
      console.log(data);
          var songData = data.tracks.items[0];
          console.log("Artist: " + songData.artists[0].name);
          console.log("Song: " + songData.name);
          console.log("Preview URL: " + songData.preview_url);
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");

          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
          fs.appendFile('log.txt', "-----------------------");
        })
      .catch(function(error){
        console.log('Error occurred: ' + error);
      fs.appendFile('log.txt', "Spotify - error occured: " + error)
      })
}

function omdbData(movie) {
  var omdbURL = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movie + '&plot=short&tomatoes=true';

  axios.get(omdbURL).then(function (body) {
      //var body = JSON.parse(response);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);

      //adds text to log.txt
      fs.appendFile('log.txt', "Title: " + body.Title);
      fs.appendFile('log.txt', "Release Year: " + body.Year);
      fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
      fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      fs.appendFile('log.txt', "Country: " + body.Country);
      fs.appendFile('log.txt', "Language: " + body.Language);
      fs.appendFile('log.txt', "Plot: " + body.Plot);
      fs.appendFile('log.txt', "Actors: " + body.Actors);

      if (movie === "Mr. Nobody") {
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
  
        //adds text to log.txt
        fs.appendFile('log.txt', "-----------------------");
        fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFile('log.txt', "It's on Netflix!");
      }
  })
    .catch(function(error){
      console.log('Error occurred: ' + error)
      fs.appendFile('log.txt', "Bands in Town - error occured: " + error)
    });
}

function doAThing() {
  fs.readFile('random.txt', "utf8", function (data) {
    var txt = data.split(',');
    spotifySong(txt[1]);
  })
}