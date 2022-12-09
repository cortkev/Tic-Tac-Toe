//gameboard module
const Gameboard = (() => {
    //fill game array 
    let gameBoard = [];
    for (i = 0; i < 9; i++){
        gameBoard.push('');
    }
    //create game board
    let boxes = document.querySelector('.game-container')
    
    for(let i = 0; i < gameBoard.length; i++){
        const box = document.createElement('div');
        box.className = 'box';
        boxes.appendChild(box);
    }

    
    

    return {gameBoard};
})();

//player factory
const Player = (name, mark) => {
    return {
        name, 
        mark
    }
};

//game module
const Game = (() => {
    const player1 = Player('Kevin', 'X');
    const player2 = Player('Ivan', 'O');
    let currentPlayer = player1;
    let box = document.querySelectorAll(".box");
    let gameOver = false;


    const switchPlayer = () => 
        currentPlayer = currentPlayer === player1 ? player2 : player1;

    const move = (index) => {
        console.log(currentPlayer);
        if(Gameboard.gameBoard[index] === ''){
            Gameboard.gameBoard[index] = currentPlayer.mark;
            console.log(Gameboard.gameBoard);
            box[index].innerHTML = currentPlayer.mark;
            switchPlayer();
        }
        
    }
    box.forEach((box, index) => {
        box.addEventListener('click', ()=>move(index))
    });

    

     
     return {
        player1,
        player2,
        currentPlayer
    //     reset;
     }

})();
// const displayController = (() => {
// })();