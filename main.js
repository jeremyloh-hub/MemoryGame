const game = { 
    player: {
        lifepoints: '10',
        points:     0,
        highscore:  '0',
        abilities:  {remove1Pair: false, revealAll: false, addLp: false, addTime: false}
    },
    timer:          '60',
    cardShown: [{Name: 'blackpom' , src: 'Assets/1.jpeg'},
                {Name: 'blackpom' , src: 'Assets/1.jpeg'},
                {Name: 'corgi' , src: 'Assets/2.jpeg'},
                {Name: 'corgi' , src: 'Assets/2.jpeg'},
                {Name: 'golden' , src: 'Assets/3.webp'},
                {Name: 'golden' , src: 'Assets/3.webp'},
                {Name: 'husky' , src: 'Assets/4.webp'},
                {Name: 'husky' , src: 'Assets/4.webp'},
                {Name: 'pom' , src: 'Assets/5.jpeg'},
                {Name: 'pom' , src: 'Assets/5.jpeg'},
                {Name: 'shiba' , src: 'Assets/6.webp'},
                {Name: 'shiba' , src: 'Assets/6.webp'},

            ] 

}

let cardCompare = [];


function renderCards(){
    const selectCardDiv = document.querySelector('.cards')
    selectCardDiv.textContent = '';

    for (let i = 0; i < game.cardShown.length; i++) {
        const cardArray = game.cardShown[i];
        const createCards = document.createElement('img');

        createCards.setAttribute('id',i);
        createCards.setAttribute('value',cardArray.Name);
        createCards.setAttribute('src','Assets/cardcover.webp');
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

// https://stackoverflow.com/questions/12885110/javascript-math-random
function randomCards()// set each card value to -1, 0 , 1 and then compare them 
{
    game.cardShown.sort(function(){
        return Math.round(Math.random() * 2) -1 
    })
    renderCards(game.cardShown);
}

function flipCard(){
    if(cardCompare.length >= 2){
        if(cardCompare[0] === cardCompare[1])
            {
                console.log('you found a match!')
            }
    }
    else
    {
        
        const value = this.getAttribute('id');
        const name = this.getAttribute('value');
        const cardValue = {name:name,id:value}
        this.setAttribute('src',game.cardShown[value].src);
        this.removeEventListener('click',flipCard);
        cardCompare.push(cardValue);
        
    }
    
        if(cardCompare.length >= 2)
        {
            if(cardCompare[0].name === cardCompare[1].name)
            {

                console.log('you found a match!')
                //disappear MVC = delete element or delete object and render
                id1 = String(cardCompare[0].id);
                id2 = String(cardCompare[1].id);
                cardName = cardCompare[0].name;

                game.player.points += 1;
                renderDisplay();

                setTimeout(function(){
                    
                    // const selectDiv1 = document.getElementById(id1);
                    // const selectDiv2 = document.getElementById(id2);
                    // selectDiv1.style.display = 'none';
                    // selectDiv2.style.display = 'none';
                    // game.cardShown[id1].src = '';
                    // game.cardShown[id2].src = '';
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
                    game.cardShown = game.cardShown.filter(function(card){
                        return card.Name !== cardName;
                    })
                    renderCards(game.cardShown);
                    cardCompare = [];
                },1000)
                
            }
            else
            {  
                
                id1 = String(cardCompare[0].id);
                id2 = String(cardCompare[1].id);
                setTimeout(function(){
                    // let selectDiv1 = document.getElementById(id1);
                    // let selectDiv2 = document.getElementById(id2);
                    // selectDiv1.setAttribute('src','Assets/cardcover.webp');
                    // selectDiv2.setAttribute('src','Assets/cardcover.webp');
                    // selectDiv1.addEventListener('click',flipCard);
                    // selectDiv2.addEventListener('click',flipCard);
                    
                    renderCards(game.cardShown);
                    cardCompare = [];
                },1000)
                
                
            }
            
        }
    
}
    
function countdown(seconds) {
   
    let interval =  setInterval(function() {
         console.log('COUNT: ' + seconds);
         game.timer = seconds;
         renderDisplay();
         seconds--;
        
         
         if(seconds < 0)
         {
             clearInterval(interval);
         }
     }, 1000);
     
   }
 
  function main(){
    countdown(game.timer);
    renderDisplay();
    randomCards();
    
  }


main();

