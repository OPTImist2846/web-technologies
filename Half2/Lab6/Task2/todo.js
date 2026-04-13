'use strict';

let state = {
    tasks: [],
    sortBy: 'addedDesc'
};


const generateId = () => 'task-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
const getCurrentTime = () => new Date().getTime();

const addTaskToState = (tasks, text) => [
    ...tasks, 
    { id: generateId(), text: text, completed: false, createdAt: getCurrentTime(), updatedAt: getCurrentTime() }
];

const toggleTaskCompletion = (tasks, id) => 
    tasks.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: getCurrentTime() } : t);

const updateTaskText = (tasks, id, newText) => 
    tasks.map(t => t.id === id ? { ...t, text: newText, updatedAt: getCurrentTime() } : t);

const deleteTaskFromState = (tasks, id) => 
    tasks.filter(t => t.id !== id);

const getSortedTasks = (tasks, sortBy) => {
    const copy = [...tasks];
    switch(sortBy) {
        case 'addedDesc': return copy.sort((a, b) => b.createdAt - a.createdAt);
        case 'updated': return copy.sort((a, b) => b.updatedAt - a.updatedAt);
        case 'status': 
            // Спочатку невиконані, потім виконані. Якщо статус однаковий - за датою оновлення
            return copy.sort((a, b) => {
                if (a.completed === b.completed) return b.updatedAt - a.updatedAt;
                return a.completed ? 1 : -1;
            });
        default: return copy;
    }
};


const DOM = {
    form: document.getElementById('taskForm'),
    input: document.getElementById('taskInput'),
    list: document.getElementById('taskList'),
    emptyState: document.getElementById('emptyState'),
    snackbar: document.getElementById('snackbar')
};

let snackbarTimer;
const showSnackbar = (message) => {
    DOM.snackbar.textContent = message;
    DOM.snackbar.classList.add('show');
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(() => DOM.snackbar.classList.remove('show'), 3000);
};


let editingTaskId = null; 

const render = () => {
    const displayTasks = getSortedTasks(state.tasks, state.sortBy);
    
    if (displayTasks.length === 0) {
        DOM.emptyState.classList.remove('hidden');
        DOM.list.innerHTML = '';
        return;
    }
    
    DOM.emptyState.classList.add('hidden');
    DOM.list.innerHTML = '';

    displayTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item entering ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        const isEditing = task.id === editingTaskId;

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} ${isEditing ? 'disabled' : ''}>
                ${isEditing 
                    ? `<input type="text" class="task-edit-input" value="${task.text}">`
                    : `<span class="task-text">${task.text}</span>`
                }
            </div>
            <div class="task-actions">
                ${isEditing
                    ? `<button class="btn btn-success save-btn">Зберегти</button>`
                    : `<button class="btn btn-edit edit-btn">Редагувати</button>`
                }
                <button class="btn btn-danger delete-btn">Видалити</button>
            </div>
        `;
        DOM.list.appendChild(li);

        // Прив'язка подій
        const checkbox = li.querySelector('.task-checkbox');
        const deleteBtn = li.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => handleToggleComplete(task.id));
        deleteBtn.addEventListener('click', () => handleDelete(task.id, li));

        if (isEditing) {
            const saveBtn = li.querySelector('.save-btn');
            const editInput = li.querySelector('.task-edit-input');
            editInput.focus();
            
            saveBtn.addEventListener('click', () => handleSaveEdit(task.id, editInput.value));
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSaveEdit(task.id, editInput.value);
            });
        } else {
            const editBtn = li.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                editingTaskId = task.id;
                render();
            });
            li.querySelector('.task-text').addEventListener('click', () => handleToggleComplete(task.id));
        }
    });
};

DOM.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = DOM.input.value.trim();
    if (text) {
        state.tasks = addTaskToState(state.tasks, text);
        DOM.form.reset();
        showSnackbar('Завдання додано!');
        render();
    }
});

const handleToggleComplete = (id) => {
    state.tasks = toggleTaskCompletion(state.tasks, id);
    render();
};

const handleSaveEdit = (id, newText) => {
    const text = newText.trim();
    if (text) {
        state.tasks = updateTaskText(state.tasks, id, text);
        showSnackbar('Завдання оновлено!');
    }
    editingTaskId = null; 
    render();
};

const handleDelete = (id, liElement) => {
    // Анімація видалення
    liElement.classList.remove('entering');
    liElement.classList.add('leaving');
    
    setTimeout(() => {
        state.tasks = deleteTaskFromState(state.tasks, id);
        showSnackbar('Завдання видалено!');
        render();
    }, 400);
};

document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.sortBy = e.target.dataset.sort;
        render();
    });
});

render();