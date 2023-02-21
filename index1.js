function flipCard(){
    if(cardCompare.length >= 2 && cardCompare[0].name === cardCompare[1].name){// first check before adding for comparison
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
        const value = this.getAttribute('id');
        const name = this.getAttribute('value');

        const cardValue = {name:name,id:value}
        this.setAttribute('src',game.cardShown[value].src);
        this.removeEventListener('click',flipCard);

        cardCompare.push(cardValue);
    }
    
    if(cardCompare.length >= 2 && cardCompare[0].name === cardCompare[1].name){ //second check because after second card is added need to do comparison
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

    else if(cardCompare.length >= 2){// if 2 matching card doesn't match

        setTimeout(function(){

            renderCards();
            renderDisableOrEnableCard();
            cardCompare = [];
            game.player.lifepoints -= 1;
            renderDisplay();

        },1000)
    }

}