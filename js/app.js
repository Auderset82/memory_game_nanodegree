/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-bicycle', 'fa-bicycle', 'fa-leaf', 'fa-leaf', 'fa-cube', 'fa-cube', 'fa-anchor', 'fa-anchor', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-bolt', 'fa-bolt', 'fa-bomb', 'fa-bomb', 'fa-diamond', 'fa-diamond'];

let moves = 0;
let move_element = document.querySelector('.moves');
move_element.innerHTML = moves;

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
}

initGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Add Event Listener To All Cards

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

                    }, 1300)
                }
            }
        }
    })

};

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
