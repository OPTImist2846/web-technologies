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

const task5_IncrementNumbers = (numbersArray) => {
    let result = [];
    for (let num of numbersArray) {
        result.push(num + 1);
    }
    return result;
}

function task6_CheckTen(a, b) {
    if (a + b === 10 || Math.abs(a - b) === 10) {
        return true;
    } else {
        return false;
    }
}

console.log("РЕЗУЛЬТАТИ");
console.log("Завдання 1. Сума 10 чисел Фібоначчі:", task1_Fibonacci());
console.log("Завдання 2. Сума простих чисел від 1 до 1000:", task2_Primes());
let userDay = 4; 
console.log(`Завдання 3. День тижня для числа ${userDay}:`, task3_DayOfWeek(userDay));
let testStrings = ["Олесь", "JS", "Університет", "Код", "Програмування"];
console.log("Завдання 4. Рядки з непарною довжиною:", task4_OddLengthStrings(testStrings));
let testNumbers = [10, 25, -3, 99];
console.log("Завдання 5. Масив збільшений на 1:", task5_IncrementNumbers(testNumbers));
console.log("Завдання 6. a=15, b=5 (сума або різниця 10?):", task6_CheckTen(15, 5));
console.log("Завдання 6. a=3, b=4 (сума або різниця 10?):", task6_CheckTen(3, 4));