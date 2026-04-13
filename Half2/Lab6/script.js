'use strict';


let state = {
    products: [],
    filter: 'all',
    sort: 'none'
};

// Чисті функції
const generateId = () => 'id-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
const getCurrentTime = () => new Date().getTime();

const addProductToState = (products, productData) => [
    ...products, 
    { ...productData, id: generateId(), createdAt: getCurrentTime(), updatedAt: getCurrentTime() }
];

const updateProductInState = (products, id, productData) => 
    products.map(p => p.id === id ? { ...p, ...productData, updatedAt: getCurrentTime() } : p);

const deleteProductFromState = (products, id) => 
    products.filter(p => p.id !== id);

const calculateTotal = (products) => 
    products.reduce((sum, p) => sum + Number(p.price), 0);

const getFilteredAndSortedProducts = (products, filterCategory, sortType) => {
    let result = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory);
    
    result = [...result];
    switch(sortType) {
        case 'price': return result.sort((a, b) => a.price - b.price);
        case 'created': return result.sort((a, b) => b.createdAt - a.createdAt);
        case 'updated': return result.sort((a, b) => b.updatedAt - a.updatedAt);
        default: return result;
    }
};

// Дум
const DOM = {
    productList: document.getElementById('productList'),
    emptyState: document.getElementById('emptyState'),
    totalPriceVal: document.getElementById('totalPriceVal'),
    modal: document.getElementById('productModal'),
    form: document.getElementById('productForm'),
    modalTitle: document.getElementById('modalTitle'),
    snackbar: document.getElementById('snackbar'),
    
    id: document.getElementById('productId'),
    name: document.getElementById('productName'),
    price: document.getElementById('productPrice'),
    category: document.getElementById('productCategory'),
    image: document.getElementById('productImage'),
};

let snackbarTimer;
const showSnackbar = (message) => {
    DOM.snackbar.textContent = message;
    DOM.snackbar.classList.add('show');
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(() => DOM.snackbar.classList.remove('show'), 3000);
};

const toggleModal = (show, isEdit = false) => {
    if (show) {
        DOM.modalTitle.textContent = isEdit ? 'Редагувати товар' : 'Додати товар';
        DOM.modal.classList.remove('hidden');
    } else {
        DOM.modal.classList.add('hidden');
        DOM.form.reset();
        DOM.id.value = '';
    }
};

const formatPrice = (price) => Number(price).toFixed(2) + ' грн';

// Фунуція для того що міняється
const render = () => {
    const displayProducts = getFilteredAndSortedProducts(state.products, state.filter, state.sort);
    
  
    DOM.totalPriceVal.textContent = formatPrice(calculateTotal(displayProducts));


    if (displayProducts.length === 0) {
        DOM.emptyState.classList.remove('hidden');
        DOM.productList.innerHTML = '';
        return;
    }
    
    DOM.emptyState.classList.add('hidden');
    DOM.productList.innerHTML = '';

    displayProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card entering';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-id">ID: ${product.id}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-actions">
                    <button class="btn btn-primary edit-btn" data-id="${product.id}">Редагувати</button>
                    <button class="btn btn-danger delete-btn" data-id="${product.id}">Видалити</button>
                </div>
            </div>
        `;
        DOM.productList.appendChild(card);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => handleDelete(e.target.dataset.id, e.target.closest('.product-card')));
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => handleEditClick(e.target.dataset.id));
    });
};


const handleDelete = (id, cardElement) => {
    const product = state.products.find(p => p.id === id);
    if (!product) return;

    cardElement.classList.remove('entering');
    cardElement.classList.add('leaving');
    
    setTimeout(() => {
        state.products = deleteProductFromState(state.products, id);
        render();
        showSnackbar(`Товар "${product.name}" успішно видалено!`);
    }, 400);
};

const handleEditClick = (id) => {
    const product = state.products.find(p => p.id === id);
    if (!product) return;
    
    DOM.id.value = product.id;
    DOM.name.value = product.name;
    DOM.price.value = product.price;
    DOM.category.value = product.category;
    DOM.image.value = product.image;
    
    toggleModal(true, true);
};

// Зчитувачі івентів
DOM.form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productData = {
        name: DOM.name.value,
        price: Number(DOM.price.value),
        category: DOM.category.value,
        image: DOM.image.value
    };
    
    const editingId = DOM.id.value;

    if (editingId) {
        state.products = updateProductInState(state.products, editingId, productData);
        showSnackbar(`Товар [ID: ${editingId}] "${productData.name}" успішно оновлено!`);
    } else {
        state.products = addProductToState(state.products, productData);
        showSnackbar(`Товар "${productData.name}" успішно додано!`);
    }
    
    toggleModal(false);
    render();
});

document.getElementById('addBtn').addEventListener('click', () => toggleModal(true, false));
document.getElementById('closeModalBtn').addEventListener('click', () => toggleModal(false));
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.filter = e.target.dataset.filter;
        render();
    });
});

document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.sort = e.target.dataset.sort;
        render();
    });
});

render();