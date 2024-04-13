let arrow = document.querySelector("#arrow");
let ul = document.querySelector(".list");
let li = document.querySelectorAll(".list li");
let input = document.querySelector('input[type="text"]');
// let tick = document.querySelectorAll(".tick");
let todo_button = document.getElementById("icon");
let task = document.querySelectorAll(".task");
let nav = document.querySelector("body>nav");
let deg = 0;
let main = '#EE7214'

function showOrHideDropdown(){
    deg = (deg+180)%360;
    arrow.style.transform = `rotateZ(${deg}deg)`;
    ul.classList.toggle('active');
}

arrow.addEventListener('click', showOrHideDropdown);
input.addEventListener('click', showOrHideDropdown);
for(let i = 0; i < li.length; i++)
{
    li[i].addEventListener("click", ()=>{
        if(li[i].innerText == 'Other')
        {
            input.value = "";
            input.placeholder = 'Enter other category..';
            input.focus();
        }
        else
        {
            input.value = li[i].innerText;
        }
        showOrHideDropdown();
    } )
}

todo_button.addEventListener("click", (event)=>{
    event.preventDefault();
    nav.classList.toggle('initial');
})