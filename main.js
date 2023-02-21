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
    cardShown: [{Name: 'blackpom' , src: 'Assets/1.jpeg' , Enabled: 'false'},
                {Name: 'blackpom' , src: 'Assets/1.jpeg' , Enabled: 'false'},
                {Name: 'corgi' , src: 'Assets/2.jpeg' , Enabled: 'false'},
                {Name: 'corgi' , src: 'Assets/2.jpeg' , Enabled: 'false'},
                {Name: 'golden' , src: 'Assets/3.webp', Enabled: 'false'},
                {Name: 'golden' , src: 'Assets/3.webp' , Enabled: 'false'},
                {Name: 'husky' , src: 'Assets/4.webp' , Enabled: 'false'},
                {Name: 'husky' , src: 'Assets/4.webp' , Enabled: 'false'},
                {Name: 'pom' , src: 'Assets/5.jpeg' , Enabled: 'false'},
                {Name: 'pom' , src: 'Assets/5.jpeg' , Enabled: 'false'},
                {Name: 'shiba' , src: 'Assets/6.webp' , Enabled: 'false'},
                {Name: 'shiba' , src: 'Assets/6.webp' , Enabled: 'false'},
            ] 
}


// Array for Comparison
let cardCompare = [];
///////////////////////


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
    renderCards(game.cardShown);
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

function flipCard() {
    if(cardCompare.length === 0){
        const value = this.getAttribute('id');
        const name = this.getAttribute('value');

        const cardValue = {name:name,id:value}
        this.setAttribute('src',game.cardShown[value].src);
        this.removeEventListener('click',flipCard);

        cardCompare.push(cardValue);
    }
    else if(cardCompare.length === 1){
        const value = this.getAttribute('id');
        const name = this.getAttribute('value');

        const cardValue = {name:name,id:value}
        this.setAttribute('src',game.cardShown[value].src);
        this.removeEventListener('click',flipCard);

        cardCompare.push(cardValue);

        if(cardCompare[0].name === cardCompare[1].name){
            setTimeout(function(){
                console.log('you found a match!');
                const id1 = cardCompare[0].id;
                const id2 = cardCompare[1].id;
        
                game.cardShown[id1].Enabled = false;
                game.cardShown[id2].Enabled = false;
        
                renderCards();
                renderDisableOrEnableCard();
                cardCompare = [];
                
                },1000)
        }
        else{
            setTimeout(function(){

                renderCards();
                renderDisableOrEnableCard();
                cardCompare = [];
                game.player.lifepoints -= 1;
                renderDisplay();
    
            },1000)
        }
    }
  }

  

    
function countdown(seconds) {
   
    let interval =  setInterval(function() {
         game.timer = seconds;
         renderDisplay();
         seconds--;
        
         if(seconds < 0)
         {
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
   

  function main(){
    
    const selectStartBtn = document.querySelector('#startBtn');
    selectStartBtn.addEventListener('click',startGame);

   
    renderAbilityButton();
    renderDisplay();
    randomCards();
    disableAllCards();
    renderDisableOrEnableCard();

  }
  

main();

