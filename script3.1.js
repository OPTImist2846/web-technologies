function getGradeIf(score) {
    if (score >= 90) {
        return "відмінно";
    } else if (score >= 75) {
        return "добре";
    } else if (score >= 60) {
        return "задовільно";
    } else {
        return "незадовільно";
    }
}

function getGradeTernary(score) {
    return (score >= 90) ? "відмінно" :
           (score >= 75) ? "добре" :
           (score >= 60) ? "задовільно" : "незадовільно";
}

function runTask5() {    
    let myScore = 40;
    console.log("Бал студента:", myScore);
    console.log("Результат (через IF):", getGradeIf(myScore));
    console.log("Результат (через ?):", getGradeTernary(myScore));
    console.log("");
}