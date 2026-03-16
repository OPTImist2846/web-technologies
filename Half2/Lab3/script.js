function task1_Fibonacci() {
    let count = 0;
    let a = 0, b = 1;
    let sum = 0;

    while (count < 10) {
        sum += a;
        let nextNumber = a + b;
        a = b;
        b = nextNumber;
        count++;
    }
    return sum;
}

function task2_Primes() {
    let sum = 0;

    for (let i = 2; i <= 1000; i++) {
        let isPrime = true;
        
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) {
            sum += i;
        }
    }
    return sum;
}

function task3_DayOfWeek(dayNumber) {
    let dayName;

    switch (dayNumber) {
        case 1: dayName = "Понеділок"; break;
        case 2: dayName = "Вівторок"; break;
        case 3: dayName = "Середа"; break;
        case 4: dayName = "Четвер"; break;
        case 5: dayName = "П'ятниця"; break;
        case 6: dayName = "Субота"; break;
        case 7: dayName = "Неділя"; break;
        default: dayName = "Помилка! Введіть число від 1 до 7.";
    }
    return dayName;
}

function task4_OddLengthStrings(stringsArray) {
    let result = [];
    for (let str of stringsArray) {
        if (str.length % 2 !== 0) {
            result.push(str);
        }
    }
    return result;
}