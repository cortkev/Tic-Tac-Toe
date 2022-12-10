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
    moveNum = 0;
    let modal = document.getElementById("myModal");
    let modalText = document.querySelector(".modal-text");
    let player1Turn = document.querySelector("#player1");
    let player2Turn = document.querySelector("#player2");


    player1Turn.innerHTML = player1.name;
    player2Turn.innerHTML = player2.name;

    console.log(currentPlayer);
    player1Turn.style.color = 'blue';

    

    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    let restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", reset);
    function reset(){
        Gameboard.gameBoard = [];
        // for (i = 0; i < 9; i++){
        //     Gameboard.gameBoard.push('');
        // }
        modal.style.display = "none";
        box.forEach((box, index) => {
            box.innerHTML = '';
            Gameboard.gameBoard.push('');
        });
        currentPlayer = player1;
        console.log(Gameboard.gameBoard);
        moveNum = 0;
        gameOver = false;
        player1Turn.style.color = 'blue';
        player2Turn.style.color = 'white';
    }

    

    const winner = () => {
        win.forEach((item, index) => {
            if(Gameboard.gameBoard[item[0]] === currentPlayer.mark && 
                Gameboard.gameBoard[item[1]] === currentPlayer.mark && 
                Gameboard.gameBoard[item[2]] === currentPlayer.mark){
                    //show winner
                    modal.style.display = "block";
                    modalText.innerHTML = currentPlayer.name + " Wins!";
                    gameOver = true;
                    
                }
            else if(moveNum === 9){
                modal.style.display = "block";
                modalText.innerHTML = "Tie Game!";
                gameOver = true;
            }
        })
    }

    

    // player1Turn.style.color = 'blue';
    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        if(currentPlayer.name === player1.name){
            player1Turn.style.color = 'blue';
            player2Turn.style.color = 'white';
        }
        else{
            player2Turn.style.color = 'blue';
            player1Turn.style.color = 'white';
        }
    }

    const move = (index) => {
        if(Gameboard.gameBoard[index] === '' && gameOver === false){
            Gameboard.gameBoard[index] = currentPlayer.mark;
            console.log(Gameboard.gameBoard);
            box[index].innerHTML = currentPlayer.mark;
            moveNum++;
            winner();         
            switchPlayer();
            console.log(currentPlayer);
            
            
        }
        
    }
    box.forEach((box, index) => {
        box.addEventListener('click', ()=>move(index))
    });
     return {
        player1,
        player2,
        currentPlayer,
        reset
     }

})();

//gamer.reset();