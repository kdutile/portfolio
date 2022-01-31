// Worked on with Kevin Casey

///////////////////
// Objects & global variables
///////////////////

// we actually don't use anything here but the hitPoints
const player1 = {
  name: '',
  barracks: [],
  hitPoints: 10
}

// we actually don't use anything here but the hitPoints
const player2 = {
  name: 'Computer',
  barracks: [],
  hitPoints: 10
}

// never got to this
// let gameType = '';

///////////////////
// Functions
///////////////////

// // 0. Initial player selection
// const gameStart = () => {
// }

// 1. Start players turn
const playerTurn = () => {

  // Update HP
  $('.player-hp').text(`Player HP: ${player1.hitPoints}`);
  $('.computer-hp').text(`Computer HP: ${player1.hitPoints}`);

  // get rid of computer button
  $('#start-prompt h2').remove();
  $('button#computer-game').remove();

  // Add text prompt and buttons to page
  const $playerTurn = $('<section>').attr('id','create-or-select');
  $('<h2>').text('Would you like to select a peon or create a new one?').appendTo($playerTurn);
  $('<button>').attr('type','button').attr('id','create').text('Create').appendTo($playerTurn);
  $('<button>').attr('type','button').attr('id','select').text('Select').appendTo($playerTurn);
  $('section#start-prompt').after($playerTurn);

  // load the on() event
  $('#create').on('click', createPeon);
  $('#select').on('click', selectPeon);

}

// 2. Create peon
const createPeon = () => {

  // get rid of create/select buttons
  $('#create-or-select h2').remove();
  $('button#create').remove();
  $('button#select').remove();

  // Add text prompt and inputs to page
  const $createPeon = $('<section>').attr('id','peon-create');
  $('<h2>').text('What would you like to name your peon?').appendTo($createPeon);
  $createPeon.append('<input id="name" type="text"/>');
  $createPeon.append('<input id="submit" type="submit"/>');
  $('section#create-or-select').after($createPeon);

  // load the on() events
  $('#submit').on('click', () => {
    // assigns input
    const $nameInput = $('#name').val();
    // fail save for blank entry
    if ($nameInput == '') {
      alert('You forgot a name. Try again!')
      console.log('Hi Nolo/Jesse! Please excuse the error. It let\'s the user try again.');
      $nameInput = 'YouForgotAName';
    }
    // puts name into td
    const $peonName = $('<td>').text($nameInput);
    // puts peon info into tr
    const $peonInfo = $('<tr>').append($peonName).append('<td>nothing</td>');
    $('#player1Barracks').append($peonInfo);
    // loop peon actions, include parameter as breadcrumb
    loopPeons('create');
  })

}

// 3a. Select peon
// 3b. Assign role of peon
const selectPeon = () => {

  // get rid of create/select buttons
  $('#create-or-select h2').remove();
  $('button#create').remove();
  $('button#select').remove();

  // Add text prompt and inputs to page
  const $selectPeon = $('<section>').attr('id','choose-peon');
  $('<h2>').text('Which peon would you like to select?').appendTo($selectPeon);
  $selectPeon.append('<input id="select-name" type="text"/>');
  $selectPeon.append('<input id="submit-attack" type="submit" value="attack"/>');
  $selectPeon.append('<input id="submit-repair" type="submit" value="repair"/>');
  $('section#create-or-select').after($selectPeon);

  // attack input with some "error checking" via syntax errors
  $('#submit-attack').on('click', () => {
    const $nameInput = $('#select-name').val();
    console.log($(`td:contains('${$nameInput}')`).text());
    if ($nameInput == '') {
      alert(`Invalid selection, try again.`);
      console.log('Hi Nolo/Jesse! Please excuse the error. It let\'s the user try again.');
      $nameInput = 'You have been punished for your ineptitude.';
    } else if ($(`td:contains('${$nameInput}')`).text() != $nameInput) {
      alert(`Invalid selection, try again.`);
      console.log('Hi Nolo/Jesse! Please excuse the error. It let\'s the user try again.');
      $nameInput = 'You have been punished for your ineptitude.';
    }
    $(`td:contains(${$nameInput})`).siblings().text('attack');
    // off to peon "loop" with breadcrumb
    loopPeons('attack');
  })

  // repair input with some "error checking" via syntax errors
  $('#submit-repair').on('click', () => {
    const $nameInput = $('#select-name').val();
    if ($nameInput == '') {
      alert(`Invalid selection, try again.`);
      console.log('Hi Nolo/Jesse! Please excuse the error. It let\'s the user try again.');
      $nameInput = 'You have been punished for your ineptitude.';
    } else if ($(`td:contains('${$nameInput}')`).text() != $nameInput) {
      alert(`Invalid selection, try again.`);
      console.log('Hi Nolo/Jesse! Please excuse the error. It let\'s the user try again.');
      $nameInput = 'You have been punished for your ineptitude.';
    }
    $(`td:contains(${$nameInput})`).siblings().text('repair');
    // off to peon "loop" with breadcrumb
    loopPeons('repair');
  })
}

// 4. Loop through peon actions
const loopPeons = (action) => {

  if (action == 'create') {
    // get rid of name inputs
    $('#peon-create h2').remove();
    $('input#name').remove();
    $('input#submit').remove();
  } else if (action == 'attack' || action == 'repair') {
    // get rid of attack/repair inputs
    $('#choose-peon h2').remove();
    $('input#select-name').remove();
    $('input#submit-attack').remove();
    $('input#submit-repair').remove();
  }

  // count (.length) each role (filter)
  const $numAttack = $('td:contains("attack")').length;
  const $numRepair = $('td:contains("repair")').length;
  // deal damage to computer or repair self
  player2.hitPoints -= $numAttack;
  player1.hitPoints += $numRepair;
  // display results
  const $peonResults = $('<p>').text(`Your peons healed you for ${$numRepair} hit point(s) while dealing ${$numAttack} damage to the computer.`);
  $('section#display').before($peonResults);
  // off to the computer's turn
  computerTurn();
}

// 5. Computer random
const computerTurn = () => {
  // generate random numbers for hp and choice
  const randomHP = Math.floor(Math.random()*4) + 1;
  const randomChoice = Math.floor(Math.random()*2);
  // if attack, deal damage and print results
  if (randomChoice === 0) {
    player1.hitPoints -= randomHP;
    const $takeDamage = $('<p>').text(`The computer hits you for ${randomHP} point(s). You now have ${player1.hitPoints} hit point(s) left!`);
    $('section#display').before($takeDamage);
  }
  // if heal, repair self and print results
  else if (randomChoice === 1) {
    player2.hitPoints += randomHP;
    const $healDamage = $('<p>').text(`The computer heals itself for ${randomHP} point(s). It now has ${player2.hitPoints} hit point(s) left!`);
    $('section#display').before($healDamage);
  }
  // should never see this
  else {
    console.log('Error: you shouldn\'t be seeing this');
  }
  // check win condition
  checkWin();
}

// 6. Win condition
const checkWin = () => {

  // Update HP
  $('.player-hp').text(`Player HP: ${player1.hitPoints}`);
  $('.computer-hp').text(`Computer HP: ${player2.hitPoints}`);

  // if tie
  if (player1.hitPoints <= 0 && player2.hitPoints <= 0) {
    const $mutualDestruction = $('<h2>').text('You killed eachother. There is no winner. Such is war.');
    $('section#display').before($mutualDestruction);
  }
  // if player wins
  else if (player1.hitPoints > 0 && player2.hitPoints <= 0) {
    const $poorComputer = $('<h2>').text('Congrats, you won! The computers made note of this for the future uprising.');
    $('section#display').before($poorComputer);
  }
  // if computer wins
  else if (player1.hitPoints <= 0 && player2.hitPoints > 0) {
    const $poorPlayer = $('<h2>').text('The computer beat you. You lose! Now you know how the chess grandmasters feel.');
    $('section#display').before($poorPlayer);
  }
  // if no win condition is met
  else {
    const $warGoesOn = $('<h2>').text('You\'re both still alive, would you like to continue?');
    $('<button>').attr('type','button').attr('id','continue').text('Continue').appendTo($warGoesOn);
    $('<button>').attr('type','button').attr('id','retreat').text('Retreat').appendTo($warGoesOn);
    $('section#display').before($warGoesOn);
  }
  // load on() events
  $('#continue').on('click', clearContinuePrompt);
  $('#retreat').on('click', adiosAmigo);
}

// clear page of anything after empty start-prompt section
const clearContinuePrompt = () => {
  $('h2').remove();
  $('button').remove();
  $('p').remove();
  $('#create-or-select').remove();
  $('#peon-create').remove();
  $('#choose-peon').remove();
  // round n, fight
  playerTurn();
}

// Fun retreat scenario
const adiosAmigo = () => {
  $('h2').remove();
  $('button').remove();
  const $respect = $('<p>').text('The computer agrees and there\'s a cease fire. Congrats to the living!');
  $('section#display').before($respect);
}


///////////////////
// Post DOM-load
///////////////////

$(() => {
  // Single button to launch the game
  $('#computer-game').on('click', playerTurn)

  // Wanted to add a second button to make a second player, but never got here

})
