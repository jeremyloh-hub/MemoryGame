const game = { 
    player: {
        lifepoints: 10,
        points:     2,
        highscore:  0,
        abilities:  {remove1Pair: false, revealAll: false, addLp: false, addTime: false}
    },
    timer:          120,
    cardShown: [{Name: '1' , src: 'Assets/1.jpeg'},
                {Name: '1' , src: 'Assets/1.jpeg'},
                {Name: '2' , src: 'Assets/2.jpeg'},
                {Name: '2' , src: 'Assets/2.jpeg'},
                {Name: '3' , src: 'Assets/3.webp'},
                {Name: '3' , src: 'Assets/3.webp'},
                {Name: '4' , src: 'Assets/4.webp'},
                {Name: '4' , src: 'Assets/4.webp'},
                {Name: '5' , src: 'Assets/5.jpeg'},
                {Name: '5' , src: 'Assets/5.jpeg'},
                {Name: '6' , src: 'Assets/6.webp'},
                {Name: '6' , src: 'Assets/6.webp'},

            ] 

}

const cardCombination = [[0,1],[2,3],[4,5],[6,7],[8,9],[10,11]] // id or src


function renderCards(card){
    const selectCardDiv = document.querySelector('.cards')
    selectCardDiv.textContent = '';

    for (let i = 0; i < card.length; i++) {
        const cardArray = card[i];
        const createCards = document.createElement('img');

        createCards.setAttribute('value',cardArray.Name);
        createCards.setAttribute('src',cardArray.src);
        //createCards.addEventListener('click',flipCard);

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
function randomCards()// set each card value to -1 , 0 , 1 and then compare them 
{
    game.cardShown.sort(function(){
        return Math.round(Math.random() * 2) -1
    })
    renderCards(game.cardShown);
}

function flipCard(){
    
}




renderDisplay();
randomCards();
