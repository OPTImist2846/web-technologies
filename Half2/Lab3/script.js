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