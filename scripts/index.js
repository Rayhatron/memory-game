const cardsNodelist = document.getElementsByClassName('card');
const board = document.querySelector('.board');
const moveCounter = document.querySelector('.move-counter');
const timer = document.querySelector('.timer');
const cards = [...cardsNodelist];

let clickedCardsNumber = 0; // Track number of clicked cards
let clickedCards = []; // Track the cards that have been clicked
let matchedCards = 0; // Track the number of cards that have been matched to determine if winner or not
let moves = 0; // Track the number of moves that the player has made

// For tracking the time
let hours = 0;
let minutes = 0;
let seconds = 0;
let time;

window.onload = () => {
    // Auto start the timer as soon as the game loads
    // TODO: Implement a start button that will start the time
    time = setInterval(gameTimer, 1000);
};

function gameTimer() {
    seconds++;

    if(seconds == 60){
        minutes++;
        seconds = 0;
    }

    if(minutes == 60){
        hours++;
        minutes = 0;
    }

    // Add leading 0s as long as the hours, minutes or seconds are less than 10 so as to have a clean consistent timer UI
    timer.innerHTML = `${((hours < 10) ? `0${hours}` : hours)}:${((minutes < 10) ? `0${minutes}`:minutes)}:${((seconds < 10) ? `0${seconds}`:seconds)}`;
}

function displayClickedCard() {
    // Limit the number of cards that can be revealed to 2
    if(clickedCardsNumber < 2) {
        console.log("Clicked");
        clickedCardsNumber++;
        
        // Keep track of the cards that we have clicked so we can do matching
        clickedCards.push(this);
        
        // Reveal the card and make sure it can't be clicked again until after matching
        this.classList.toggle("show-card");
        this.classList.toggle("disable-card-click");
        console.log(clickedCards);
    }

    if(clickedCardsNumber == 2){
        // Once we have selected 2 cards, let's see if they match or not
        moves++;
        moveCounter.innerHTML = `Moves: ${moves}`;
        matchClickedCards();
    }
    
}

function matchClickedCards() {
    // Check if the icon is the same and if it is then they match and allow cards to be selected
    if(clickedCards[0].dataset.icon == clickedCards[1].dataset.icon){
        console.log("Match!");
        matchedCards++;
        // Once we have 8 matches it means the player has won the game so let's congratulate them
        if(matchedCards == 8){
            // TODO: Make a fancy congratulations message :) and ask the user if they want to play again 
            // As well as show them their Star rating and time it took to complete.
            alert("Winner!");
            clearInterval(time);
        }else{
            allowCardsToBeSelected();
        }
    }else{
        // Wait a second before hiding the cards since they didn't match and allow more cards to be selected
        setTimeout(() => {
            clickedCards.forEach((card) => {
                card.classList.remove("show-card");
                card.classList.remove("disable-card-click");
                allowCardsToBeSelected();
            });
        }, 1000);
    }

}

function allowCardsToBeSelected() {
    clickedCardsNumber = 0;
    clickedCards = [];
}

function shuffleArray(array) {
    /*  Shuffle the cards on the baord using Durstenfeld's version of the Fisher–Yates shuffle algorithm
        Documentation: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
        Adapted from the following answer on Stackoverflow: https://stackoverflow.com/a/12646864
    */
    for (let initialIndex = array.length - 1; initialIndex > 0; initialIndex--) {
        let randomIndex = Math.floor(Math.random() * (initialIndex + 1));
        [array[initialIndex], array[randomIndex]] = [array[randomIndex], array[initialIndex]];
    }

}

function renderShuffledCards(){
    // Output the shuffled cards back to the board
    for (let i= 0; i < cards.length; i++){
        cards[i].addEventListener("click", displayClickedCard);
        board.appendChild(cards[i]);
    }
}

shuffleArray(cards);
renderShuffledCards();
