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

    function task2() {
    console.log("\n=== Завдання 2 ===");
    let colors = ["червоний", "жовтий", "синій", "зелений", "темно-синій"];
    
    let longest = colors.reduce((a, b) => a.length >= b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length <= b.length ? a : b);
    console.log(`2. Найдовший: ${longest}, Найкоротший: ${shortest}`);
    
    let blueColors = colors.filter(color => color.includes("синій"));
    console.log("3. Кольори зі словом 'синій':", blueColors);
    
    let joinedColors = blueColors.join(", ");
    console.log("4-5. Об'єднаний рядок:", joinedColors);
}