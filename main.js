const game = { 
    player: {
        lifepoints: 10,
        points:     2,
        highscore:  0,
        abilities:  {remove1Pair: false, revealAll: false, addLp: false, addTime: false}
    },
    timer:          120,
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


function renderCards(card){
    const selectCardDiv = document.querySelector('.cards')
    selectCardDiv.textContent = '';

    for (let i = 0; i < card.length; i++) {
        const cardArray = card[i];
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
function randomCards()// set each card value to -1 , 0 , 1 and then compare them 
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

        cardCompare.push(cardValue);
    }
    
        if(cardCompare.length >= 2)
        {
            if(cardCompare[0].name === cardCompare[1].name)
            {
                console.log('you found a match!')
                //disappear
            }
            else
            {   
                // const id1 = cardCompare[0].id
                // const id2 = cardCompare[1].id;
                // console.log(game.cardShown[id1]);
                // //game.cardShown[id1].src = 'Assets/cardcover.webp';
                // ///game.cardShown[id2].src = 'Assets/cardcover.webp';
                // console.log(game.cardShown[id1].src);
                // console.log(game.cardShown[id2].src);
                // cardCompare = [];
                // renderCards(game.cardShown);

                setTimeout(function(){
                    cardCompare = [];
                    renderCards(game.cardShown);
                },2000)
            }
            
        }
}






renderDisplay();
randomCards();
