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


const game = { 
    player: {
        lifepoints: 10,
        points:     0,
        highscore:  0,
        abilities:  [   {Name: 'RemoveOnePair', Enabled: false}, 
                        {Name: 'RevealAll', Enabled: false}, 
                        {Name: 'AddLifePoints', Enabled: false}, 
                        {Name: 'AddTime', Enabled: false}]
    },
    timer:          '60',
    cardShown: [],
    difficulty:  '6',
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
        createCards.setAttribute('src','Assets/cardcover.png');
        createCards.addEventListener('click',flipCard);
        selectCardDiv.appendChild(createCards);
        
    // 
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

// https://stackoverflow.com/questions/12885110/javascript-math-random
function randomCards()// set each card value to -1, 0 , 1 and then compare them 
{
    
    game.cardShown.sort(function(){
        return Math.round(Math.random() * 2) -1 
    })
    
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
   
if(cardCompare.length < 2) addCardtoArray(this);
    
    if(cardCompare.length === 2){//comparison array === 1

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

        if(game.player.lifepoints === 0){
            console.log('you lose!');//lose screen
            moveToLose();

        }

    },1000)

}

function foundAMatch(){
    setTimeout(function(){
        console.log('you found a match!');
        const id1 = cardCompare[0].id;
        const id2 = cardCompare[1].id;

        game.cardShown[id1].Enabled = false;
        game.cardShown[id2].Enabled = false;

        renderCards();
        renderDisableOrEnableCard();
        cardCompare = [];
        game.player.points += 1;
        renderDisplay();

        if(checkAllCardsMatch()){ 
            console.log('you win!');// win screen
            moveToWin();
        }

        },1000)

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

function countdown(seconds) {
    let interval =  setInterval(function() {
         game.timer = seconds;
         renderDisplay();
         seconds--;
        
         if(seconds < 0)
         {
            clearInterval(interval);
            seconds = '60';
            renderDisplay();
             console.log('you lose!');// lose screen
             moveToLose();
         }
         else if(checkAllCardsMatch())
         {
            clearInterval(interval);
         }
         else if(game.player.lifepoints === 0){
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
        addtoRenderCard(game.difficulty);
        randomCards();
        renderCards(game.cardShown);
        
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
    renderDisplay();
    addtoRenderCard(game.difficulty);
    randomCards();
    renderCards(game.cardShown);
    disableAllCards();
    renderDisableOrEnableCard();
  }
  

main();

