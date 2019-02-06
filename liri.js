//Needed packages and modules are requested and initialized
require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require("fs");
var randInst = false;

//Switch method that allows the program to take the user's input and call up the needed function. If the input does not match any of the cases then it returns a default response.
switch(process.argv[2]){

  case "concert-this":
     
    concertGet(process.argv);

     break;

  case "spotify-this-song":
    
    songSpot(process.argv);

    break;

  case "movie-this":
    
    movieGet(process.argv);

    break;

  case "do-what-it-says":
    
    randomIt();

    break;

  default:
  //I think the computer may be gaining a mind of its own...

     console.log("I'm afraid I can't let you do that Dave. Select another function.");
}

//Function that takes in the user input after the desired function is requested and returns a string object that the function can use in its query
function queryGet(w)
{
  //Checks if the string is coming from user input or is part of the "random.txt" file. If it is user input it runs normally. Otherwise it returns the the string in the txt file.
  if(!randInst)
  {
  var queryArr = w;
  var newQuery = "";
 //Runs through the user input array (process.argv) and puts together all the elements into one string sentence. 
  for(var i=3; i<queryArr.length;i++)
  {
    if(i===3)
    {
     newQuery = queryArr[i];
    }else{
     newQuery = newQuery + " " + queryArr[i];
    }
  }
}else{
  //If the input came from the .txt file then the function returns the string alone.
  var newQuery = w;
}
  return newQuery;
}

//Function that puts a GET request to the Bands In Town API in order to get event info for the desired band.
function concertGet(x)
{
   //Calls the queryGet function to get the appropriate string for the get request.
    var artist = queryGet(x);
   
  //Uses axios to send a Get request to the api for the requested Band Venue information
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response){
          
           //Cycles through the results to display all the upcoming Events and Venue information in an aesthetically pleasing manner.
         for(var i=0;i<response.data.length;i++)
         {
           console.log("==============================================")
           console.log("Venue: " + response.data[i].venue.name);
           var locationTour = response.data[i].venue.city + ", "+response.data[i].venue.region + " - "+response.data[i].venue.country;
           console.log("Venue Location: " + locationTour);
           var locationDate = response.data[i].datetime;
           locationDate = locationDate.substring(0,10);
           var formattedDate = moment(locationDate).format("MM/DD/YYYY")
           console.log("Event Date: " + formattedDate);
           console.log("==============================================")
         }
        });
}

//Function that calls on the Spotify API to return information for a chosen song based on the user's input.
function songSpot(y)
{
  //Calls the queryGet function to get the appropriate string for the get request.
    var songName = queryGet(y);
    
    if(songName === "")
    {
      songName = "The Sign";
    }
  //Requests the chosen song from the Spotify API
    spotify.search({ type: 'track', query: songName}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
      //Verifies how many results were returned and trims them down if they are above 10
      if(data.tracks.items.length < 10)
      {
       var limiter = data.tracks.items.length;
      }else{
      var limiter = 10;
      }
     //Cycles through the results to display the Song information in an aesthetically pleasing manner.
      for (var i=0; i<limiter; i++)
     {
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("Artist: " + data.tracks.items[i].album.artists[0].name)
      console.log("Song Name: " + data.tracks.items[i].name )
      console.log("Preview this song here ===> " + data.tracks.items[i].external_urls.spotify)
      console.log("Album: " + data.tracks.items[i].album.name);
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      }
      });
}

//Function that calls on the omdb API to return movie information based on the user's input.
function movieGet(z)
{
 //Calls the queryGet function to get the appropriate string for the get request.
 var movieName = queryGet(z);
 
 //Checks to see if the string is empty. If so then returns the results for "Mr Nobody" by changing the movie input to that query.
 if(movieName === "")
 {
   movieName = "Mr+Nobody";
 }

 //Uses axios to send a Get request to the api for the requested movie info
 axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
        function(response) {

        //When the response is receives it goes through the object to display the information for the movie in a aesthetically pleasing way
          console.log("");
          console.log("Title: " + response.data.Title);
          console.log("Release Date: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
          console.log("Produced in: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot Summary: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        }
      );
};

//Function that grabs an instruction and query from the 'random.txt' file and calls up the appropriate function. 
function randomIt()
{
  //Sets the "random instruction" variable to true in order to pass the query to the getQuery function properly
  randInst = true;

  //Reads the text in the random.txt file and turns it into an array of strings.
  fs.readFile("random.txt","utf8", function(err,data){
    if(err)
    {
      console.log(err);
    }
   var rand = data.split(",");
   
  //Passes the strings through the switch method in order to call up the proper function
   switch(rand[0])
   {
    case "concert-this":
     
    concertGet(rand[1]);

     break;

  case "spotify-this-song":
    
    songSpot(rand[1]);

    break;

  case "movie-this":
    
    movieGet(rand[1]);

    break;
  
    default:
    console.log("This isn't a recognized function. Try again.");
   }
   
})
}