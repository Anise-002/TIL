const h1 = document.querySelector(".hello h1");

function handTitleClick(){
    h1.classList.toggle("active");
}

h1.addEventListener("click", handTitleClick);