import { TODO, TodoList } from "../classes";
import { todoList } from "../index";
// referencia html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) =>{
    const htmlTodo = `
    <li class= "${ (todo.completado) ? 'completed': ''}" data-id= "${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" $ {(todo.completado) ? 'checked': ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a Todo template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//Eventos
txtInput.addEventListener('keyup', (evento)=> {
    //keycode 13 es un enter, se valida que no este vacio
    if (evento.keycode===13 && txtInput.value.length>0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml (nuevoTodo);
        txtInput.value='';
    }
})

divTodoList.addEventListener('click', (evento)=>{
    //obtine un input, button o label
    const nombreElemento = evento.target.localName;
    const todoElemento = evento.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')){
        todoList.marcarCompleto(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
})

btnBorrar.addEventListener('click', ()=> {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length-1; i>=0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (evento)=>{

    const filtro = evento.target.text;
    if(!filtro){return;}

    anchorFiltros.forEach(elem=>elem.classList.remove('select'));
    evento.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
                case 'Completados':
                    if (!completado){
                        elemento.classList.add('hidden');
                    }
                break;
        }
    }

});
        
    