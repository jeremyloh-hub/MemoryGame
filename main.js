const game = { 
    player: {
        lifepoints: 0,
        points:     0,
        highscore:  0,
        abilities:  {remove1Pair: false, revealAll: false, addLp: false, addTime: false}
    },
    timer:          0,
    cards: ['/Assets/1.jpeg',
            '/Assets/1.jpeg',
            '/Assets/2.jpeg',
            '/Assets/2.jpeg',
            '/Assets/3.webp',
            '/Assets/3.webp',
            'Assets/4.webp',
            'Assets/4.webp',
            '/Assets/5.jpeg',
            '/Assets/5.jpeg',
            '/Assets/6.webp',
            '/Assets/6.webp'],
}


function renderCards(){
    const selectCardDiv = document.querySelector('.cards')
    selectCardDiv.textContent = '';

    for (let i = 0; i < game.cards.length; i++) {
        const cardArray = game.cards[i];
        const createCards = document.createElement('img');

        createCards.setAttribute('id',i);
        createCards.setAttribute('src',cardArray);
        selectCardDiv.appendChild(createCards);

    }

}

renderCards();