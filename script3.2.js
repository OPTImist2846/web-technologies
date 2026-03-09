function getSeasonIf(month) {
  
    if (month >= 1 && month <= 12) {
        
        if (month === 12 || month <= 2) {
            return "Зима";
        } else if (month >= 3 && month <= 5) {
            return "Весна";
        } else if (month >= 6 && month <= 8) {
            return "Літо";
        } else {
            return "Осінь";
        }

    } else {
        return "Помилка: такого місяця не існує";
    }
}

function getSeasonTernary(month) {
    return (month === 12 || month === 1 || month === 2) ? "Зима" :
           (month >= 3 && month <= 5) ? "Весна" :
           (month >= 6 && month <= 8) ? "Літо" :
           (month >= 9 && month <= 11) ? "Осінь" : "Помилка";
}

function runTask6() {
    let myMonth = 2;
    console.log("Номер місяця:", myMonth);
    console.log("Результат (через IF):", getSeasonIf(myMonth));
    console.log("Результат (через ?):", getSeasonTernary(myMonth));
    console.log("");
}