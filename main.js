const game = { 
    player: {
        lifepoints: 10,
        points:     2,
        highscore:  0,
        abilities:  {remove1Pair: false, revealAll: false, addLp: false, addTime: false}
    },
    timer:          120,
    cardShown: ['Assets/1.jpeg',
                'Assets/1.jpeg',
                'Assets/2.jpeg',
                'Assets/2.jpeg',
                'Assets/3.webp',
                'Assets/3.webp',
                'Assets/4.webp',
                'Assets/4.webp',
                'Assets/5.jpeg',
                'Assets/5.jpeg',
                'Assets/6.webp',
                'Assets/6.webp'],

    cards:     ['Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp',
                'Assets/cardcover.webp']

}


function renderCards(card){
    const selectCardDiv = document.querySelector('.cards')
    selectCardDiv.textContent = '';

    for (let i = 0; i < card.length; i++) {
        const cardArray = card[i];
        const createCards = document.createElement('img');

        createCards.setAttribute('id',i);
        createCards.setAttribute('src',cardArray);
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



renderDisplay();
renderCards(game.cards);