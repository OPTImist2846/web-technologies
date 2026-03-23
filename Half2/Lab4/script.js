function task1() {
    console.log("=== Завдання 1 ===");
    let fruits = ["яблуко", "банан", "груша", "ківі"];

    fruits.pop();
    console.log("1. Оновлений масив (без останнього):", fruits);
    
    fruits.unshift("ананас");
    console.log("2. Додано 'ананас':", fruits);
    
    let sortedFruits = [...fruits].sort().reverse(); 
    console.log("3. Зворотний алфавітний порядок:", sortedFruits);
    
    let index = fruits.indexOf("яблуко");
    console.log("4. Індекс 'яблуко':", index);
    }