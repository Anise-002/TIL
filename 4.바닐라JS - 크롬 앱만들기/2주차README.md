# 노마드 코더 - 바닐라 js 크롬 앱 만들기 2주 챌린지
## 7일차 -  LOGIN part
### INPUT VALUES

+  HTML의 element요소 가져오기
```javascript
const loginForm = document.querySelectorById("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginInput.querySelector("button");
```
와
```javascript
const loginInput = document.querySelector(" #login-form input");
const loginButton = document.querySelector("#login-form button");
```
의 코드는 같은 결과적으로 같은 일을 한다. 
+ `querySelector`는 태그를 가져올때는 태그 이름만을 가져오고, 클래스, 아이디는 (.또는 #)을 붙여 가져올 수 있다.
+ 또한, css를 작성하는 법처럼 태그 안에 태그, 클래스, 아이디를 지정할 수 있다.

#### INPUT과 VALUES
input요소의 속성 중 value는 input에 입력한 값을 value 값으로 넣을 수 있다. 이것을 이용해 우리가 원하는 동작을 하도록 한다.

<br>

### Form Submission
#### 문자열.length
string이 가지고 있는 글자 수를 알려준다.
```javascript
const hello = "lllllll";
console.log(hello.length);  //7
```

```javascript
function btnClick(){
    const username = loginInput.value;
    if(username === ""){
        alert("Please write your name");
    }else if(username.length > 15){
        alert('Your name is too long')
    }
}
```

#### FORM 태그의 유효성 검사 이용하기

input에 들어가 있는 value값에 조건을 걸어 유효성을 검사할 수 있다. 하지만 user가 직접 입력하는 값을 절대적으로 믿어서는 안된다.

또한 이미 가지고 있는 기능을 사용하는 것이 코드를 작성하는데 가장 바람직하다.

> HTML태그 input에는 글자수를 조절해주는 속성을 이미 가지고 있다.
> + `required` `maxlength` = "15"
> <br><u>input의 HTML유효성 검사를 하기 위해서는 꼭 `<form></form>`태그 안에 작성해야 HTML이 이미 가지고 있는 유효성 검사를 작동시킬 수 있다.</u>
```html
<form id="login-form">
    <input required maxlength="15" type="text" placeholder="What is your name?">
    <button>Log In</button>
</form>
```
+ 입력을 안하면 경고창을 나타나며, 15자 이상일 경우에는 입력이 되지 않도록 해준다.
+ 자바스크립트로 이벤트를 지정하지 않아도, 버튼을 클릭했을때와 엔터를 치는 동작에 반응한다.
+ form태그 안에 있는 button을 클릭했을때 input안에 있는 값들이 새로고침이 된다.(html이 가지고 있는 기본값)

<br>

### Event
1. input에 있는 value값을 가져오기
```javascript
function onLoginSubmit(){
    const username = loginInput.value;
    console.log(username);
};

lognForm.addEventListener('submit',onLoginSubmit);
```
+ 이벤트 'submit'을 이용해 form이 submit을 하면 이벤트 함수가 실행되도록 한다.
+ 이렇게 하면 콘솔에 value값이 출력되지만 금방 사라지는 현상이 나타난다.
+ form태그는 submit을 하면 새로고침을 하는 기능을 가지고 있어서 바로 새로고침이 되서 콘솔창의 값이 사라진다.
<br>

#### 함수와 이벤트
이벤트 함수는 이벤트를 감지되면 입력한 함수를 브라우저가 알아서 함수를 호출하도록 하는데 이때 브라우저가 함수의 정보를 같이 호출하게 된다. ()안에 이벤트의 여러가지 정보들을 가지고 호출하게 된다.

따라서 함수의 첫번째 인수(argurment)를 출력해보면, 함수에 이벤트에 대한 여러가지 정보들을 볼 수 있다.

```javascript
function onLoginSubmit(e){
    e.preventDefault();
    const username = loginInput.value;
    console.log(e);
};

// SubmitEvent {isTrusted: true, submitter: button, type: 'submit', target: form#login-form, currentTarget: form#login-form, …}
```

이벤트 함수의 첫번째 인수로 함수이벤트가 실행되는 이벤트에 대한 정보를 가진다.
<br>

#### PreventDefault();
>어떤 event의 기본 행동이 발생하지 않도록 막는다.
> + `기본행동` : 브라우저가 가지고 있는 기본적인 동작을 말한다.
```javascript
function onLoginSubmit(e){
    e.preventDefault();
    const username = loginInput.value;
    console.log(e);
};

lognForm.addEventListener('submit',onLoginSubmit);
```
+ `e.preventDefault();`를 사용해 form태그가 가지고 있는 기본동작인 새로고침을 하지 못하도록 했다.
+ `preventDefault()`는 이벤트를 실행할때 함수에게 주는 이벤트 정보들 중에 하나이다.
+ 각 이벤트의 정보들을 이벤트마다 각각 다른 정보를 전달해준다.

<br>

### Event part 2

태그`<a>`의 기본행동은 클릭시 다른 페이지로 이동하는 것
```javascript
function handleLinkClick(event){
    event.preventDefault();
    console.log(event);
    alert("Clicked");

}

link.addEventListener("click", handleLinkClick)
```
 + `event.preventDefault();`를 사용함으로서 `<a>`태그의 기본동작인 다른 페이지로 이동하는 것을 막을 수 있다.

 <br>

### Getting Username
#### input을 작성하면 input 사라지게 하기
1. use css
```css
.hidden{
    display: none;
}
```
input을 submit하면 hidden클래스를 추가해 보이지 않게 한다.

```javascript
function onLoginSubmit(e){
    e.preventDefault()  
    lognForm.classList.add(HIDDEN_CLASSNAME);
};
```
#### Text를 보이게 하면서 input의 값 이용하기
```javascript
const greeting = document.querySelector("h1");
const HIDDEN_CLASSNAME = "hidden";

function onLoginSubmit(e){
    e.preventDefault()  
    lognForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    greeting.innerText = "Hello " + username;
    greeting.classList.remove(HIDDEN_CLASSNAME);
    console.log(username);
};
```
+ `greeting`은 h1태그이면서 hidden클래스를 가지고 있는 html태그이다.
+ 따라서 input을 submit하는 이벤트를 하면 `innerText`안에 텍스트를 넣고 `greeting`에 hidden클래스를 제거해 브라우저 창에 보이도록 한다.
+ 이때 'hidden' 클래스 명이 2번 이상 사용했기때문에 변수에 넣어 관리한다.
    ```javascript
    const HIDDEN_CLASSNAME = "hidden";
    ```
    + 변수 이름을 대문자로 쓰는 이유
    + 일반적으로 string만 포함된 변수는 대문자로 표기하고 string을 저장하고 싶을 때 사용한다.
    + `loginForm`, `loginInput`과 같은 중요한 정보를 다마는게 아니기 때문에 대문자로 작성한다.


+ ` `` (백틱)` 사용하기
    ```javascript
    greeting.innerText = "Hello " + username;
    //변수와 string을 따로 '+'를 이용해 연결한다.
    greeting.innerText = `Hello ${username}`;
    //변수와 string을 한번에 연결하며 둘다 변수 string안에 사용할 수 있다.
    ```
    백틱(``)을 이용해 문자열 안에 변수와 문자를 같이 넣을 수 있다.
   +  이 두 코드는 똑같은 동작을 한다.
    + `${   }` : 이 기호를 사용해 변수를 string안에 넣을 수 있다. 

<br>

### Saving Username
#### localStorage
[MDN link about localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)
>`setItme`, `getItem`, `removeItem`을 이용해 localStorage에 데이터를 담을 수 있다.
>+ 작은 DB와 같다.
>+ key와 value만 있으면 된다.

+ `setItem` : local storage에 정보를 저장한다.
+ `getItem` : local storage에 정보를 가져온다.
+ `removeItem` : local storage에 정보를 지운다.
```javascript
localStorage.setItem("username","nico");
localStorage.getItem("username");
localStorage.removeItem("username");
```
<br>

### Loading Username
새로고침하면 form요소가 다시 나타난다.<br>
username이 localStorage에 있으면 form요소가 나타나지 않고 h1이 나타나게 하려고 한다.
if문을 통해 `localStorage`의 값이 없다면, `form`태그 요소를 나타나게 하고/ 있다면, localStorage의 값을 이용해 h1태그 안에 값을 사용해 나타나도록 하게 하려고 한다.
```javascript
const saveUsername = localStorage.getItem(USERNAME_KEY);

if(saveUsername === null){
    //show the form
    lognForm.classList.remove(HIDDEN_CLASSNAME);
    lognForm.addEventListener('submit',onLoginSubmit);

}else{
    //show the greeting
    greeting.innerText = `Hello ${saveUsername}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}
```
1. null이라면
+ hidden클래스를 지우고 form이 보이게 한다.
+ submit이벤트가 실행되었을때 `onLoginSubmit`함수가 실행된다.
<br>
2. null이 아니라면
+ gretting(h1)안에 ``Hello ${saveUsername}``을 넣는다. 
+ h1태그에 hidden클래스를 제거함으로서 h1태그가 브라우저에 보이도록 한다.
