# Developing MemoryGame (Match Pup)

## Project Brief

MVP - Minimum Viable Product

1. Built with Javascript , HTML & CSS
2. Screenshots of the actual game
3. Description of the game
4. Include link of the deployed game
5. Frequent commnit
6. The code for the working game that is built by me

## Link for the Game

https://jeremyloh-hub.github.io/MemoryGame/

## Screenshots of the Game

![StartScreen](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/startscreen.png?raw=true)
![GameScreen](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/gamescreen.png?raw=true)
![SelectCard](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/selectcard.png?raw=true)
![GameOver](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/gameover.png?raw=true)

## Technologies & Tools Used

1. Javascript
2. CSS
3. HTML
4. VSCode

## Description

The memory game is a card game played with a sets of card being facedown and each picture will appear on two cards. The game starts with all the cards facedown and the player have to turn over two cards. If the two cards matches , then they get to keep the cards as points , otherwise they have to turn the cards face down again. You can win by matching all the cards!

## Wireframe/Storyboard

![Wireframe](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/wireframe.png?raw=true)

## Timeline for the Project

5 Working Days

## Planning & Development

1. Model for the Game
2. Render all the cards in the array
3. Render Display (timer, points , lifepoints)
4. Flip card
5. Matching card Logic
6. Winning & Losing condition
7. Implement difficulty
8. Add abilities
9. Styling

## Codes

### Model

![Model](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/model.png?raw=true)

The model stores all data i need for the game such as the game state , timer & abilities . It acts as a database of information that can be updated.

### View

![View](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/view.png?raw=true)

The view present the latest data given by the model , however it does not contain any logic.

### Controller

![Controller](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/controller.png?raw=true)

The controller is the one that has all logic and uses model to update its data and uses the view to present the data they want to show to the page.

### Favourite Function

![Favourite](https://github.com/jeremyloh-hub/MemoryGame/blob/main/Notes/favourite.png?raw=true)

The reason why this is my favourite function is because it contains all the winning and losing conditions all in this function and it function as a timer as well. First it will check if the time reaches 0 if it does it will pass the result false to the model meaning that i have lost the game. Secondly it will check if all the cards has been correctly match if it does it will pass the result true which means i have won the game. Lastly it will check if the player lifepoints has gone down to 0 , if it does it will pass the result false to the model.

## Future Development

1. Modify the code to be more efficient and clean
2. More Abilities
3. Leaderboard
4. Pause Screen
5. Sound Effects
6. Animation

## Summary

In summary i have learnt a lot while working on this project as this is the very first project i have done in Javascript and using the MVC approach it has led to me thinking about how to structure the model and i have modified the model a couple times while working on the project due to the project requiring mutiple levels for the game. And one other important key take away is learning how to write better and clean code & how to deconstruct my codes. Ultimately the code is not only for me to read, it is important that others can understand your code as well.

## References

Picture Assets are from the link below

1. https://pixabay.com
2. https://www.pexels.com
