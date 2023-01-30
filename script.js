if(!localStorage.getItem('first-game')){
    localStorage.setItem('first-game', true)
    localStorage.setItem('p1-color', '#0000ff')
    localStorage.setItem('p2-color', '#ff0000')
}

let playerColorConfigs = [document.getElementById('p1-color'), document.getElementById('p2-color')]



let isModalOpen = false
let isPlayer1 = true

let playerColors = [ localStorage.getItem('p1-color'), localStorage.getItem('p2-color')]

let hashes = [false, false, false, false, false, false, false, false, false]
let hashesValues = [0,0,0,0,0,0,0,0,0]
let playerPoints = [0, 0]

playerColorConfigs[0].value = playerColors[0]
playerColorConfigs[1].value = playerColors[1]

let players =[ document.getElementById('player-1-points'), document.getElementById('player-2-points')]


const modal = document.getElementById("modal")
const configModal = document.getElementById('config')
const playerRound = document.getElementById('player-round')
const winnerPlayer = document.getElementById('winner-player')

playerRound.innerText = " 1"
playerRound.style.color = playerColors[0];

function toggleConfig(){
    configModal.classList.toggle('modal-open')
}

function setColors(){
    localStorage.setItem('p1-color',  playerColorConfigs[0].value )
    localStorage.setItem('p2-color',  playerColorConfigs[1].value )
    playerColors = [ localStorage.getItem('p1-color'), localStorage.getItem('p2-color')]
    toggleConfig();
}

function toggleModal(){
   modal.classList.toggle('modal-open')
}

function resetPoints(){
    playerPoints = [0, 0]
    players.forEach((player)=>{
        player.innerText = 0
    })
    resetGame();
}

function resetGame(){
    let game = document.getElementById('game-spaces')
    game.replaceChildren()
    
    for(let i = 0; i < 9; i++) {
        let li = document.createElement('li')
        let button = document.createElement('button')
        button.setAttribute('id', i)
        button.setAttribute('class', 'hash-space')
        button.setAttribute('onclick', 'setSpace(event)')
        li.appendChild(button)
        game.appendChild(li)
    }

    hashes = [false, false, false, false, false, false, false, false, false]
    hashesValues = [0,0,0,0,0,0,0,0,0]
    isPlayer1 = true

    playerRound.innerText = " 1"
    playerRound.style.color = playerColors[0];

    if(isModalOpen){
        isModalOpen = false
        toggleModal();
    }
    //<li><button id="0" onclick="setSpace(event)" class="hash-space"></button></li>

}

function setSpace(event){
    event.preventDefault()

    if(!hashes[event.target.id]){
        event.target.disabled = true;
        if(isPlayer1){
            event.target.innerHTML = symbols.circle(playerColors[0]);
            hashesValues[event.target.id] = 1
            isPlayer1 = false;
            playerRound.innerText = " 2"
            playerRound.style.color = playerColors[1];
        }else{
            event.target.innerHTML = symbols.cross(playerColors[1]);
            hashesValues[event.target.id] = 2
            isPlayer1 = true;
            playerRound.innerText = " 1"
            playerRound.style.color = playerColors[0];
        }

        hashes[event.target.id] = true;
    }

    const winner = verifyWinner();
    
    console.log(winner)

    if (winner != 0){
        if(winner == 3){
            winnerPlayer.innerText = 'Empate'
            isModalOpen = true;
            toggleModal()
        }else{
            winnerPlayer.innerText =  `O jogador ${winner} é o vencedor`
            playerPoints[winner-1]++;
            players[winner-1].innerText = playerPoints[winner-1]
            isModalOpen = true;
            toggleModal()
        }
       
    }
    
}

function verifyWinner(){

    let playersPoints = [[],[]]
    let counter = 0;
    let winner = 0;

    let victoryPoints = {
        h:[
            [0,1,2],
            [3,4,5],
            [6,7,8]
        ],
        v:[
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ],
        d:[
            [0,4,8],
            [2,4,6]
        ]
    }

    hashesValues.forEach((value,index)=>{
        if(value === 1){
            playersPoints[0].push(index)
        }else if(value === 2){
            playersPoints[1].push(index)
        }
    });

    playersPoints.forEach((_player,index)=>{

        victoryPoints.h.forEach((item)=>{
            item.forEach((point)=>{
                if(playersPoints[index].includes(point)){
                    counter++;
                }
            })
            if(counter === 3){
                winner = index+1
            }else{
                counter = 0
            }
        })
    
        victoryPoints.v.forEach((item)=>{
            item.forEach((point)=>{
                if(playersPoints[index].includes(point)){
                    counter++;
                }
            })
            if(counter === 3){
                winner = index+1
            }else{
                counter = 0
            }
        })
    
        victoryPoints.d.forEach((item)=>{
            item.forEach((point)=>{
                if(playersPoints[index].includes(point)){
                    counter++;
                }
            })
            if(counter === 3){
                winner = index+1
            }else{
                counter = 0
            }
        })

       let drawn = 0

       hashes.forEach((hash)=>{
        if(hash){
            drawn++;
        }
       })

       console.log(drawn)

       if(drawn == 9 && winner == 0){
        winner = 3
       }

    })

    
    return winner;
    
}