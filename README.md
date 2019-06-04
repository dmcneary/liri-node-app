# About LIRI
LIRI is a primitive riff on Apple's SIRI, utilizing AJAX calls through axios to interact with a select number of APIs.

### Instructions:

LIRI uses a few dependencies, so please install those first by installing them in the app directory:
`npm i`

If no command is given, instructions are returned to the client.  
![screenshot](screenshots/default.JPG)  

Use the "concert-this" command to query the BandsInTown API for concerts by a particular group or artist.  
![screenshot](screenshots/bands.JPG)  
*note*: BandsInTown will not display tour results for tickets which it cannot refer for sale. Results may vary.  

Use "spotify-this-song" to query a song title with the Spotify API.  
![screenshot](screenshots/spotify.JPG)  

"movie-this" will query the OMDB API for relevant movie titles.  
![screenshot](screenshots/movie.JPG)  

Currently with limited functionality, "do-what-it-says" utilized file system interaction to read a text file & search the Spotify API.  
![screenshot](screenshots/doit.JPG)  

### Goals
Possible developments include:
* Additional APIs
* Better error handling
* Browser interactivity
