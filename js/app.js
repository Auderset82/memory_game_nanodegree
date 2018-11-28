/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-bicycle', 'fa-bicycle', 'fa-leaf', 'fa-leaf', 'fa-cube', 'fa-cube', 'fa-anchor', 'fa-anchor', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-diamond', 'fa-diamond'];
let moves = 0;
let move_element = document.querySelector('.moves');
move_element.innerHTML = moves;
let seconds = 0;
let timer_element = document.querySelector('.timer');
let currentTimer;
let match_count = 0;
let modal_element = document.querySelector('.modal');
let winning_time_element = document.querySelector('.time-winning');
let winning_rating_element = document.querySelector('.rating-winning');
let winning_button_element = document.querySelector('.button-winning');
let container_element = document.querySelector('.container');


function generateHtml(card) {
    return `<li class="card" data-card = "${card}"><i class="fa ${card}"></i></li>`
}


function initGame() {
    let deck = document.querySelector('.deck');
    cards = shuffle(cards);
    let html_code = cards.map(function(card) {
        return generateHtml(card);
    });
    deck.innerHTML = html_code.join('');
    addEventListener();
    move_element.innerHTML = 0;
    resetTimer(currentTimer);
    seconds = 0;
    setRating(0);
    currentTimer = setInterval(incrementSeconds, 1000);
}


function incrementSeconds() {
    seconds += 1;
    timer_element.innerText = seconds;
}

function initTime() {
    currentTimer = setInterval(function() {
        $timer.text(`${second}`)
        second = second + 1
    }, 1000);
}

function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}


let reset_element = document.querySelector('.fa-repeat');
reset_element.addEventListener('click', function() {
    initGame();
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Add Event Listener To All Cards
function addEventListener() {
    let allCards = document.querySelectorAll('.card');
    let openCards = [];

    for (let i = 0; i < allCards.length; i++) {
        allCards[i].addEventListener("click", function() {
            if (!allCards[i].classList.contains('open') || !allCards[i].classList.contains('show')) {
                allCards[i].classList.add('show', 'open');
                openCards.push(allCards[i]);
                if (openCards.length == 2) {
                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        console.log('There is a match');
                        openCards[0].classList.add('match', 'show', 'open');
                        openCards[1].classList.add('match', 'show', 'open');
                        openCards = [];
                        moves = moves + 1;
                        move_element.innerHTML = moves;
                        setRating(moves);
                        winning_time_element.innerHTML = 'Seconds you needed: ' + seconds;
                        winning_rating_element.innerHTML = 'Moves you needed: ' + moves;
                        match_count = document.querySelectorAll('.match').length;
                         if (match_count == 16) {

                           showResult();
                           setRating(moves);
                           playAgain();
                         };
                    } else
                    // if cards dont match, go away!!
                    {
                        setTimeout(function() {
                            for (let i = 0; i < allCards.length; i++) {
                                allCards[i].classList.remove('show', 'open')
                            };
                            openCards = [];
                            moves = moves + 1;
                            move_element.innerHTML = moves;
                            setRating(moves);

                        }, 1300)
                    }
                }
            }
        })

    }
};


function setRating(moves) {
    let stars = document.querySelector('.stars');
    let html_stars = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    if (moves > 15) {
        html_stars = '<li><i class="fa fa-star"></i></li>'
    } else if (moves > 12) {
        html_stars = '<li><i class="fa fa-star"></i><li><i class="fa fa-star"></i></li>'
    }
    stars.innerHTML = html_stars;
    winning_rating_element.innerHTML = html_stars;

}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

initGame();

function playAgain() {
winning_button_element.addEventListener('click', function() {
  initGame()
  modal_element.style.display = 'none';
  container_element.style.display = 'flex';
})}

function showResult(){
  modal_element.style.display = 'block';
  container_element.style.display = 'none';
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
