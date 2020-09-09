
const backgroundAudio = new Audio("background-music.mp3");
const clickAudio = new Audio("click.mp3");
const winnerAudio = new Audio("winner.mp3");
const messageWinner = document.getElementById("message-winner"); 
const blockClass = document.getElementById("blocks");
const block = ["none"];
for(let blockNumber = 1;blockNumber<10;blockNumber++){
    block[blockNumber-1] = "block-"+blockNumber;
}
let firstPlayerName = 'Player-1';
let secondPlayerName = 'Player-2';

let firstScore = 0;
let secondScore = 0;
const scorePost = function(){
document.getElementById("first-score").textContent = firstScore;
document.getElementById("second-score").textContent = secondScore;
}

let winBlock = [
    false,false,false,
    false,false,false,
    false,false,false
]
let winPlayer = [
    1,1,1,
    1,1,1,
    1,1,1
]
window.onclick = function(){
    backgroundAudio.play();
    backgroundAudio.volume = '0.2';
}


document.querySelector(".enter-name").addEventListener('click',function(){
    firstPlayerName = prompt("Enter first player name : ","Player-1");
    secondPlayerName = prompt("Enter second player name : ","Player-2");
    document.querySelector('.first-player').textContent = firstPlayerName+': ';
document.querySelector('.second-player').textContent = secondPlayerName+': ';
document.querySelector('.fp').textContent = firstPlayerName+': ';
document.querySelector('.sp').textContent = secondPlayerName+': ';
})





let currentPlay = true;
const ReloadFunction = ()=>{  
    
    currentPlay = true;  
    for(let bl = 0; bl<9;bl++){            
        let currentElement = document.getElementById(block[bl]);
            winBlock[bl] = false;
            winPlayer[bl] = 1;
            currentElement.style.background = "rgb(79, 83, 11)";
        }
        messageWinner.style.bottom = "-400px";
}


for(let blockNumber =0;blockNumber<9;blockNumber++){
    let currentElement = document.getElementById(block[blockNumber]);
          
            currentElement.addEventListener("click",()=>{ 
                clickAudio.volume = '1'; 
                clickAudio.play();  
                if(currentPlay == true && winBlock[blockNumber] ==false){                
                currentElement.style.background = "url('cross.png')";                 
                currentPlay = false;
                winPlayer[blockNumber] = 2; 
                             
                }else if(winBlock[blockNumber] == false){
                    currentElement.style.background = "url('circle.png')";                     
                    currentPlay = true;
                    winPlayer[blockNumber] = 3;
                }
                currentElement.style.backgroundSize = "cover"; 
                winBlock[blockNumber] = true;
                if(whoIsWinner() == "player-1"){
                    messageWinner.style.bottom = "0px";
                    messageWinner.innerHTML = "<img src='cross.png' height = '40px'>"+firstPlayerName+' Won';
                    winnerAudio.play();
                    firstScore++;
                    setTimeout(ReloadFunction,3000);
                   
                                    
                }else if(whoIsWinner() == "player-2"){
                    messageWinner.style.bottom = "0px";
                    messageWinner.innerHTML = "<img src='circle.png' height = '40px'> "+secondPlayerName+' Won';
                    winnerAudio.play();  
                    secondScore++;    
                    setTimeout(ReloadFunction,3000);              
                    
                }else if(whoIsWinner() == "draw"){
                    messageWinner.textContent = " WOHO Its a draw";
                    messageWinner.style.bottom = "0px";  
                    winnerAudio.play();
                    setTimeout(ReloadFunction,3000);
                                      
                }
                scorePost();
            })
}
const reload = document.querySelector(".reload")
reload.addEventListener("click",ReloadFunction);
console.log(block);




// const firstCircle = document.querySelector(".radio-circle-1");
// const secondCircle = document.querySelector(".radio-circle-2");
// const firstCross = document.querySelector(".radio-cross-1");
// const secondCross = document.querySelector(".radio-cross-2");

const whoIsWinner  = function(){
    let winner = "none";
    if(
     (winPlayer[0] == 2 && winPlayer[1] == 2 && winPlayer[2] == 2) ||
     (winPlayer[0] == 2 && winPlayer[4] == 2 && winPlayer[8] == 2) ||
     (winPlayer[0] == 2 && winPlayer[3] == 2 && winPlayer[6] == 2) ||
     (winPlayer[1] == 2 && winPlayer[4] == 2 && winPlayer[7] == 2) ||
     (winPlayer[2] == 2 && winPlayer[5] == 2 && winPlayer[8] == 2) ||
     (winPlayer[3] == 2 && winPlayer[4] == 2 && winPlayer[5] == 2) ||
     (winPlayer[6] == 2 && winPlayer[4] == 2 && winPlayer[2] == 2) ||
     (winPlayer[6] == 2 && winPlayer[7] == 2 && winPlayer[8] == 2) ){
        winner = "player-1";
    }else if(
        (winPlayer[0] == 3 && winPlayer[1] == 3 && winPlayer[2] == 3) ||
        (winPlayer[0] == 3 && winPlayer[4] == 3 && winPlayer[8] == 3) ||
        (winPlayer[0] == 3 && winPlayer[3] == 3 && winPlayer[6] == 3) ||
        (winPlayer[7] == 3 && winPlayer[4] == 3 && winPlayer[1] == 3) ||
        (winPlayer[2] == 3 && winPlayer[5] == 3 && winPlayer[8] == 3) ||
        (winPlayer[3] == 3 && winPlayer[4] == 3 && winPlayer[5] == 3) ||
        (winPlayer[6] == 3 && winPlayer[4] == 3 && winPlayer[2] == 3) ||
        (winPlayer[6] == 3 && winPlayer[7] == 3 && winPlayer[8] == 3)  
    ){
        winner = "player-2"
    }else if(
        (winPlayer[0] == 2 || winPlayer[0] == 3) &&
        (winPlayer[1] == 2 || winPlayer[1] == 3) &&
        (winPlayer[2] == 2 || winPlayer[2] == 3) &&
        (winPlayer[3] == 2 || winPlayer[3] == 3) &&
        (winPlayer[4] == 2 || winPlayer[4] == 3) &&
        (winPlayer[5] == 2 || winPlayer[5] == 3) &&
        (winPlayer[6] == 2 || winPlayer[6] == 3) &&
        (winPlayer[7] == 2 || winPlayer[7] == 3) &&
        (winPlayer[8] == 2 || winPlayer[8] == 3) 
    ){
        winner = "draw";
    }else{
        winner = "none";
    }  
    
return winner;
}