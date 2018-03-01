const cardsNodelist = document.getElementsByClassName('card');
const board = document.querySelector('.board');
const cards = [...cardsNodelist];

let clickedCardsNumber = 0; // Track number of clicked cards
let clickedCards = []; // Track the cards that have been clicked

function displayClickedCard () {
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
