const mainText = document.querySelector("h2");
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];

//mdn 이벤트 관련주소
//https://developer.mozilla.org/ko/docs/Web/Events

const superEventHandler = {
  mouseEnter: function () {
    mainText.innerText = "Mouse is here!";
    mainText.style.color = colors[0];
  },
  mouseLeave: function () {
    mainText.innerText = "Mouse is gone!";
    mainText.style.color = colors[1];
  },
  resize: function () {
    mainText.innerText = "You jus resized!";
    mainText.style.color = colors[2];
  },
  contextmenu: function () {
    mainText.innerText = "That was a right click!";
    mainText.style.color = colors[3];
  }
};

mainText.addEventListener("mouseenter", superEventHandler.mouseEnter);
mainText.addEventListener("mouseleave", superEventHandler.mouseLeave);
window.addEventListener("resize", superEventHandler.resize);
window.addEventListener("contextmenu", superEventHandler.contextmenu);
