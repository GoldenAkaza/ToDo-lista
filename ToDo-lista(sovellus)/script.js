document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    // Ladataan tehtävät localStoragesta
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => renderTodoItem(todo));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const todoText = input.value.trim();

        if (todoText === '') {
            showError('Teksti kenttä ei voi olla tyhjä!');
        } else if (todoText.length < 3) {
            showError('Teksti täytyy olla vähintään 3 merkkiä pitkä.');
        } else {
            const todoItem = {
                text: todoText,
                completed: false
            };
            todos.push(todoItem);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodoItem(todoItem);
            input.value = '';
            clearError();
        }
    });

    function renderTodoItem(todo) {
        const li = document.createElement('li');
    
        // Tehtävä teksti laitetaan omaan <span>-elementtiin, jotta se ei yliviivaa napit, kun painaa "valmis" nappia.
        const taskText = document.createElement('span');
        taskText.textContent = todo.text;
        
        // Jos tehtävä on merkitty valmiiksi, lisätään yliviivaus.
        if (todo.completed) {
            taskText.classList.add('completed');
        }
    
        // Valmis/Palaa -nappi
        const completeBtn = document.createElement('button');
        completeBtn.textContent = todo.completed ? 'Palauta' : 'Valmis';
        completeBtn.addEventListener('click', function() {
            todo.completed = !todo.completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            taskText.classList.toggle('completed');
            completeBtn.textContent = todo.completed ? 'Palauta' : 'Valmis';
        });
    
        // Poista-nappi
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Poista';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            list.removeChild(li);
            todos = todos.filter(t => t.text !== todo.text);
            localStorage.setItem('todos', JSON.stringify(todos));
        });
    
        // Lisätään elementit li-tagiin
        li.appendChild(taskText);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
    
        // Lisätään listalle
        list.appendChild(li);
    }

    function showError(message) {
        input.classList.add('error');
        errorMessage.textContent = message;
    }

    function clearError() {
        input.classList.remove('error');
        errorMessage.textContent = '';
    }
});