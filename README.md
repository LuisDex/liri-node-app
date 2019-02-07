# Homework - "LIRI App"

### Overview of App Requirements

The main requirements for this assignment were to create a JS Node app that would take in several commands from the user and along with some additional user input, would return a series of information related to the user's request.

The user should be able to request the following from the app:

1. Concert information - The user can request concert venue information for an artist of their choosing by inputting the command: *concert-this* followed by the name of an artist or band.
1. Song information - The user can request information relating to a specific song, such as the Album name, by inputting the command: *spotify-this-song* followed by the name of the song they would like the app to display. 
1. Movie information - The user can request information relating to a movie, such as the IMDB Rating, by inputting the command: *movie-this* followed by the name of the movie they would like the app to display.
1. Instruction from Text - The user can input the command: *do-what-it-says* to instruct LIRI to draw their next instruction from a premade "random.txt" file. The app will take a string from this text and then run one of the previous 3 instructions. 

### Node Structure


##### Initialization and Switch System

The App code begins by initializing the multiple node modules that will be used throughout the rest of the code. In addition the variable called "randInst" is set to **false** and will be used later in the app when calling up the "Text Instruction" function.
![Initialized Modules](markupImages/InitialCode.PNG)

Once all the nodules are initialized the user's input is passed through a switch method in order to call up the user's desired result.
![Switch Method](markupImages/SwitchCommand.PNG)

