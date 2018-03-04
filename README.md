# Memory Game

A web app of a classic [matching game](https://en.wikipedia.org/wiki/Matching_game) where a player turns over two cards at a time in order to turn over a matching pair. The player uses their memory to remember where other cards they've turned over that didn't match are located, hence the name memory game.

## Getting Started

Here's a live version of the [Memory Game](https://rayhatron.github.io/memory-game/) deployed on my github pages website for to get started playing the game. 

### How To Install  

To play the game on your laptop instead of the live version, follow these instructions:

- Enter the following command `git clone https://github.com/Rayhatron/memory-game.git` in your terminal or cmd to clone the repository to your laptop OR [download the zip folder](https://github.com/Rayhatron/memory-game/archive/master.zip) with the files for this project. 

- Once that's done, navigate to the directory where the repository was cloned using your file explorer so you can view the files OR unzip the downloaded zip folder then open the resulting folder to view all the files. 

- Finally, right click index.html and select open with Chrome or your favourite browser to run the Memory Game on your laptop. 

That's it, Enjoy!

## How To Play

Playing the game is really simple, click/touch any card to reveal it and then touch another card to attempt to match a pair. Once you've clicked/touched the first card, a timer will begin and once you have attempted to match a pair, your moves will start to be recorded. 

A star rating will be shown and will decrease as you make more moves. The less moves you take to complete the game the higher your star rating. 

The game will end once you have successfully matched all the cards on the board. 

To start a new game, simply press the restart button and the cards will be reshuffled, your moves, timer and star rating will also reset. 

If you'd like to take a closer look at the code and see how it all works, simply fork this repository and then clone it to your local machine. Once that's done, you can open the files to edit them with a text editor or open up index.html with your favourite browser to play the Memory Game (with any changes you make) on your laptop. 

You can also take a look at the [project board](https://github.com/Rayhatron/memory-game/projects) to see how the Memory Game progressed since the first line of code was written. Feel free to leave any comments here or you can tweet me [@Rayhatron](http://twitter.com/rayhatron) and we can chat there.

## Built With

* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Used to create the structure of the Memory Game
* [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3) - Used to style the Memory Game 
* [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript) - Used to implement the logic and functionality of the Memory Game
* [Font Awesome 5](https://fontawesome.com/) - Used to add the different icons that the player has to match in the Memory Game

## Acknowledgments

* Special thanks to Laurens Holst for writing this StackOverflow answer on [how to implement Durstenfeld's version of the Fisher–Yates shuffle algorithm](https://stackoverflow.com/a/12646864)
