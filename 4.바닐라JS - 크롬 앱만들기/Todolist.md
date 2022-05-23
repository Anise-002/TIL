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
//(3) [1,2,3] -> 배열로 전환된다.
```
+ 현재 배열처럼 생긴 문자열을 javascript object로 변환하면 배열로 변환이 된다.
+ javascript는 arry에 있는 각각의 item에 대해 function을 실행할 수 있게 해준다.

> 1. 배열 `toDos`을 `setItem`으로 localStorage에 저장하면 저장된 데이터의 값은 a, b, c로 string data type 저장된다. -> 현재 상태에서는 각 데이터를 가져오기에는 어려운 상황임으로 localStorage 안 저장되는 데이터의 형태를 배열로 만들어 각 데이터를 선택할 수 있도록 만들어야 한다. 
> 2. 배열`toDos`를 localStorage 안에 있는 내용에 배열처럼 보이게 하기 위해 `JSON.stringify()`를 이용해 `toDos`의 배열을 통째로 문자열로 변환한다.
> 3. 문자열로 변환한 localStroage를 자바스크립트 object로 변환하기 위해 `JSON.parse()`를 이용해 `toDos`가 변환된 배열 모양의 문자열이 `배열`로 변환된다.
>  + 배열은 자료구조의 가장 많이 사용하는 것으로 각 요소를 가져와 함수에 적용 시킬 수 있다. 

#### forEach()
> array에 있는 각각의 item에 대해 실행하게 해준다. ( )안에 인수는 array의 각각의 item이 들어가 지정한 동작을 각 item 실행하게 해준다.
> 문법 : 적용시킬배열.forEach(실행시킬함수);
> + `실행시킬 함수`가  `적용시킬 배열`안의 각 요소를 한번씩 함수를 실행시킨다.
```javascript
function sayHello(item){
    console.log("This is the turn of", item);
}
//item인수는 forEach를 사용한 배열에 각 요소가 들어가진다.

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
+ 인수로 들어가는 item은 `parseTodos`배열의 각 요소이다.

forEach()함수의 인수로 함수도 괜찮고, 화살표 함수를 써도 괜찮다.

<br>

### Loading TO Dos 2
#### 로컬저장소에 저장한 것을 화면에 나타내기
이전에 작성한 if문에 브라우저에 글자가 나타나게 하는 함수를 추가해 새로고침을 해도 브라우저에 남을 수 있도록 한다.
```javascript
const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
  const parsedTodos = JSON.parse(savedToDos);
  parsedTOdos.forEach(paintToDo);
}
```
+ `savedToDos`에 저장된 로컬 데이터가 비어 있지 않으면
+ 로컬 데이터를 `JSON.parse()`를 통해 배열의 모양으로 만든다.
+ 그 배열을 각각 `paintToDo`함수를 이용해 li태그를 만들어 요소에 텍스트와 취소 버튼을 생성해 브라우저 html에 태그로 나타나게 한다. -> 브라우저 상에 이전에 작성한 todolist가 계속 유지되어 진다.

> 여기서 문제가 생기는데 새로고침 후 todolist를 작성하게 되면 로컬저장소에 기존에 저장된 데이터를 지우고 새로 입력된 데이터로 교체 되게된다.
> + 이유 :  **application이 시작될때 toDos의 배열은 항상 비어 있어 있는 배열이기 때문이다.**
>`handleToDoSumbit`함수에서 `toDos`배열에 `push`하는데 새로고침을 할때마다 toDo가 선언된 것은 `빈배열`이기때문에 빈배열에 push되는 것과 같다.
> + 따라서 현재 코드에서 로컬저장소에 데이터가 저장되어 있는 조건을 가진 코드는 if문이므로 if문에서 현재 로컬저장소(데이터가 있음)의 배열을 `toDos`에 할당해줘서 그 값을 유지할 수 있도록 해준다.
>+  그러면 브라우저를 새로고침을 하여도 로컬저장소의 데이터 배열에서 입력할때마다 기존의 데이터를 유지되면서 추가되어진다.

```javascript
let toDos = [];
//toDos의 값을 업데이트 하기 위해 const에서 let으로 변경한다.

//logocalStorage 안에 데이터가 있을 경우
if(savedToDos !== null){
    const parsedTodos = JSON.parse(savedToDos);
    toDos = parsedTodos;
    //toDos배열에 현재 localStorage의 데이터 배열을 할당해준다.(배열을 재할당함으로서 toDos가 배열을 유지할 수 있게 된다.)
    parsedTodos.forEach(paintToDo);
    //기존에 가지고 있는 데이터를 브라우저에 나타내준다.
}

```
+ 이때 배열은 변화하기 때문에 상수`const`가 아니라 `let`으로 변경해준다.

<br>

### Deleting TO Dos 3
여기서 delete버튼을 클릭했을때 html상에서는 li가 지워지지만 localStorage안과 toDos배열 안에는 입력한 값을 가지고 있다.<br>
따라서 delete버튼을 눌렀을때에도 localStorage와 toDos배열안의 요소가 삭제되도록 만들어야 한다.

+ toDos array는 데이터 베이스
+ localStorage는 toDos array를 복사해두는 곳`카피본`이며 데이터베이스라고 하지 않는다.
+ 따라서 localStorage와 toDos array는 같지 않다.
  + localStorage에 데이터를 삭제해도 toDos array에 똑같이 삭제되지 않는다.

+ 또한, delete버튼을 눌러도, toDos array안 배열에 어떤것을 삭제했는지 알수가 없다.
  + 똑같은 단어가 있다면 어떤것인지 판별하기도 어려운 상황이다.
+ -> 따라서 todo들에게 ID를 부여해주어 구별해 브라우저에서 삭제했을때도 toDos array배열에도 삭제될 수 있도록 해야한다.

#### toDos 배열 안에 id를 부여하기 -> Date.now();
고유의 id를 부여하기 위해서 [`Date.now()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/now)를 사용한다.
+ `Date.now()`는 1970년 1월 1일 0시 0분으로 부터 현재까지 경과된 밀리초를 Number type으로 반환하는 메소드이다.
+ 이것을 사용하면 겹치지 않는 고유의 id값을 손 쉽게 부여할 수 있다.
```javascript
  function handleToDoSumbit(event){
      event.preventDefault();
      const newTodo = toDoInput.value;
      toDoInput.value = "";
      const newTodoObj = {
          text : newTodo,
          id : Date.now()
      }
      toDos.push(newTodoObj);
      paintToDo(newTodoObj);
      saveToDos();
  }
```
+ 처음 코드를 작성할때는 input에 입력된 value값 하나만 지정하여 toDos에 push했었다.
+ 하지만, 배열은 객체로 배열의 요소로 가질 수 있으며, 객체를 이용하면 각 객체마다 고유의 성격을 부여 할 수 있다.
+ 따라서 toDos에 객체({})를 push하게 되면 각 요소들을 자신들의 고유의 성격을 가지리 수 있게 된다.
+ `const newTodoObj = {
          text : newTodo,
          id : Date.now()
      }`의 형태로 input에 입력된 text와 id값을 부여해준다.
+ 새로 선언한 객체를 갖는 변수를 toDos에 push해준다.

#### 객체를 받은 코드를 수정한다.
1. PaintToDo()함수는 인수로 받은 `newTodoObj`를 브라우저에 나타나게 한다.
+ 이때, 브라우저에 나타는 값은 `object, objet`이다.
+ 객체를 받고 그 객체를 html로 불러왔기 떄문에 이런 문제가 발생한다.
+ 그래서 객체가 가지고 있는 프로퍼티(text와 id)를 각 필요한 곳에 알맞게 넣어줘야 한다.
```javascript
function paintToDo(newTodo){
  const li = document.createElement("li");
  li.id = newTodo.id;
  //li에 newTodo의 id프로퍼티 값을 id값으로 부여해준다.
  //지울때 li를 제거해야 li안에 있는 다른 태그들도 삭제할 수 있으니까....
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  //span에는 기존의 코드처럼 input에 입력한 value를 불러줘는데 객체의 값을 가져왔으니, text프로퍼티의 값을 할당해준다.
  ....
}
```
2. id값을 이용해 배열안의 요소를 삭제한다.
delet버튼을 누르면 삭제되는 함수인 `deleteToDo`의 코드를 수정한다.
+ `filter()`를 이용해 클릭된 요소의 id를 뺀 새로운 배열을 만든다.
+ 새롭게 만들어진 배열을 toDos배열에 재 할당해준다.
+ 그리고 localStorage에도 다시 저장해줘야 하니까 saveToDos()함수를 호출해 filter로 다시 반들어진 배열을 재할당된 toDos배열을 배열모양인 문자열로 다시 저장한다. 

```javascript
function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    //filter()메서드로 인해 조건에 맞는 배열이 새롭게 만들어진다. 
    saveToDos();
    //새로만들어진 배열을 다시 localStorage에 넣어준다.
}
```


### [filter()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
> 반드시 true를 반환해 newArray(새로운 배열)을 만든다.
> + filter()의 적용된 함수의 첫번째 인수로는 filter()메서드가 적용된 배열의 요소들이 첫번째 인수로 들어온다.
#### 일반함수를 이용
```javascript
function sexyFilter1(){return true};
const newArray1 = [1,2,3,4,5].fliter(sexyFilter1);
console.log(newArray1);
//[1,2,3,4,5]

function sexyFilter2(item){return item !==3};
//item은 [1,2,3,4,5]의 각 각 요소이다.
//1은 3이 아니게 맞으니 true;
//2은 3이 아니게 맞으니 true;
//3은 3이 이니 false;
//4은 3이 아니게 맞으니 true;
//5은 3이 아니게 맞으니 true;
//filter은 true를 새 배열로 만드니, false가 나온 3은 제외된다.
const newArray2 = [1,2,3,4,5].filter(sexyFilter2);
console.log(newArray2);
//[1,2,4,5]
```
#### 화살표 함수를 이용한 filter메서드
```javascript
comst arr = [1,2,3,4];

const newArr = arr.filter(item => item > 2)

console.log(arr);
//(4)[1,2,3,4]
console.lgo(newArr);
//(2)[3,4]
```
+ `filter`는 array를 변경하지 않지않고 자신만의 배열을 새롭게 만든다.

#### 객체를 가진 배열의 filter사용
```javascript
const todos = [{text:"lalala"}, {text : "lololo"}];
function sexyFilter(todo){return todo.id !== "lalala"};
//todo에는 todos의 객체({})가 인수로 전달된다.
//`.`을 이용해객체 안에 프로퍼티를 참조해서 객체 안에 있는 값을 대조할 수 있다.
const newArray = todos.filter(sexyFilter);
//[{text : "lololo"}]
```

```javascript
toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
```
+ `li.id`의 값이 toDos배열의 각 요소(toDo)의 id값과 대조한다.
+ filter은 true를 반환하기 때문에 !==의 값이 true인 값을 가진 요소들로 이루어진 배열을 만들게 된다.(연산식 해석 : li.id와 toDos.id가 같지 않는 것을 반환한다)
+ 즉, toDo.id == li.id의 값이 같을때, false가 된다.
  + 이것은 delete버튼을 누른 li의 id값이 filter로 인해 배열 전체를 대조하게 되면서 같은 id값을 가지게 되는 요소는 false가 되니까 뺀 새로운 배열을 만들게 된다.
+ `!==`는 데이터타입도 같아야 하는 연산자
+ `li.id`는 data type은 문자열로 대조를 하기 위해서는 li.id의 data type을 숫자로 변경하기 위해 parseInt()를 이요해 숫자로 변경시켜주어 대조한다.



## Weather API
### Geolocation.getCurrentPosition()
[mdn 문서](https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition)
```javascript
navigator.geolocation.getCurrentPosition(a,b);
```
+ 이 코드를 사용하면 브라우저가 알아서 wifi, GPS 등의 지역 좌표를 가져와준다.
+ `getCurrentPosition()`에는 2개의 인수를 받는다.
  + `a` : 모든게 잘 됐을 때의 실행 될 함수
  + `b` : 에러가 발생했을 떄의 실행 함수

```javascript
//성공했을때의 실행되는 함수
function onGeoOk(position){
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log("You live in" , lat, lon)
}
//실패했을때 실행되는 함수
function onGeoError(){
  alret("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
```
+ `onGeoOk`함수(성공하게 된 경우 실행되는 함수)는 인수로 객체를 받는다.
+ 따라서 event매개변수처럼 사용하면 함수가 실행됬을때 여러가지 정보를 알려준다.
  + coords안에  latitude(위도), longitude(경도)의 정보가 있다.


#### connect Weather API
[날씨 API 링크 : openweathermap](https://openweathermap.org/)
[현재날씨 API 링크](https://openweathermap.org/current)

```javascript
//홈페이지에 있는 작동법
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
```
사이트에서 제공되는 API연결 링크를 수정해서 사용한다.
 + {lat} : latitude의 값
 + {lon} : longitude의 값
 + {API key} : 회원가입할때 user에게 주어지는 key값

```javascript
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
```

#### fetch()
fetch()를 이용해서 API를 불러오도록 한다.
+ 개발자창에 Network(wifi에서 어떤 일이 일어나는지 보여주는 공간)에서 활동을 볼 수 있다.
```javascript
fetch(url);
```
이렇게 하면 API 주소를 자바스크립트가 대신 url을 불러주게 된다.
그러면 API의 url이 가지고 있는 정보들을 볼 수 있다.

+ `then(reponse => reponse.json())`
  + json()은 Network에서 자바스크립트가 불러온 url의 정보를 의미한다.
+ `then(data => console.log(data.main , data.weather[0].main))`를 해서 json()에서 필요한 값을 불러온다.
```javascript
fetch(url)
    .then(response => response.json())
    .then((data) => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText =data.name;
        weather.innerText = `${data.weather[0].main}/${data.main.temp}  `;
    });
```

#### 옵션을 넣어 화씨를 썹씨로 만들기
> API 홈페이지에 옵션에 대해 알려주고 있어 필요한 기능을 찾아야 한다.
+ 옵션 `units`에 `metric`옵션을 API url에 추가한다.
```javascript
//홈페이지에 있는 작동법
https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric

//코드에 적용
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
```