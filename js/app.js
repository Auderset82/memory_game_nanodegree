/*
 * Declare the variables needed
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
let reset_element = document.querySelector('.fa-repeat');

function generateHtml(card) {
    return `<li class="card" data-card = "${card}"><i class="fa ${card}"></i></li>`
}

/*
 * Function which executes when the game is started
 */
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

reset_element.addEventListener('click', function() {
    initGame();
});

/*
 * The Event Listener to all Cards are added and the matching and gameEnd functionality is triggered here
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
    })
}

function showResult() {
    modal_element.style.display = 'block';
    container_element.style.display = 'none';
}
