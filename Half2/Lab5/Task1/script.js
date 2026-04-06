
const bulb = document.getElementById('bulb');
const toggleBtn = document.getElementById('toggleBtn');
const typeSelect = document.getElementById('bulbType');
const brightnessBtn = document.getElementById('brightnessBtn');

let inactivityTimer;


function toggleLight() {

    bulb.classList.toggle('on');


    if (bulb.classList.contains('on')) {
        toggleBtn.textContent = "Вимкнути";
    } else {
        toggleBtn.textContent = "Увімкнути";
    }
    
    resetTimer();
}
toggleBtn.addEventListener('click', toggleLight);



typeSelect.addEventListener('change', function() {
    const selectedType = typeSelect.value;
    const isOn = bulb.classList.contains('on');

    bulb.className = `bulb ${selectedType} ${isOn ? 'on' : ''}`;
    
    bulb.style.opacity = 1;
    
    resetTimer();
});



brightnessBtn.addEventListener('click', function() {
   
    if (!bulb.classList.contains('led')) {
        alert("Зміна яскравості доступна лише для світлодіодної (LED) лампочки!");
        return;
    }

    let brightness = prompt("Введіть рівень яскравості (від 10 до 100):", "100");


    if (brightness !== null && !isNaN(brightness) && brightness >= 10 && brightness <= 100) {

        bulb.style.opacity = brightness / 100;
    } else {
        alert("Будь ласка, введіть коректне число від 10 до 100.");
    }
    
    resetTimer();
});


function turnOffLight() {
    if (bulb.classList.contains('on')) {
        bulb.classList.remove('on');
        toggleBtn.textContent = "Увімкнути";
        console.log("Лампочку автоматично вимкнено через бездіяльність!");
    }
}

function resetTimer() {

    clearTimeout(inactivityTimer);
    

    inactivityTimer = setTimeout(turnOffLight, 15000);
}

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);

resetTimer();