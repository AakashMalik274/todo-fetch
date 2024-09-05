async function getListOfTodos(){
    const response = await fetch("http://localhost:3001/");
    const todos = await response.json();

    setTodos(todos);
}

async function updateTodo(todoId) {        
    if(todoId){
        const response = await fetch("http://localhost:3001/",{
            method:"PUT",
            body:JSON.stringify({
                id: todoId,
                markComplete:document.getElementById(todoId).checked}),
            headers:{
                'Content-Type': 'application/json',
            }
        });
        
        const todos = await response.json();
        setTodos(todos);
    }
    else{
        alert('What you trying to update, Boy?')
    }
}

async function deleteTodo(todoId) {
    if (todoId) {
        const response = await fetch("http://localhost:3001/",{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id: todoId})
        });
        const todos = await response.json();
        setTodos(todos);
    }
    else{
        alert("Todo Id not available");
    }
}

async function addTask(){
    let newTask = document.getElementById('task').value;    
    if(newTask){
        const response = await fetch("http://localhost:3001/",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: newTask }),
        });

        const todos = await response.json();
        setTodos(todos);
    }
    else{
        alert('What you trying to add, Boy?')
    }
    document.getElementById('task').value = '';
}

function setTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    if (todos.length > 0) {
        document.getElementById('nothing').innerText = '';        
        todos.forEach(todo => {
            const row = document.createElement("tr");

            const cellCheck = document.createElement("td");
            const checkBox = document.createElement(`input`);
            checkBox.type = 'checkbox';
            checkBox.checked = todo.completed ? true : false;
            checkBox.id = todo.id;
            checkBox.onclick = ()=>{
                updateTodo(todo.id);
            }
            cellCheck.appendChild(checkBox);
            row.appendChild(cellCheck);


            const cell = document.createElement("td");
            const cellText = document.createTextNode(`${todo.task}`);
            cell.appendChild(cellText);
            row.appendChild(cell);

            const cell2 = document.createElement("td");
            const cellText2 = document.createTextNode(`${todo.completed ? 'Completed' : 'Not Completed'}`);
            cell2.appendChild(cellText2);
            row.appendChild(cell2);

            const deleteButton = document.createElement("td");
            const deleteBtn = document.createElement(`button`);
            const iDeleteBtn = document.createElement(`i`);
            // const cellText3 = document.createTextNode(` Delete`);


            iDeleteBtn.className = 'fa fa-trash';
            deleteBtn.className = 'btn';
            deleteBtn.onclick = ()=>{
                deleteTodo(todo.id);
            }

            deleteBtn.appendChild(iDeleteBtn);
            // deleteBtn.appendChild(cellText3);
            deleteButton.appendChild(deleteBtn);
            row.appendChild(deleteButton);
            
            todoList.appendChild(row);            
        });
    } else {
        document.getElementById('nothing').innerText = 'Nothing to see here yet! Add your tasks quickly';
    }
}

getListOfTodos();