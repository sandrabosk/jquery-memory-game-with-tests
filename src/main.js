var cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];

var memoryGame = new MemoryGame(cards);
  var html = '';
  memoryGame.cards.forEach(function (pic, index) {
    html += '<div class= "card" id="card_' + pic.name + '">';
    html += '<div class="back"';
    html += '    name="'       + pic.img +  '">';
    html += '</div>';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + '") no-repeat"';
    html += '</div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  document.getElementById('memory_board').innerHTML = html;
  // Bind the click event of each element to a function
$('.back').on('click', function () {
  // if none of the cards from the classList array doesn't have class active
  // and none of the class does since they all are faced down
    if (!this.classList.contains('active')) {
      // trigger the function to add class "active"
      displayClickedCard(this);
      // push this card to the array of pickedCards (which is defined in the constructor MemoryCard) 
      memoryGame.pickedCards.push(this);
      // if we click on more than one card (if we click on the potential pair card)
      if(memoryGame.pickedCards.length > 1) {
        // add class blocked to the elements that have classes front or back
        $('.front,.back').addClass('blocked');
        // get the attr "name" from the first picked card
        var firstCard = memoryGame.pickedCards[0].getAttribute("name");
        // get the attr "name" from the second picked card
        var secondCard = memoryGame.pickedCards[1].getAttribute("name");

        if(memoryGame.checkIfPair(firstCard, secondCard)) {
          // trigger this function and it does: rests the array of picked cards to
          // an empty array and removes the class blocked
          // but the active class stays which means they stay turned face up 
          prepareNextTurn();
        } else {

          turnBackCards();
        }
      } 
      printGameInfo();
      if (memoryGame.finished()) { alert('You wooon!!!'); }
    }
});

function turnBackCards() {

  setTimeout(function () {
    // sets the background of the 1st card to gray color 
    memoryGame.pickedCards[0].style.background = '#456783';
    // sets the background of the 2nd card to gray color 
    memoryGame.pickedCards[1].style.background = '#456783';
    // removes class active which will trigger the card to flip face down
    memoryGame.pickedCards[0].classList.remove('active');
    memoryGame.pickedCards[1].classList.remove('active');
    // trigger this function 
    prepareNextTurn();
    // wait 1 second 
  }, 1000);
}

function prepareNextTurn() {
  // the picked cards array is reset to an empty array
  memoryGame.pickedCards = [];
  // remove class blocked ????
  $('.front,.back').removeClass('blocked');
}

function printGameInfo() {
  document.getElementById('pairs_clicked').innerHTML = memoryGame.pairsClicked;
  document.getElementById('pairs_guessed').innerHTML = memoryGame.pairsGuessed;
}

function displayClickedCard(card) {
  // to be able to display clicked cards-> assign them class active
  card.className += ' active';
  // set the background to this url => which is url of the image itself and the name we get using getAttribute method
  card.style.background = 'url(img/' + card.getAttribute('name') + ') no-repeat';
}
