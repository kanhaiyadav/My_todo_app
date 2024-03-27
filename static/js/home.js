let arrow = document.querySelector("#arrow");
let ul = document.querySelector(".list");
let li = document.querySelectorAll(".list li");
let input = document.querySelector("#inp1");
let deg = 0;
arrow.addEventListener('click', ()=>{
    deg = (deg+180)%360;
    arrow.style.transform = `rotateZ(${deg}deg)`;
    ul.classList.toggle('active');
})
for(let i = 0; i < li.length; i++)
{
    li[i].addEventListener("click", ()=>{
        input.value = li[i].innerText;
        ul.classList.toggle('active');

    } )
}