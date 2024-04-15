let arrow = document.querySelector("#arrow");
let ul = document.querySelector(".list");
let li = document.querySelectorAll(".list li");
let createTaskForm = document.querySelector('form[id="add-task"]');
let input = document.querySelector('input[type="text"]');
// let tick = document.querySelectorAll(".tick");
let todo_button = document.getElementById("icon");
let task = document.querySelectorAll(".task");
let nav = document.querySelector("body>nav");
let deg = 0;
let main = '#EE7214'

function showOrHideDropdown() {
    deg = (deg + 180) % 360;
    arrow.style.transform = `rotateZ(${deg}deg)`;
    ul.classList.toggle('active');
}
arrow.addEventListener('click', showOrHideDropdown);
input.addEventListener('click', showOrHideDropdown);
for (let i = 0; i < li.length; i++) {
    li[i].addEventListener("click", () => {
        if (li[i].innerText == 'Other') {
            input.value = "";
            input.placeholder = 'Enter other category..';
            input.focus();
        }
        else {
            input.value = li[i].innerText;
        }
        showOrHideDropdown();
    })
}

todo_button.addEventListener("click", (event) => {
    event.preventDefault();
    nav.classList.toggle('initial');
})


let delete_task = (delete_link) => {
    $(delete_link).click(function (event) {
        event.preventDefault();
        $.ajax({
            url: $(delete_link).prop('href'),
            type: 'get',
            success: function (data) {
                console.log(data);
                $(`#task-${data.data.task_id}`).remove();
            },
            error: function (err) {
                console.log(err.responceText);
            }
        })
    })
}
let create_task = () => {
    let add_form = $("#add-task");
    add_form.submit((e) => {
        e.preventDefault();
        $.ajax({
            url: "/new-task",
            type: "POST",
            data: add_form.serialize(),
            success: function (data) {
                newTask(data.data.task);
                createTaskForm.reset();
                delete_task($('div[class="task"] a'));
            },
            error: function (err) {
                console.log(err.responceText);
            }
        })
    })
}

let newTask = (task) => {
    let task_container = $("#task-container");
    task_container.prepend(`<div id="task-${task._id}" class="task">
                    <a href="/delete-task/${task._id}"><i class="fa-solid fa-trash-can"></i></a>
                    <p><span class="task-description">
                            ${task.description}
                        </span><span class="label">
                            ${task.category}
                        </span></p>
                    <p><i class="fa-solid fa-calendar-days"></i><span class="date">
                            ${task.date}
                        </span></p>
                </div>`)
}

create_task();