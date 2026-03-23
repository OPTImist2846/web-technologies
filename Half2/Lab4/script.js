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

function task5() {
    console.log("\n=== Завдання 5 ===");
    let numbers = [1, 2, 3, 4, 5, 6];

    let squares = numbers.map(num => num * num);
    console.log("1. Квадрати чисел:", squares);

    let evens = numbers.filter(num => num % 2 === 0);
    console.log("2. Парні числа:", evens);

    let sum = numbers.reduce((total, current) => total + current, 0);
    console.log("3. Сума всіх елементів:", sum);

    let moreNumbers = [7, 8, 9, 10, 11];
    let combinedArray = numbers.concat(moreNumbers);
    console.log("4. Об'єднаний масив:", combinedArray);

    combinedArray.splice(0, 3);
    console.log("5. Масив після видалення перших 3 елементів:", combinedArray);
}

function task6() {
    console.log("\n=== Завдання 6 ===");
    
    function libraryManagement() {
        // 1. Початковий масив
        let library = [
            { title: "Кобзар", author: "Тарас Шевченко", genre: "Поезія", pages: 700, isAvailable: true },
            { title: "Тіні", author: "Стівен Кінг", genre: "Жахи", pages: 400, isAvailable: false }
        ];

        // 2. Додавання книги
        function addBook(title, author, genre, pages) {
            library.push({ title, author, genre, pages, isAvailable: true });
        }

        // 3. Видалення за назвою
        function removeBook(title) {
            library = library.filter(book => book.title !== title);
        }

        // 4. Пошук за автором
        function findBooksByAuthor(author) {
            return library.filter(book => book.author === author);
        }

        // 5. Позначення як взятої/повернутої (isBorrowed = true означає що книгу взяли)
        function toggleBookAvailability(title, isBorrowed) {
            let book = library.find(b => b.title === title);
            if (book) {
                book.isAvailable = !isBorrowed; 
            }
        }

        function sortBooksByPages() {
            library.sort((a, b) => a.pages - b.pages);
        }

        function getBooksStatistics() {
            let total = library.length;
            let available = library.filter(b => b.isAvailable).length;
            let borrowed = total - available;
            let totalPages = library.reduce((sum, b) => sum + b.pages, 0);
            let avgPages = total === 0 ? 0 : Math.round(totalPages / total);

            return { загально: total, доступно: available, взято: borrowed, середняКількістьСторінок: avgPages };
        }

        addBook("1984", "Джордж Оруелл", "Антиутопія", 328);
        toggleBookAvailability("Кобзар", true);
        sortBooksByPages();
        
        console.log("Знайдено книги Оруелла:", findBooksByAuthor("Джордж Оруелл"));
        console.log("Статистика:", getBooksStatistics());
        console.log("Повний стан бібліотеки:", library);
    }
    
    libraryManagement();
}

function task7() {
    console.log("\n=== Завдання 7 ===");
    let student = {
        name: "Євген",
        age: 21,
        course: 3
    };
    
    student.subjects = ["Математика", "Програмування", "Бази даних"];
    
    delete student.age;
    
    console.log("4. Оновлений об'єкт студента:", student);
}