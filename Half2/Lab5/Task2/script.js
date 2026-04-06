const redLight = document.getElementById('redLight');
const yellowLight = document.getElementById('yellowLight');
const greenLight = document.getElementById('greenLight');
const statusText = document.getElementById('statusText');

let times = {
    red: 5000,
    yellow: 3000,
    green: 7000 
};

const sequence = ['RED', 'YELLOW', 'GREEN', 'FLASHING_YELLOW'];
let currentIndex = 0;

let currentTimeout;
let blinkInterval;

function turnOffAll() {
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');
}

function runTrafficLight() {
    clearTimeout(currentTimeout);
    clearInterval(blinkInterval);
    turnOffAll();

    let state = sequence[currentIndex];

    if (state === 'RED') {
        redLight.classList.add('active');
        statusText.textContent = "Червоний";
        statusText.style.color = "#ff3333";
        currentTimeout = setTimeout(nextState, times.red);
    } 
    else if (state === 'YELLOW') {
        yellowLight.classList.add('active');
        statusText.textContent = "Жовтий";
        statusText.style.color = "#ffcc00";
        currentTimeout = setTimeout(nextState, times.yellow);
    } 
    else if (state === 'GREEN') {
        greenLight.classList.add('active');
        statusText.textContent = "Зелений";
        statusText.style.color = "#33cc33";
        currentTimeout = setTimeout(nextState, times.green);
    } 
    else if (state === 'FLASHING_YELLOW') {
        statusText.textContent = "Миготливий жовтий";
        statusText.style.color = "#ffcc00";
        
        let blinkCount = 0;
        blinkInterval = setInterval(() => {
            yellowLight.classList.toggle('active');
            blinkCount++;
            
            if (blinkCount >= 6) {
                clearInterval(blinkInterval);
                nextState();
            }
        }, 500);
    }
}

function nextState() {
    currentIndex++;
    if (currentIndex >= sequence.length) {
        currentIndex = 0;
    }
    runTrafficLight();
}


document.getElementById('nextBtn').addEventListener('click', () => {

    clearInterval(blinkInterval); 
    nextState();
});


document.getElementById('setTimeBtn').addEventListener('click', () => {
    let newRed = prompt("Введіть тривалість червоного (в секундах):", times.red / 1000);
    let newYellow = prompt("Введіть тривалість жовтого (в секундах):", times.yellow / 1000);
    let newGreen = prompt("Введіть тривалість зеленого (в секундах):", times.green / 1000);

    if (newRed && !isNaN(newRed)) times.red = parseFloat(newRed) * 1000;
    if (newYellow && !isNaN(newYellow)) times.yellow = parseFloat(newYellow) * 1000;
    if (newGreen && !isNaN(newGreen)) times.green = parseFloat(newGreen) * 1000;

    alert("Час оновлено! Зміни будуть застосовані при переході на відповідний колір.");
});

runTrafficLight();