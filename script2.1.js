function checkRange(num, min, max) {
    if (num >= min && num <= max) {
        console.log("Число " + num + " знаходиться в діапазоні від " + min + " до " + max);
        return true;
    } else {
        console.log("Число " + num + " НЕ в діапазоні.");
        return false;
    }
}
// Тест
function runTask3() {

    checkRange(10, 5, 20);
    checkRange(3, 5, 20);
}