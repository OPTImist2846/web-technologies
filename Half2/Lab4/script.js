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

function task3() {
    console.log("\n=== Завдання 3 ===");
    // 1. Створення масиву
    let employees = [
        { name: "Марія", age: 28, position: "дизайнер" },
        { name: "Андрій", age: 35, position: "розробник" },
        { name: "Віктор", age: 42, position: "менеджер" },
        { name: "Ірина", age: 25, position: "розробник" }
    ];
    
    employees.sort((a, b) => a.name.localeCompare(b.name));
    console.log("2. Відсортовано за іменами:", employees);
    
    let devs = employees.filter(emp => emp.position === "розробник");
    console.log("3. Тільки розробники:", devs);
    
    employees = employees.filter(emp => emp.age <= 40);
    console.log("4. Видалено працівників старше 40:", employees);

    employees.push({ name: "Олена", age: 30, position: "тестувальник" });
    console.log("5. Оновлений масив (додано Олену):", employees);
}

function task4() {
    console.log("\n=== Завдання 4 ===");
    let students = [
        { name: "Олексій", age: 20, course: 2 },
        { name: "Дарина", age: 22, course: 4 },
        { name: "Максим", age: 19, course: 1 },
        { name: "Софія", age: 21, course: 3 }
    ];
    
    students = students.filter(student => student.name !== "Олексій");

    students.push({ name: "Назар", age: 20, course: 2 });
    
    students.sort((a, b) => b.age - a.age);
    console.log("2-4. Відсортовано від старших до молодших (без Олексія, з Назаром):", students);

    let thirdCourseStudent = students.find(student => student.course === 3);
    console.log("5. Студент 3-го курсу:", thirdCourseStudent);
}