# 노마드 코더 - 바닐라 js 크롬 앱 만들기 2주 챌린지
## TODOLIST 만들기
### setup
#### 개요
1. html의 input에 text를 작성후 제출하면, `newTodo`변수에 value값을 저장 후 input을 빈 문자열로 만든다.
2. 제출 이벤트와 동시에 ul#todo-list에 li이 요소들을 추가하여 브라우저에 나타나도록 한다.
  + 이때, li안에는 `text`와 `삭제 button`을 가지고 있는다.

#### 코드 작성
1. input 제출시 에벤트
```javascript
//form안에 input에 제출이 되었을때 발생하는 이벤트
function handleToDoSumbit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    paintToDo(newTodo);
}
```
+ 기존에 새로고침하는 기능을 없애준다. -> `event.preventDefault();`
+ inpit에 작성했던 text는 `newTodo`에 저장한다.
+ input이 제출되면 빈칸으로 보일 수 있도록 value의 값을 빈 문자열로 만든다. -> `toDoInput.value = "";`
  + 이때, `newTodo`의 변수의 값은 변경되지 않는다ㅏ.
  + `newTodo`가 ` toDoInput.value의 값을 할당 받았지만 코드의 흐름을 보면 `newTodo`에 재할당을 하지 않았으므로 값이 갱신되지 않고 저장된 그대로의 값을 갖고 있다.
+ `newTodo`변수를 매개변수로 넣어 painToDo()함수를 실행시킨다.

2. todoList 생성이벤트
```javascript
//제출 이벤트에서 호출되어 li리스트를 만드는 이벤트
function paintToDo(newTodo){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newTodo;
    const button = document.createElement("button");
    button.innerText = "❌"
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}
```
+ html파일에는 ul만 있고, li는 존재하지 않는다.
+ 따라서 javascript로 li태그 요소를 만들어 ul안에 넣어준다. ->`const li = document.createElement("li");`
+ li안에 text를 넣을 span태그도 만들어준다. -> `const span = document.createElement("span");`
+ 매개변수로 받은 newTodo를 span태그 안에 넣어준다.-> `span.innerText = newTodo;`
+ li안에 삭제를 위한 button도 만들어준다.-> `button.addEventListener("click",deleteToDo);`
+ button 요소 안에 넣을 이모티콘을 넣어준다. -> `button.innerText = "❌"`
+ button을 클릭할때 발생하는 이벤트를 연결해준다. -> `button.addEventListener("click",deleteToDo);`
+ 이 모든 요소들을 `appendChild`를 이용해 span과 button은 li에 넣고 li는 ul의 마지막에 추가해준다.


### Deleting ToDos
#### 개요
button을 클릭했을때 삭제되는 이벤트를 만든다.
button을 클리하면 모든 button들이 이벤트를 기다리고 있어 자칫하면 클릭 이벤트를 모든 button에 적용될 수 있다.

내가 클릭한 button을 가지고 있는 text만 삭제하기를 원한다. 따라서 내가 선택한 요소만을 선택할 수 있도록 코드를 작성해줘야 한다.

event매개변수는 target이라는 프로퍼티를 가질 수 있다.
이것을 통해 어떤 수많은 태그 중에 어떤 태그에 이벤트가 발생했는지 알 수 있다.

+ button은 여러 프로퍼티를 가지는데 그 중 선택된 요소의 부모요소를 가리키는 프로퍼티 `parentElement`, `parentNode`를 사용할 수 있다.

```javascript
console.dir(event.target.parentElement);
console.dir(event.target.parentElement.innerText);
```
>따라서 현재 삭제하고 싶은 요소는 버튼이 아닌 li이기 때문에 클릭 이벤트가 발생한 button의 부모(li)를 찾아 삭제하기 위해 `target.parentElement`를 이용해 li를 선택 될 수 있도록 하는 것이다.

#### 정리

 + event매개변수를 이용해 정보를 얻는데 우리가 클릭한 또는 이벤트가 일어난 요소를 알기 위해서 target을 이용해 어떤 요소인지 확인 할 수 있다.
 + `parentElement`을 통해 발생한 이벤트를 가지고 있는 부모요소를 찾아 볼 수 있다.

 ```javascript
 event.target.parentElement
 //-> 이벤트가 발생한 요소를 타켓해서 부모요소를 찾는다.
 ```
 
 #### 클릭시 삭제하기
 ```javascript
function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
}
 ```
+ li 변수에 클릭 이벤트가 발생한 요소의 부모를 저장 후 `romove()`를 통해 삭제한다.

<br>

### Saving ToDos
#### localStorage를 이용해 todolist를 저장한다.
+ input에 작성한 text를 배열에 저장하고 localStorage에 저장한다.
하지만 localStorage는 배열을 저장하지 못한다.
only 문자만 저장한다.

```javascript
const toDos = [];

function handleToDoSumbit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    toDos.push(newTodo);
    paintToDo(newTodo);
    saveToDos();
}
```
+ input에 작성된 value값을 toDos배열 안에 저장해 관리하도록 한다. ->`toDos.push(newTodo);`
+ 이 배열을 saveToDos()함수를 통해 `localStorage`에 저장하도록 한다.
  + 이때, 저장된 배열 자체를 저장하게 되면서 문자로 저장된다.
    ```javascript
    function saveToDos(){
            localStorage.setItem("todos", toDos);
        }

    //localStorage 안에는 a, b, c, d로 저장이 된다.
    ``` 
 #### JSON.stringify()-> 변환된 값은 문자열이다.
 >객체나 배열 등을 어떠한 자바스크립트 코드를 문자열로 만들어준다.
  + 따라서, localStorage안에 있는 값을 배열로 저장하기를 원한다. <br> 각 입력한 value마다 문자열로 만들기 위해 [`JSON.stringify()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)를 통해 각 요소를 문자열로 만들어준다.
    + JSON.stringify()는 ()안에 있는 것들을 통째로 문자열로 만드는 것 같다....
  ```javascript
    function saveToDos(){
        localStorage.setItem("todos", JSON.stringify(toDos));
    }

    //localStage 안에 ["a","b","c","d"]로 저장된다.
    //배열모양처럼 저장이 된다.
    // 이것은 배열 모양이지만, 문자열이다.
  ```
  
  + 따라서 toDos는 배열이니까 `JSON.stringify([a,b,c,d]);`로 동작해서 localStorage에 저장된 값이 `["a","b","c","d"]`으로 저장되는 것 같다.
    + 왜 "a"이 되냐면 input.value의 타입이 문자이기때문에 배열을 문자로 바꾸면 안에 있는 문자열을 따로 표기하기 위해서 ""가 사용되었다.
+ 새로고침을 해도 저장된 데이터를 그대로 있지만 브라우저 화면상에는 사라져 있다.   
+ 또한 새로고침 후 다시 input에 text를 입력해 제출하게 되면 localStorage안에 있는 값이 이전 값을 유지하지 못하고 갱신된다.

<br>

### Loading TO Dos 1
#### JSON.parse
> 문자열을 가지고 javascript object로 만든다.

```javascript
JSON.stringify([1,2,3]);
//"[1,2,3]"
JSON.parse("[1,2,3]");
//(3) [1,2,3]
```

> javascript는 arry에 있는 각각의 item에 대해 function을 실행할 수 있게 해준다.


#### forEach()
> array에 있는 각각의 item에 대해 실행하게 해준다. ( )안에 인수는 array의 각각의 item이 들어가 지정한 동작을 실행하게 해준다.
```javascript
function sayHello(item){
    console.log("This is the turn of", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedTodos = JSON.parse(savedToDos);
    parsedTodos.forEach(sayHello);
}
```
+ forEach()의 ()안의 넣은 함수에게 각 array item을 전달해주며 array의 item마다 sayHello를 실행한다.

#### 화살표 함수를 이용해 간략하게 할 수 도 있다.
```javascript
const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedTodos = JSON.parse(savedToDos);
    parsedTodos.forEach(item) => console.log("this is the turn of ", item);
}
```

<br>

### Loading TO Dos 2
####