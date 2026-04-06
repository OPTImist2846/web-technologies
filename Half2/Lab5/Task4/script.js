const catalogMap = new Map(); 
const processedOrdersSet = new Set(); 
const historyWeakMap = new WeakMap(); 
const activeProductsWeakSet = new WeakSet(); 

let nextProductId = 1;


function addProduct(name, price, stock) {
    const product = { id: nextProductId++, name: name, price: price, stock: stock };
    
    catalogMap.set(product.id, product);
    
    activeProductsWeakSet.add(product);
    
    historyWeakMap.set(product, [`[Створено] Ціна: ${price} грн, На складі: ${stock} шт.`]);
    
    console.log(`[+] Додано: ${product.name} (ID: ${product.id})`);
    return product;
}


function removeProduct(id) {
    if (catalogMap.has(id)) {
        const product = catalogMap.get(id);
        catalogMap.delete(id); 
        console.log(`[-] Видалено продукт з ID: ${id} (${product.name})`);
    } else {
        console.error(`Помилка: Продукт з ID ${id} не знайдено!`);
    }
}


function updateProduct(id, newPrice, newStock) {
    if (catalogMap.has(id)) {
        const product = catalogMap.get(id);
        
        product.price = newPrice;
        product.stock = newStock;
        
        const history = historyWeakMap.get(product);
        history.push(`[Оновлено] Нова ціна: ${newPrice} грн, Залишок: ${newStock} шт.`);
        
        console.log(`[*] Оновлено: ${product.name}`);
    }
}



function searchProduct(name) {
    console.log(`\nПошук: "${name}"`);
    let found = false;
    
    for (let product of catalogMap.values()) {
        if (product.name.toLowerCase() === name.toLowerCase()) {
            console.log("Знайдено продукт:", product);
            
            const history = historyWeakMap.get(product);
            console.log("Історія продукту:", history);
            
            found = true;
            break;
        }
    }
    
    if (!found) console.log("Продукт не знайдено.");
}


function placeOrder(orderId, productId, quantity) {
    console.log(`\nОбробка замовлення №${orderId}`);
    
    if (processedOrdersSet.has(orderId)) {
        console.error(`Замовлення №${orderId} вже було оброблено раніше!`);
        return;
    }
    
    const product = catalogMap.get(productId);
    
    if (!product || !activeProductsWeakSet.has(product)) {
        console.error("Помилка: Продукт недоступний або не існує.");
        return;
    }
    
    if (product.stock >= quantity) {
        product.stock -= quantity;
        
        processedOrdersSet.add(orderId);
        
        const history = historyWeakMap.get(product);
        history.push(`[Продаж] Замовлення №${orderId}: продано ${quantity} шт. Залишок: ${product.stock} шт.`);
        
        console.log(`Успіх! Продано ${quantity} шт. товару "${product.name}". Залишок: ${product.stock}`);
    } else {
        console.error(`Відмова: Недостатньо товару "${product.name}". Потрібно: ${quantity}, є на складі: ${product.stock}`);
    }
}

document.getElementById('runStoreBtn').addEventListener('click', () => {
    console.clear();
    console.log("ВІДКРИТТЯ МАГАЗИНУ");
    
    //Додаємо 
    const p1 = addProduct("Ноутбук ASUS", 35000, 10);
    const p2 = addProduct("Мишка Logitech", 1500, 50);
    const p3 = addProduct("Клавіатура Keychron", 4200, 5);
    
    //Оновлюємо інформацію
    updateProduct(p1.id, 34000, 12);
    
    //Робимо замовлення
    placeOrder("ORD-001", p2.id, 2);
    placeOrder("ORD-002", p3.id, 6);
    placeOrder("ORD-001", p1.id, 1);
    
    //Шукаємо і дивимось його історію
    searchProduct("Ноутбук ASUS");
    searchProduct("Мишка logitech");
    
    //Видаляємо
    console.log("\nВидалення товару");
    removeProduct(p3.id);
    searchProduct("Клавіатура Keychron");
});