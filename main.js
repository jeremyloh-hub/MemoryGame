const CARDS_COLLECTION =    [{Name: 'blackpom' , src: 'Assets/1.jpeg'},
                            {Name: 'corgi' , src: 'Assets/2.jpeg'},
                            {Name: 'golden' , src: 'Assets/3.webp'},
                            {Name: 'husky' , src: 'Assets/4.webp'},
                            {Name: 'pom' , src: 'Assets/5.jpeg'},
                            {Name: 'shiba' , src: 'Assets/6.webp'},
                            {Name: 'border' , src: 'Assets/7.jpeg'},
                            {Name: 'frenchie' , src: 'Assets/8.webp'},
                            {Name: 'poodle' , src: 'Assets/9.jpeg'},
                            {Name: 'schnauzer' , src: 'Assets/10.jpeg'},
                            {Name: 'spaniel' , src: 'Assets/11.webp'},
                            {Name: 'yorkshire' , src: 'Assets/12.jpeg'},
                            ]
const CARDCOVER = 'Assets/cardcover.png';

const game = { 
    player: {
        lifepoints: 10,
        points:     0,
        highscore:  0,
        result: null,
        abilities:  [   {Name: 'RemoveOnePair', Enabled: false}, 
                        {Name: 'RevealAll', Enabled: false}, 
                        {Name: 'AddLifePoints', Enabled: false}, 
                        {Name: 'AddTime', Enabled: false}]
    },
    timer:          '60',
    cardShown:      [],
    difficulty:     '6',
}




// Array for Comparison
let cardCompare = [];
///////////////////////

function addtoRenderCard(noOfCards){

    for (let i = 0; i < noOfCards; i++) {
        const element = CARDS_COLLECTION[i];
        element.Enabled = false;
        game.cardShown.push(element,element);
        
    }
}

function renderCards(){
    const selectCardDiv = document.querySelector('.cards');
    selectCardDiv.textContent = '';

    for (let i = 0; i < game.cardShown.length; i++) {
        const cardArray = game.cardShown[i];
        const createCards = document.createElement('img');

        createCards.setAttribute('id',i);
        createCards.setAttribute('value',cardArray.Name);
        createCards.setAttribute('data', cardArray.Enabled);
        createCards.setAttribute('src',CARDCOVER);
        createCards.addEventListener('click',flipCard);
        selectCardDiv.appendChild(createCards);
        
    }
}

function renderCardsWithPic(){ //for RevealAll function
    const selectCardDiv = document.querySelector('.cards');
    selectCardDiv.textContent = '';

    for (let i = 0; i < game.cardShown.length; i++) {
        const cardArray = game.cardShown[i];
        const createCards = document.createElement('img');

        createCards.setAttribute('id',i);
        createCards.setAttribute('value',cardArray.Name);
        createCards.setAttribute('data', cardArray.Enabled);
        createCards.setAttribute('src',cardArray.src);
        createCards.addEventListener('click',flipCard);
        selectCardDiv.appendChild(createCards);
        
    }
}



function renderDisplay(){
    const selectDisplayDiv = document.querySelector('.display');
    selectDisplayDiv.textContent = '';

    const points = game.player.points;
    const timer = game.timer;
    const lp = game.player.lifepoints;
    const createPoints = document.createElement('h2');
    const createTimer = document.createElement('h2');
    const createLp = document.createElement('h2');

    createPoints.setAttribute('id','points');
    createTimer.setAttribute('id','timer');
    createLp.setAttribute('id','lp');

    createPoints.innerText = `Points: ` + points;
    createTimer.innerText = `Timer: ` + timer;
    createLp.innerText = `LifePoints: ` + lp;

    selectDisplayDiv.appendChild(createPoints);
    selectDisplayDiv.appendChild(createTimer);
    selectDisplayDiv.appendChild(createLp);

}

// https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
function randomCards()
{
    for (let i = game.cardShown.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [game.cardShown[i], game.cardShown[j]] = [game.cardShown[j], game.cardShown[i]];
      }
}



function renderAbilityButton(){// create 4 button based on abilities
const selectBtnDiv = document.querySelector('.AllAbilityBtn');
selectBtnDiv.textContent = '';

for (let i = 0; i < game.player.abilities.length; i++) {
    const ability = game.player.abilities[i];
    
    const createAbilityButton = document.createElement('button');
    createAbilityButton.innerText = ability.Name;
    createAbilityButton.setAttribute('value',ability.Enabled);
    createAbilityButton.setAttribute('id',i);
    createAbilityButton.className = 'AbilityBtn';
    createAbilityButton.addEventListener('click',moveToGame);

    selectBtnDiv.appendChild(createAbilityButton);
}
}

function renderAbilityButtonInGame(){
const selectGameBtnDiv = document.querySelector('.AllAbilityBtnGame');
selectGameBtnDiv.textContent = '';

for (let i = 0; i < game.player.abilities.length; i++) {
    const ability = game.player.abilities[i];
    
    const createAbilityButton = document.createElement('button');
    createAbilityButton.innerText = ability.Name;
    createAbilityButton.setAttribute('value',ability.Enabled);
    createAbilityButton.setAttribute('id',i);
    createAbilityButton.classList.add('AbilityBtn');
    createAbilityButton.classList.add('AbilityBtnGame');

    if(ability.Name === 'RemoveOnePair'){
        createAbilityButton.addEventListener('click',removeOnePair);
    }
    else if(ability.Name === 'RevealAll'){
        createAbilityButton.addEventListener('click',revealAll);
    }
    else if(ability.Name === 'AddLifePoints'){
        createAbilityButton.addEventListener('click',addLifePoints);
    }
    else if(ability.Name === 'AddTime'){
        createAbilityButton.addEventListener('click',addTime);
    }

    selectGameBtnDiv.appendChild(createAbilityButton);
}
}

function removeOnePair(){
    for (let i = 0; i < game.cardShown.length; i++) {
        const element = game.cardShown[i];
        if(element.Name === 'pom'){
            element.Enabled = false;
        }
}           
            game.player.points += 1;
            renderCards();
            renderDisableOrEnableCard();
            game.player.abilities[0].Enabled = 'false';
            renderAbilityButtonInGame();
            renderDisableorEnableBtn();
}

function revealAll(){

    renderCardsWithPic();

    setTimeout(function(){
        renderCards();
    },1000)
    
    game.player.abilities[1].Enabled = 'false';
    renderAbilityButtonInGame();
    renderDisableorEnableBtn();
}

function addLifePoints(){
    game.player.lifepoints = game.player.lifepoints + 3;
    game.player.abilities[2].Enabled = 'false';
    renderAbilityButtonInGame();
    renderDisableorEnableBtn();
}

function addTime(){
    game.timer = game.timer + 30;
    renderDisplay();
    game.player.abilities[3].Enabled = 'false';
    renderAbilityButtonInGame();
    renderDisableorEnableBtn();
}

// https://stackoverflow.com/questions/21070101/show-hide-div-using-javascript
function moveToGame(){
   const gameScreen = document.querySelector('.gameScreen')
   const startScreen = document.querySelector('.startScreen');
   const ability = this.innerText;

   for (let i = 0; i < game.player.abilities.length; i++) {
    let element = game.player.abilities[i];
    if(element.Name === ability)
    {
        element.Enabled = true;
        startScreen.style.display = 'none';
        gameScreen.style.display = 'grid';
    } 
   }
}

function moveToLose()
{
    const gameScreen = document.querySelector('.gameScreen')
    const startScreen = document.querySelector('.startScreen');
    const loseScreen = document.querySelector('.loseScreen');

    gameScreen.style.display = 'none';
    loseScreen.style.display = 'grid';
    
}

function moveToWin(){
    const gameScreen = document.querySelector('.gameScreen')
    const startScreen = document.querySelector('.startScreen');
    const winScreen = document.querySelector('.winScreen');

    gameScreen.style.display = 'none';
    winScreen.style.display = 'grid';
}

function flipCard() {
   
if(cardCompare.length < 2) addCardtoArray(this); // compare array is less than 2
    
    if(cardCompare.length === 2){ // compare array is equal to 2
        if(cardCompare[0].name === cardCompare[1].name){
            foundAMatch();
        }
        else{
            matchWrongly();
        }
    }
  }

  function matchWrongly()
{
    setTimeout(function(){

        renderCards();
        renderDisableOrEnableCard();
        cardCompare = [];
        game.player.lifepoints -= 1;
        renderDisplay();

    },1000)

}

function foundAMatch(){
    setTimeout(function(){
        const id1 = cardCompare[0].id;
        const id2 = cardCompare[1].id;

        game.cardShown[id1].Enabled = false; //disable the cards in the model
        game.cardShown[id2].Enabled = false;

        renderCards(); // re-render the cards based on the model
        renderDisableOrEnableCard(); // check on the model if the cards should be disabled or enabled
        cardCompare = []; // clear the compare array
        game.player.points += 1; // updating the model
        renderDisplay(); //re-render the display

        },1000)
}

function checkWinOrLose(){
    if(checkAllCardsMatch()){
        game.player.result = true;
    }
    else if(game.player.lifepoints === 0){
        game.player.result = false;
    }
}

function moveToWinOrLose(){
    if(game.player.result === true){
        moveToWin();
    }
    else if(game.player.result === false){
        moveToLose();
    }
}

  function addCardtoArray(card){

    const selectedId = card.getAttribute('id');
    const selectedName = card.getAttribute('value');

    const cardValue = {name:selectedName,id:selectedId}
    card.setAttribute('src',game.cardShown[selectedId].src);
    card.removeEventListener('click',flipCard);

    cardCompare.push(cardValue);
} 

  function checkAllCardsMatch(){
    for (let i = 0; i < game.cardShown.length; i++) {
        if (game.cardShown[i].Enabled) {
          return false;
        }
      }
      return true;
}

function countdown() {
    let interval =  setInterval(function() {
         game.timer--;
         renderDisplay();

         if(game.timer < 0)
         {
            clearInterval(interval);
            game.timer = '60';
            renderDisplay();
            game.player.result = false;
            checkWinOrLose();
            moveToWinOrLose();
             
         }
         else if(checkAllCardsMatch())
         {
            checkWinOrLose();
            moveToWinOrLose();
            clearInterval(interval);
         }
         else if(game.player.lifepoints === 0){
            checkWinOrLose();
            moveToWinOrLose();
            clearInterval(interval);
         }
         
     }, 1000);
   }

   function startGame(){
    countdown(game.timer);
  
    let startBtn = document.querySelector('#startBtn');
    startBtn.classList.add('disabledbutton');
    enableAllCards();
    renderCards();
    renderDisableOrEnableCard();
    renderAbilityButtonInGame();
    renderDisableorEnableBtn();
   }

   function disableAllCards()
   {
    for (let i = 0; i < game.cardShown.length; i++) {
        let card = game.cardShown[i];
        card.Enabled = 'false';
    }
   }

   function enableAllCards(){
    for (let i = 0; i < game.cardShown.length; i++) {
        let card = game.cardShown[i];
        card.Enabled = true;
    }
   }

   function renderDisableOrEnableCard()
   {
    const selectImg = document.querySelectorAll('img');
            for (let i = 0; i < selectImg.length; i++) {
                const element = selectImg[i];
                if(element.getAttribute('data') === 'false')
                {
                    element.classList.add('disabledbutton');
                    
                }
                else if(element.getAttribute('data') === 'true')
                {
                    element.classList.remove('disabledbutton');
                    
                }
            }
   }

   function renderDisableorEnableBtn(){
    const selectAbilityBtn = document.querySelectorAll('.AbilityBtnGame');
    for (let i = 0; i < selectAbilityBtn.length; i++) {
        const element = selectAbilityBtn[i];
        if(element.getAttribute('value') === 'false')
                {
                    element.classList.add('disabledbutton');
                    
                }
                else if(element.getAttribute('data') === 'true')
                {
                    element.classList.remove('disabledbutton');
                    
                }
    }
}



   function restart(){
    const winScreen = document.querySelector('.winScreen');
    const loseScreen = document.querySelector('.loseScreen');
    const startScreen = document.querySelector('.startScreen')
    const startBtn = document.querySelector('#startBtn');
    player = game.player;
    player.points = 0;
    player.lifepoints = 10;
    game.timer = '60';
    game.cardShown = [];
    
    for (let i = 0; i < player.abilities.length; i++) {
        const element = player.abilities[i];
        element.Enabled = false;
    }

    startBtn.classList.remove('disabledbutton');
    winScreen.style.display = 'none';
    loseScreen.style.display = 'none';
    startScreen.style.display = 'grid';

    main();
}

function selectDifficulty(radiobutton){
    for (let i = 0; i < radiobutton.length; i++) {
        const element = radiobutton[i];
        element.addEventListener('change',function(){
        game.difficulty = element.value;
        
        game.cardShown = [];
        main();

        })
    }
}


  function main(){
    
    const selectStartBtn = document.querySelector('#startBtn');
    selectStartBtn.addEventListener('click',startGame);

    const selectRestartBtn = document.querySelectorAll('.restartBtn')
    selectRestartBtn.forEach(function(button){
        button.addEventListener('click',restart);
    })

    const selectRadioBtn = document.getElementsByName('difficulty');
    selectDifficulty(selectRadioBtn);

    renderAbilityButton();
    renderAbilityButtonInGame();
    renderDisplay();
    addtoRenderCard(game.difficulty);
    randomCards();
    renderCards();
    disableAllCards();
    renderDisableOrEnableCard();
    renderDisableorEnableBtn();
  }
  

main();

