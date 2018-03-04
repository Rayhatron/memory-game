const cardsNodelist = document.getElementsByClassName('card');
const board = document.querySelector('.board');
const moveCounter = document.querySelector('.move-counter');
const timer = document.querySelector('.timer');
const cards = [...cardsNodelist];

// For updating the Star rating as player makes moves
const starsNodeList = document.getElementsByClassName('star');
const halfStarsNodeList = document.getElementsByClassName('star-half');
const emptyStarsNodeList = document.getElementsByClassName('star-empty');
const stars = [...starsNodeList];
const halfStars = [...halfStarsNodeList];
const emptyStars = [...emptyStarsNodeList];


// For congratulations popup once player has won
const modalContainer = document.querySelector('.modal-container');
const modalStars = document.querySelector('.modal-stars');
const modalMessage = document.querySelector('.modal-message');
const gameStars = document.querySelector('.stars');


let clickedCardsNumber = 0; // Track number of clicked cards
let clickedCards = []; // Track the cards that have been clicked
let matchedCards = 0; // Track the number of cards that have been matched to determine if winner or not
let moves = 0; // Track the number of moves that the player has made
let startTimer = true; // For triggering the timer once player starts playing

// For tracking the time
let hours = 0;
let minutes = 0;
let seconds = 0;
let time;

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
    // If it's the first click that the player has made, start the timer
    if(startTimer) {
        startTimer = false;
        time = setInterval(gameTimer, 1000);
    }

    // Limit the number of cards that can be revealed to 2
    if(clickedCardsNumber < 2) {
        clickedCardsNumber++;
        
        // Keep track of the cards that we have clicked so we can do matching
        clickedCards.push(this);
        
        // Reveal the card and make sure it can't be clicked again until after matching
        this.classList.add('show-card');
        this.classList.add('disable-card-click');
    }

    if(clickedCardsNumber == 2) {
        // Once we have selected 2 cards, let's see if they match or not
        moves++;
        moveCounter.innerHTML = `Moves: ${moves}`;

        updateStarRating();
        matchClickedCards();
    }
    
}

function matchClickedCards() {
    // Check if the icon is the same and if it is then they match and allow cards to be selected
    clickedCards[0].dataset.icon == clickedCards[1].dataset.icon ? (
        matchedCards++,
        // Once we have 8 matches it means the player has won the game so let's congratulate them
        matchedCards == 8 ? (
            clearInterval(time),
            endGame()
        ) : (
            allowCardsToBeSelected()
        )
    ) : (
        // Wait a second before hiding the cards since they didn't match and allow more cards to be selected
        setTimeout(() => {
            clickedCards.forEach((card) => {
                card.classList.remove('show-card');
                card.classList.remove('disable-card-click');
                allowCardsToBeSelected();
            });
        }, 1000)
    );

}

function updateStarRating() {
    switch(moves) {
        case 11:
            stars[2].classList.add('hide'); 
            halfStars[2].classList.remove('hide');
            break;
        case 14: 
            halfStars[2].classList.add('hide');
            emptyStars[2].classList.remove('hide');
            break;
        case 16: 
            stars[1].classList.add('hide'); 
            halfStars[1].classList.remove('hide');
            break;
        case 18: 
            halfStars[1].classList.add('hide');
            emptyStars[1].classList.remove('hide');
            break;
        case 19: 
            stars[0].classList.add('hide'); 
            halfStars[0].classList.remove('hide');
            break;
        case 20:
            halfStars[0].classList.add('hide');
            emptyStars[0].classList.remove('hide');
            break;
    }
}

function endGame() {
    modalStars.innerHTML = gameStars.innerHTML;
    modalMessage.innerHTML = `It took you ${moves} moves and ${(hours > 0) ? `${hours} hours,` : ''} ${(minutes > 0) ? `${minutes} minutes and ` : ''} ${`${seconds} seconds`} to win the game.`;
    modalContainer.classList.remove('hide');
}

function restartGame() {

    // Allow the timer to be restarted once it's been reset.
    startTimer = true;
    
    // Clear all metrics that were being tracked
    clearInterval(time);
    clickedCardsNumber = 0; 
    clickedCards = []; 
    matchedCards = 0; 
    moves = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    // Reset the Star rating visual to 3 stars since it's a new game
    stars.forEach((star) => {
        star.classList.remove('hide');
    });

    halfStars.forEach((star) => {
        star.classList.add('hide');
    });

    emptyStars.forEach((star) => {
        star.classList.add('hide');
    });

    // Reset the displayed timer to 00:00:00
    timer.innerHTML = `0${hours}:0${minutes}:0${seconds}`;
    
    // Reset the displayed moves to 0
    moveCounter.innerHTML = `Moves: ${moves}`

    // Make sure each card is hidden and clickable
    cards.forEach((card) => {
        card.classList.remove('show-card')
        card.classList.remove('disable-card-click');
    });

    // Get a new random order of cards
    shuffleArray(cards);

    // Empty the board so that we can play newly shuffled cards
    board.innerHTML = '';

    // Add the newly shuffled cards to the board
    renderShuffledCards();

    // Hide the congratulations popup and reset it
    modalStars.innerHTML = gameStars.innerHTML;
    modalMessage.innerHTML = '';
    modalContainer.classList.add('hide');
    
}

function closeModal() {
    modalContainer.classList.add('hide');
}

function allowCardsToBeSelected() {
    clickedCardsNumber = 0;
    clickedCards = [];
}

function shuffleArray(array) {
    /*  Shuffle the cards on the board using Durstenfeld's version of the Fisher–Yates shuffle algorithm
        Documentation: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
        Adapted from the following answer on Stackoverflow: https://stackoverflow.com/a/12646864
    */
    for (let initialIndex = array.length - 1; initialIndex > 0; initialIndex--) {
        let randomIndex = Math.floor(Math.random() * (initialIndex + 1));
        [array[initialIndex], array[randomIndex]] = [array[randomIndex], array[initialIndex]];
    }

}

function renderShuffledCards() {
    // Output the shuffled cards back to the board and make sure they're clickable
    cards.forEach((card) => {
        card.addEventListener('click', displayClickedCard);
        board.appendChild(card);
    });
}

shuffleArray(cards);
renderShuffledCards();
