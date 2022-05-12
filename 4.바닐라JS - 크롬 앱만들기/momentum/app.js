const title = document.querySelector(".hello h1");

function handTitleClick(){
    title.style.color = "blue";
}

function handleMouseEnter(){
    title.innerText = "Mouse is here"
}

function handleMouseLeave(){
    title.innerText = "Mouse is gone!"
}

function handleWindowResize(){
    document.body.style.backgroundColor = "tomato";
}
function handleWindowCopy(){
    alert("copier!!!!");
}
function handleWindowOffline(){
    alert("SOS no WIFI!")
}
function handleWindowOnline(){
    alert("All GOOD!")
}
title.addEventListener('click', handTitleClick);
title.addEventListener('mouseenter',handleMouseEnter);
title.addEventListener('mouseleave',handleMouseLeave);

window.addEventListener("resize",handleWindowResize);
window.addEventListener("copy",handleWindowCopy);
window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online",handleWindowOnline);