function findMinMax(arr) {
    // Спочатку припускаємо, що перше число в масиві є і мінімумом, і максимумом
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        
        if (arr[i] > max) {
            max = arr[i];
        }

        if (arr[i] < min) {
            min = arr[i];
        }
    }

    console.log("Мінімальне:", min);
    console.log("Максимальне:", max);
    
    return { min: min, max: max };
}

let myNumbers = [15, 3, 22, 8, -5, 42];
findMinMax(myNumbers);