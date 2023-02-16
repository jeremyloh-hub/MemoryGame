const game = { 
    player: {
        lifepoints: 0,
        points:     0,
        highscore:  0,
        abilities:  {remove1Pair: false, revealAll: false, addLp: false, addTime: false}
    },
    timer:          0,
    cards: ['/Assets/blackpom.jpeg',
            '/Assets/blackpom.jpeg',
            '/Assets/corgi.jpeg',
            '/Assets/corgi.jpeg',
            '/Assets/goldenretriever.webp',
            '/Assets/goldenretriever.webp',
            'Assets/husky.webp',
            'Assets/husky.webp',
            '/Assets/pom.jpeg',
            '/Assets/pom.jpeg',
            '/Assets/shiba.webp',
            '/Assets/shiba.webp'],
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