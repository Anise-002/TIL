const loginInput = document.querySelector(" #login-form input");
const lognForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(e){
    e.preventDefault()  
    lognForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    console.log(username);
    localStorage.setItem(USERNAME_KEY,username);
    // greeting.innerText = "Hello " + username;
    paintGreetings();
};

function paintGreetings(){
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const saveUsername = localStorage.getItem(USERNAME_KEY);

if(saveUsername === null){
    //show the form
    lognForm.classList.remove(HIDDEN_CLASSNAME);
    lognForm.addEventListener('submit',onLoginSubmit);

}else{
    //show the greeting
    paintGreetings();
}

