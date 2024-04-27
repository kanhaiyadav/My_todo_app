let arrow = document.querySelector("#arrow");
let ul = document.querySelector(".list");
let li = document.querySelectorAll(".list li");
let createTaskForm = document.querySelector('form[id="add-task"]');
let updateForm = document.querySelector('form[id="update-task"]');
let input = document.querySelector('input[type="text"]');

let task = document.querySelectorAll(".task");
let nav = document.querySelector("body nav");
let deg = 0;
let main = '#EE7214'

let curr_id = null;
function showOrHideDropdown() {
    deg = (deg + 180) % 360;
    arrow.style.transform = `rotateZ(${deg}deg)`;
    ul.classList.toggle('active');
}

let edit_link_handler = (event) => {
    event.preventDefault();
    $("#update-task").slideToggle(300);
    $("#add-task").slideUp(300);
    curr_id = $(event.target).parent().data('id');
    console.log(curr_id);
    console.log(document.querySelector(`#task-${curr_id} span.date`).innerText);
    let mydate = new Date(document.querySelector(`#task-${curr_id} span.date`).innerText);
    console.log(mydate);
    const formattedDate = mydate.toISOString().substring(0, 10);
    console.log(formattedDate);
    $("#update-task").find("textarea[name=description]").val(document.querySelector(`#task-${curr_id} span.task-description`).innerText);
    $("#update-task").find("input[name=category]").val(document.querySelector(`#task-${curr_id} span.label`).innerText);
    $("#update-task").find("input[name=date]").val(formattedDate);
}

let create_form_toggle = ()=>{
    $("#add-task").slideToggle(300);
}
let update_form_toggle = ()=>{
    $("#update-task").slideToggle(300);
}

arrow.addEventListener('click', showOrHideDropdown);
input.addEventListener('click', showOrHideDropdown);

$("#arrow2").click(() => {
    $("#update-list").slideToggle(400);
})
$("#update-list li").click((event) => {
    if($(event.target).text() == 'Other')
    {
        $("#update-task input[name=category]").val('');
        $("#update-task input[name=category]").attr("placeholder", "Enter other category..");
        $("#update-task input[name=category]").focus();
    }
    else
    {
        $("#update-task input[name=category]").val($(event.target).text());
    }
    $("#update-list").slideToggle(400);
})

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

$("#sidebar>button").click(() => {
    $("body nav").toggle(300);
})
$(".delete-link").click(function (event) {
    event.preventDefault();
    $.ajax({
        url: $(this).prop('href'),
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
                let new_task = newTask(data.data.task);
                $("#task-container").prepend(new_task);
                delete_task($(' .delete-link', new_task));
                $(".edit-link").parent().click(edit_link_handler);
                createTaskForm.reset();
                create_form_toggle();
            },
            error: function (err) {
                console.log(err.responceText);
            }
        })
    })
}

let newTask = (task) => {
    return $(`<div id="task-${task._id}" class="task">
                    <a class="delete-link" href="/delete-task/${task._id}"><i class="fa-solid fa-trash-can"></i></a>
                    <p>
                        <span class="task-description">
                            ${task.description}
                        </span>
                        <span>
                            <a class="edit-link" href="" data-id="${task._id}"><i class="fa-solid fa-pen-to-square"></i></a>
                        </span>
                        <span class="label">
                            ${task.category}
                        </span>
                    </p>
                    <p><i class="fa-solid fa-calendar-days"></i><span class="date">
                            ${new Date(task.date)}
                        </span></p>
                </div>`)
}

create_task();

$("#new-task-button").click(() => {
    create_form_toggle();
    $("#update-task").slideUp(300);
});
$("#add-task button.cancel").click(create_form_toggle);
$("#add-task button.reset").click(() => {
    createTaskForm.reset();
});
$("#update-task button.cancel").click(update_form_toggle);
$("#update-task button.reset").click(() => {
    updateForm.reset();
});

$(".edit-link").click(edit_link_handler);

$("#update-task").submit(function (event) {
    event.preventDefault();
    let formData = new FormData(this);
    let jsonData = Object.fromEntries(formData);
    let data = $('#update-task').serialize();
    console.log(data.category);
    $.ajax({
        url: "/update",
        type: 'post',
        data: {
            form_data: jsonData,
            id: curr_id
        },
        success: function (data) {
            console.log(data);
            console.log(document.querySelector(`#task-${data.data.task._id} span.task-description`));
            document.querySelector(`#task-${data.data.task._id} span.task-description`).innerText = data.data.task.description;
            document.querySelector(`#task-${data.data.task._id} span.label`).innerText = data.data.task.category;
            document.querySelector(`#task-${data.data.task._id} span.date`).innerText = data.data.task.date;
            updateForm.reset();
            update_form_toggle();
        },
        error: function (err) {
            console.log(err.responceText);
        }
    })
})
