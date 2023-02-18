//обращение к элементам и создание из них перепенных 
let form = document.querySelector('#form'); //нашли элемент где нужно вводить имя
let taskInput = document.querySelector('#taskInput'); //задали переменную для поля ввода
let tasksList = document.querySelector('#tasksList'); //задали переменную которая отвечает за список имен и фамилий
let emptyList = document.querySelector('#emptyList'); //обращаемся к надписи 'пока все живы' чтобы потом с ней работать



//ДЕЛАЕМ ИНТЕРАКТИВ
//обращаемся к элементу form
//добавляем прослушку через метод addEventListener и пишем туда два аргумента
//когда происходит submit, то срабатывает функция 
form.addEventListener('submit', function (event) {
    //в функции мы отменяем стандартный метод, чтобы страница не перезагружалась после того как срабатывает функция
    event.preventDefault();
    //после того как мы ивент в дефолт поставили - в консоль выводится хуй и ничего не перезагружается
    // console.log("хуй");

    //ТЕПЕРЬ НУЖНО ДОСТАТЬ ИМЯ ФАМИЛИЮ ИЗ ПОЛЯ ВВОДА
    let taskText = taskInput.value
    //теперь в консоли будет появлятся имя фамилия которую мы ввели благодаря taskInput.value
    // console.log(taskText);



    //ТЕПЕРЬ НУЖНО СДЕЛАТЬ ТАК ЧТОБЫ ТЕКСТ ВЫВОЛИЛСЯ В HTML И ПОЯВЛЯЛСЯ В СПИСКЕ
    //создаем блок который будет генерироваться после ввода
    //добавил ${taskText} чтобы внутри этого html появлялась эта хуйня, а внутри неё надпись которую мы прописали в строке ввода
    let taskHTML = `
    <li id="emptyList1" class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${taskText}</span> 
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="satan.png" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="angel.png" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`
    //после всей этой хуйни в консоли появляется код html а внутри него текст который мы написали (имя фамилия)
    //     console.log(taskHTML);



    //ТЕПЕРЬ ДОБАВЛЮ ТО ЧТО ВЫВЕЛИ В КОНСОЛЬ - В HTML(НА СТРАНИЦУ КОРОЧЕ)
    //обращаемся к id который есть в html отвечающий за список имен и фамилий 
    tasksList.insertAdjacentHTML('beforeend', taskHTML)


    //теперь после того как вводишь имя, убирается курсор(фокус) с поля ввода и там внутри остается текст, надо это исправить
    //очищаем поле ввода
    taskInput.value = ""; //после этого очищается поле ввода от того что мы вводили
    taskInput.focus() //метод фокус возвращает фокус на поле ввода


    //делаем проверку которая смотрит есть ли какие то имена, если они есть - убирает "все пока живы"
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none') //если колличество имен больше чем 1 то надпись пока все живы убирается через css .none display: none
    }
})
//теперь надо сделать кнопку удаления имени.. Если тыкаешь на обычный крест, то имя удаляется
tasksList.addEventListener('click', function deleteTask(event) {
    //делаем условие, если то - куда мы нажали содержит delete, то к этому элементу мы и обращаемся
    if (event.target.dataset.action === 'delete') {
        // console.log("хуй");
        let parentNode = event.target.closest("li") //ищем через оператора closest кто родитель снаружи и даем ему переменную, чтобы потом - 
        parentNode.remove() //убрать
    }
    //теперь надо сделать так чтобы после удаления имени, возвращалась обратно надпись (пока все живы)
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none')
    }
})




//теперь надо сделать кнопку убийства имени.. Если тыкаешь на дьявольский крест - имя перечеркивается и становится красным 
tasksList.addEventListener('click', function doneTask(event){
    // console.log('pizda');
    if (event.target.dataset.action === 'done'){
        // console.log('ddd');
        let parentNode = event.target.closest("li") 
        let taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
    }
})