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