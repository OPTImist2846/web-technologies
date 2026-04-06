function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('clock').innerHTML = 
        `${hours}<span class="blink">:</span>${minutes}<span class="blink">:</span>${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);


let countdownInterval;

document.getElementById('startTimerBtn').addEventListener('click', function() {
    const targetInput = document.getElementById('targetTimer').value;
    const display = document.getElementById('timerDisplay');

    if (!targetInput) {
        display.textContent = "Будь ласка, оберіть дату та час!";
        return;
    }

    const targetDate = new Date(targetInput).getTime();

    clearInterval(countdownInterval);

    countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            display.textContent = "Час вийшов!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        display.textContent = `Залишилося: ${days}д ${hours}г ${minutes}хв ${seconds}с`;
    }, 1000);
});


let bdayInterval;

document.getElementById('startBdayBtn').addEventListener('click', function() {
    const bdayInput = document.getElementById('bdayInput').value;
    const display = document.getElementById('bdayDisplay');

    if (!bdayInput) {
        display.textContent = "Будь ласка, оберіть дату!";
        return;
    }

    const bdayDate = new Date(bdayInput);
    const bMonth = bdayDate.getMonth();
    const bDay = bdayDate.getDate();

    clearInterval(bdayInterval);

    bdayInterval = setInterval(function() {
        const now = new Date();
        
        let nextBday = new Date(now.getFullYear(), bMonth, bDay);
        
        if (now.getTime() > nextBday.getTime()) {
            nextBday.setFullYear(now.getFullYear() + 1);
        }

        const distance = nextBday.getTime() - now.getTime();

        const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        
        const months = Math.floor(totalDays / 30.44); 
        const days = Math.floor(totalDays % 30.44);
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        display.textContent = `До свята: ${months} міс, ${days} дн, ${hours} год, ${minutes} хв, ${seconds} сек`;
    }, 1000);
});