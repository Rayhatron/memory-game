const cardsNodelist = document.getElementsByClassName('card');
const board = document.querySelector('.board');
const cards = [...cardsNodelist];

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

function displayShuffledCards(){
    // Output the shuffled cards back to the board
    for (let i= 0; i < cards.length; i++){
        board.appendChild(cards[i]);
    }
}

shuffleArray(cards);
displayShuffledCards();
