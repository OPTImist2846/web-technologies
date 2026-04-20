'use strict';

const DOM = {
    gunman: document.getElementById('gunman'),
    messageBox: document.getElementById('message-box'),
    scoreDisplay: document.getElementById('score-display'),
    roundDisplay: document.getElementById('round-display'),
    resultScreen: document.getElementById('result-screen'),
    resultTitle: document.getElementById('result-title'),
    resultText: document.getElementById('result-text'),
    startBtn: document.getElementById('start-btn'),
};

let score = 0;
let round = 1;
let currentStatus = 'menu'; 
let enemyTimer = null;      
let reactionTime = 1500;    

const audio = {
    intro: new Audio('intro.m4a'),
    shot: new Audio('shot.m4a'),
    win: new Audio('win.m4a'),
    death: new Audio('death.m4a'),
    fire: new Audio('fire.m4a')
};

function startRound() {
    DOM.resultScreen.classList.add('hidden');
    DOM.messageBox.classList.add('hidden');
    DOM.messageBox.innerText = "FIRE!!!";
    
    currentStatus = 'walking';
    DOM.gunman.className = 'walking';
    
    audio.intro.currentTime = 0;
    audio.intro.play().catch(e => console.log("Sound error:", e));

    setTimeout(() => {
        if (currentStatus !== 'walking') return;
        
        DOM.gunman.className = 'idle';
        currentStatus = 'waiting';

        const randomWait = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(triggerFire, randomWait);
    }, 1500);
}

function triggerFire() {
    if (currentStatus !== 'waiting') return;

    currentStatus = 'fire';
    DOM.messageBox.classList.remove('hidden');
    DOM.gunman.className = 'shooting'; 

    enemyTimer = setTimeout(enemyShoots, reactionTime);
}

function playerShoots() {
    if (currentStatus === 'walking' || currentStatus === 'waiting') {
        audio.intro.pause();
        processGameOver("FOUL!\nЗарано вихопив зброю!");
    } 
    else if (currentStatus === 'fire') {
        clearTimeout(enemyTimer);
        currentStatus = 'over';
        
        audio.intro.pause(); 
        audio.shot.play();   
        
        DOM.gunman.className = 'dead'; 

        score += 500;
        round++;
        reactionTime = Math.max(400, reactionTime - 150); 
        
        setTimeout(() => {
            audio.win.play();
            updateHUD();
            showResult("YOU WON!", "Швидкий постріл!");
        }, 1000);
    }
}

function enemyShoots() {
    if (currentStatus !== 'fire') return;

    currentStatus = 'over';
    audio.intro.pause(); 
    audio.shot.play();   
    
    setTimeout(() => {
        audio.death.play(); 
        processGameOver("YOU DIED!");
    }, 500);
}

function processGameOver(message) {
    currentStatus = 'over';
    clearTimeout(enemyTimer);
    score = 0;
    round = 1;
    reactionTime = 1500;
    updateHUD();
    showResult("GAME OVER", message);
}

function updateHUD() {
    DOM.scoreDisplay.innerText = `REWARD: $${score}`;
    DOM.roundDisplay.innerText = `ROUND: ${round}`;
}

function showResult(title, text) {
    DOM.resultTitle.innerText = title;
    DOM.resultText.innerText = text;
    DOM.startBtn.innerText = title === "YOU WON!" ? "NEXT ROUND" : "RESTART";
    DOM.resultScreen.classList.remove('hidden');
}

function triggerFire() {
    if (currentStatus !== 'waiting') return;

    currentStatus = 'fire';

    audio.intro.pause();
    audio.fire.currentTime = 0;
    audio.fire.play().catch(e => console.log("Помилка звуку Fire:", e));

    DOM.messageBox.classList.remove('hidden');
    DOM.gunman.className = 'shooting'; 

    enemyTimer = setTimeout(enemyShoots, reactionTime);
}

DOM.startBtn.addEventListener('click', startRound);
DOM.gunman.addEventListener('click', playerShoots);