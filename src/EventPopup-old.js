function editItem(e){
    let todo = localToDo[e.target.id];
    let a = "<p style='width:100%; text-align:right;'><span style='display:inline-block; width:350px; text-align:center;'>- Edit -</span><button id='exitButton' >exit</button></p>" +
    "<p> </p>" +
    "<input id='edInputString' style='width:350px;' value='" + 
    todo.day + "/" + todo.month + (todo.time > " " ? ", " : "") + todo.time +
    " - " + todo.who + " - " + todo.whatWhere + 
    "' />  " +
    "<button id='saveButton'" + e.target.id + " >save</button>";
    const editArea = document.getElementById("editArea");
    editArea.innerHTML = '<div style="display: inline-block; min-width: 25em; min-height: 21em; background: #eee; position: absolute; z-index: 5;">' + a + '</div>';
    
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener("click", (event) => {
        const newToDo = parseToDo(document.getElementById("edInputString").value);
        //todos[e.target.id] = newToDo;
        localToDo[e.target.id] = newToDo;
        setTodos([todos[e.target.id] = newToDo]);
        editArea.innerHTML = '';
        console.log("edit ");
        console.log(todos);
    });

    const exitButton = document.getElementById("exitButton");
    exitButton.addEventListener("click", (event) => {
        editArea.innerHTML = '';
    });
    
    return;
  }
