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

    const player1 = Player('', 'X');
    const player2 = Player('', 'O');
    let currentPlayer = player1;
    
    let box = document.querySelectorAll(".box");
    let gameOver = false;
    let moveNum = 0;
    let modal = document.getElementById("myModal");
    let nameModal = document.querySelector(".start-modal");
    let modalText = document.querySelector(".modal-text");
    let player1Turn = document.querySelector("#player1");
    let player2Turn = document.querySelector("#player2");

    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", start);
    function start(){

        //get players name from textbox and set them as the names
        let p1Textbox = document.querySelector("#p1-input");
        let p1Name = p1Textbox.value;
        player1.name = p1Name;

        let p2Textbox = document.querySelector("#p2-input");
        let p2Name = p2Textbox.value;
        player2.name = p2Name;

        //display names
        player1Turn.innerHTML = player1.name;
        player2Turn.innerHTML = player2.name;
        //hide modal
        nameModal.style.display = "none";
    }

    console.log(currentPlayer);
    player1Turn.style.color = 'blue';

    
    //possible winning patterns
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
        //reset board array
        Gameboard.gameBoard = [];
        modal.style.display = "none";
        //add empty string
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
        ///check if any players marks match winning patterns
        win.forEach((item, index) => {
            if(Gameboard.gameBoard[item[0]] === currentPlayer.mark && 
                Gameboard.gameBoard[item[1]] === currentPlayer.mark && 
                Gameboard.gameBoard[item[2]] === currentPlayer.mark){
                    //show winner
                    modal.style.display = "block";
                    modalText.innerHTML = currentPlayer.name + " Wins!";
                    gameOver = true;
                    
                }
            //tie game
            else if(moveNum === 9){
                modal.style.display = "block";
                modalText.innerHTML = "Tie Game!";
                gameOver = true;
            }
        })
    }

    

    //switch players after every turn
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
    //player move in gameboard
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
