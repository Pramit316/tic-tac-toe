const boxes = document.querySelectorAll('.cell');
const menu = document.querySelector('.start-box');
const turnName = document.querySelector('#turn-name');
const winDisplay = document.querySelector('.win-box');

console.log(turnName);

let turn = 'X';
const wins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
const A = [];
const B = [];
let aName = '';
let bName = '';

function clickedOnBox() {
    // console.log(this.textContent);
    if(this.textContent===""){

        if(turn === 'X') {
            A.push(Number(this.id));
            turnName.textContent = `${bName}'s Turn`;
            this.textContent = 'X';
            turn = '0';
            if(A.length >= 3 && winLogic(A, aName)) {
                console.log('A wins');
            }
            
        } else {
            B.push(Number(this.id));
            turnName.textContent = `${aName}'s Turn`;
            this.textContent = '0';
            turn = 'X';
            if(B.length >= 3 && winLogic(B, bName)) {
                console.log('B wins');
            }
        }
    }
}

function winLogic(player, name) {
    // console.log(player);
    // console.log('called');
    for(i=0; i< wins.length; i++){
        const [a,b,c] = wins[i];
        if(player.includes(a)  && player.includes(b) && player.includes(c)) {
            winScreen(name);
            return true;
        } 
    }

    return false;
}

function winScreen(name) {
    winDisplay.style.display = 'flex';
    winDisplay.innerHTML = `<h1>Winner!!!!!!!!</h1>
        <h2>${name} wins!!</h2>
        <button id="continue"> Press to Play a New Game </button>`;
    
    const continueBtn = document.querySelector('#continue');
    continueBtn.addEventListener('click', reset);
}


function reset() {

    winDisplay.style.display = 'none';
    boxes.forEach((box) => box.textContent="");
    A.length = 0;
    B.length = 0;

    turn = 'X';
    menu.style.display = 'flex';
}

boxes.forEach((box) => {
    box.textContent = "";
    box.addEventListener('click', clickedOnBox);
});

function initializer(e) {
    e.preventDefault();
    
    aName = document.querySelector('#p1-name').value;
    bName = document.querySelector('#p2-name').value;

    turnName.textContent = `${aName}'s Turn`;

    console.log(aName, bName);
    e.target.style.display = 'none';
}

menu.addEventListener('submit', initializer);