# 노마드 코더 - 바닐라 js 크롬 앱 만들기 2주 챌린지
## 1일차 
### 1. javascript에 대해서
+ 자바스크립트는 프론트앤드의 유일한 언어이다
+ 자바스크립트는 10일안에 만들어진 언어이다.
+ 자바스크립트는 웹사이트의 인터랙티브한 기능을 넣기 위해 만들어졌다.
+ 
+ 브라우저에 탑재되서 다운로드 설치할 필요 없어 접근성이 좋다.
+ 3D, 러닝머신, 인터랙티브 웹, 리액트, 일렉트론 등 넓은 영역에서 사용이 가능하다.
+ 가능성은 무궁무진하다.
+ 자바스크립트는 브라우저에 HTML파일에 import 되서 실행된다.
+ `console`에는 자바스크립트를 쓸 수 있다.

### 2. [Repl.it 사용 안내](https://nomadcoders.co/faq/challenge/replit)

<br>
<br>
<br>


## 2일차
### 1. Basic Data Types
자바스크립트는 타입을 가진다.
모든 언어는 숫자와 텍스트를 가진다. 

#### 1. number 
+ interger = full number : 2, 3, 6,
+ float : 1.5
+ 2 + 1.5 // 3.5
#### 2. String
처음부터 끝까지 텍스트로 이루어진 것
+ 텍스트 (text)
+ `"Hi"` + `"I'm kim"` => `" Hi I'm kim"`
+ 문자는 따옴표("")를 사용해 텍스트라는 것을 자바스크립트 엔진에 알려줘야 한다.
+ 따옴표(" ")안에 있는 공백도 텍스트로 인식해 나타난다.
+` "Hi    !"` +` "I'm kim"` => `"Hi    ! I'm kim"`

<br>

### 2. Variables
`console.log()` : 콘솔에 ()안에 값을 출력하도록 하는 메서드
```javascript
console.log(12345);
console.log("lalalal");
console.log('lalalala);
```
()안에는 숫자, 문자, 연산식을 넣을 수 있다.
```javascript
console.log(5 + 2); //7
console.log(5 * 2); //10
console.log(5 / 2); //2.5
```
만약 이 예제에서 숫자를 바꾸고 싶다면 어떻게 할까??
하나하나씩 수정해야 한다. 그러면 총 6번을 수정해줘야 한다. <br>
아주 번거롭고 비효율적이다.

따라서, variable을 사용한다.

>`variable`은 값을 저장하거나 유지하는 역활을 갖는다.

+ `const` : 상수, none change, 바뀌지 않는 값, 계속해서 유지되는 값
```javascript
const a = 5;
const b = 2;  

console.log(a + b); //7
console.log(a * b); //10
console.log(a / b); //2.5
```
계산하고 싶은 값을 바꾸고 싶다면 a와 b의 값을 바꾸면 되니까 최대 2번만 바꾸면 된다.


+ 변수의 이름을 어떻게 정해야 하는 걸까?
변수의 이름에는 공백을 사용할 수 없다. 
띄어쓰기를 써야한다면 첫 글자를 대문자로 써서 연결해준다.<br>
이것을 `카멜케이스`라고 한다.
```javascript
const = VeryLongVariableName = 0;
```
+ 파이썬 방식은 `스네이크 케이스(snake_case)`라고 한다.

<br>

### 3. const and let
### const 
> can not change <br>
값을 업데이트 할 수 없다.

### let 
> 값을 업데이트 할 수 있다.


    개발자의 의도를 빠르게 파악할 수 있고, 코드를 해석하는데 많은 도움을 주기도 한다.

    그러면 뭐를 써야 할까???<br>
    대부분의 프로그래머들은 const를 기본으로 쓰고 업데이트를 하고 싶다면 let을 사용한다.
    따라서, 대부분 const를 사용하고 필요할 떄마다 let을 사용한다.

#### <span style="background-color:#fff5b1; font-size : 1.5rem">always const, sometimes let, never use var</span>

<br>

### 4. Booleans & null & undefined
#### Booleans(`true`, `false`)
+ `true` : means "on"
+ `false` : means "off"
####  `null` : there is nothing here( 아무 것도 채우지 않은 상태)<br>
+ 자바스크립트 엔진에 값이 "없다"는 것을 알려줄 때 쓴다. 
+ "비어 있다"라는 것을 의도적으로 표현한다.
+ 변수도 있고 값도 있는 상태

####  `undefined` :
+ 변수를 만들었는데 값을 아무것도 안주면 undefined가 나온다.
+ 메모리 속 공간은 있는데 내용이 없는 상태
+ 변수는 있는데 값이 없는 상태

<br>

### 5. Array
데이터를 정리하는 법이라고 생각하면 좋다.<br>
가장 기초적이고 필수적인 데이터 구조이다.

>array의 목적은 하나의 variable 안에 테이더 list를 가지는 것.

`[](대괄호)` 안에 `,(쉼표)`를 이용해 안에 있는 데이터를 나열한다.
```javascript
const dayOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat"];
```
+ 테이터로 이루어진 리스트를 만들면서 필요한 데이터를 가져올 수 있다.
+ 숫자, 변수, string, null, undefined, booleans 도 넣을 수 있다.

+ array안의 데이터를 접근하고 싶다면, varialbe의 이름을 적고 대괄호([])를 열어 우리가 얻고 싶은 항복의 번호를 넣고 대괄호를 닫아준다.
    ```javascript
    //I want to get "fir"!
    console.log(dayOfWeek[5]);
    //but console has "sat"!
    ```
  + but!<br>
    콘솔에 출력한 값은 "sat"을 출력했다.<br>
    컴퓨터는 숫자를 0부터 세기때문에 [5]라면, array의 6번째 데이터를 출력한다.!!!<br>
    그래서 "fir"값을 출력 받고 싶다면, `console.log(dayOfWeek[4]);`로 출력해야 한다.

#### array안에 내용 추가하기 : `push()`
>항목 하나를 array에 넣어준다.

```javascript
dayOfWeek.push("sun");
console.log(dayOfWeek);
//(7)["mon", "tue", "wed", "thu", "fri", "sat","sun"]
```
<br>

### 6. Objects
>property를 가진 데이터를 저장한다. (값에 의미를 부여할 수 없는 배열과 다르게 값에 의미를 부여 할 수 있다.)
```javascript
const player = {
    name : "kim",
    pointer : 1212,
    hansome : false,
    fat : false
}
```
+ { }(중괄호)와 프로퍼티와 값, ,(쉼표)로 이루어져 있다.
+ Array vs Object
  + Array는 의미있는 값으로 접근 할 수 없다. 접근할려면 인덱스값으로 접근해야 한다.
  + Array는 vairalbe의 이름에 포괄적인 의미를 가지고 있어 element 각 각 의미를 내포하지 못한다.
  
  + 따라서 element당 각 내포하는 의미를 가지고, 의미로 접근하는 방법으로 Object를 사용한다.


#### Object에 접근하는 방법 
+ Object는 console.log에 사용하는 .(dot)log의 형태를 가지고 Object안에 접근할 수 있다.
> 1. Object.xxxx
> 2. Object["xxxx"]

```javascript
console.log(player.name);
//kim
console.log(player["name"]);
//kim
```

#### Object안을 수정(업데이트)하는 방법
원래 가지고 있던 값인데 그 값에 다시 값을 할당하면 업데이트가 된다.
+ Objcet.xxx = some value;
```javascript
console.log(player);
//{name : "kim",pointer : 1212,hansome : false, fat : false }
player.fat = ture;
//player안에 있는 fat의 값을 변경했다.
console.log(player);
//{name : "kim",pointer : 1212,hansome : false, fat : false }
```

>Q. const는 값을 변하지 않는 값을 저장하는데 const로 선언한 Object는 어떻게 수정이 되네??
>+ `Object.xxxx = false;` 인 경우에는 Object 전체를 바꾸려고 하기 떄문에 변경 되지 않고 에러가 나온다.(식별자가 가르키는 메모리 주소를 아예 바꿔야 해서 불가능하다.)
하지만, Object안에 있는 내용을 수정하는 것은 가능하다.(식별자가 가르키고 있는 주소는 바뀌지 않고 주소 안에 있는 내용이 수정되는 것으로 생각하면 좋다.)

#### Object안에 내용 추가하는 방법
+ Object.yyyy = value;<br>
Object안에 없는 값(yyyy)에 값을 할당하면 Object에 추가가 가능하다.
```javascript
player.nickname = "kkkk";
console.log(player);
//{name : "kim",pointer : 1212,hansome : false, fat : false , nickanem : "kkkk"}

```

<br>
<br>
<br>

## 3일차
### 1. Function

가능한 적은 코드로 프로그래밍해야 한다.<br>
function은 코드를 캡슐화해서 반복적인 일에 사용할 수 있다.
> function 함수이름(){실행코드};

+ 함수를 반복해서 호출할 수 있다. 함수는 플레이 버튼과 비슷한 역활을 가진다.
```javascript
function sayHello(){
  console.log("Hello");
}

sayHello();
sayHello();
sayHello();

```
이렇게 하면 호출을 열러번하면 함수를 여러번 실행할 수 있다.

### 2. argument
또한 여러가지 일을 함수를 통해 가능하도록 만들기 위함이다.

 ##### 함수에 데이터 보내기(send)
 + `argumnent`(인수)  : function을 실행하는 동안 어떤 정보를 function에게 보낼 수 있는 방법
 테이터를 보내는 방법=> `()`안에 데이터를 넣어주면 된다.

 ```javascript
sayHello("nico");
sayHello("dal");
sayHello("lyn);
```
이 경우 sayHello()함수에 데이터(어떠한 정보- "nico", "dia", "lyn")를 넣어주고 있다.

#### 함수에서 데이터를 받고 활용하기(receive)

```javascript
function sayHello(nameOfPerson){
  console.log(nameOfPerson);
}

sayHello("nico");
sayHello("dal");
sayHello("lyn");
```
함수 괄호()안에 argument에 varialble이름을 적어주고 실행 코드블록에 variable이름을 적어주면 데이터를 받아 활용 할 수 있다.

+ argument는 여러개 쓸 수 있다.<br>
그리고 argument는 function안의 body에서만 존재한다.
```javascript
function sayHello(nameOfPerson, age){
  console.log("Hello my name is " + nameOfPerson + "and I'm " + age);
}

sayHello("nico", 20);
sayHello("dal", 22);
sayHello("lyn",233);
```
+ argument의 순서를 주의하자
```javascript
function plus(a,b){
    console.log(a + b);
};

plus();     //NaN
plus(8 , 60);
```
  + 만약 a 자리에 60이 들어가길 원한다면, plus(60, 8)로 작성해야 한다.
  + 그리고 이 예제에서 출력을 위해 argument가 필요한데 argument를 사용하지 않은 경우에는 NaN(Not a Number)가 나타난다.

+ 객체 안에 argument사용하기
```javascript

const player = {
    name : "nico",
    sayHello : function(otehrPersonName){
        console.log("hello! " + otehrPersonName + "nicd meet you")
    }
}
console.log(player.name);
player.sayHello("lyn");
player.sayHello("nico");

```
#### 복습 - 계산기 객체 만들기
```javascript
const calculator = {
    plus : function(a,b){
        console.log(a + b);
    },
    minus : function(a,b){
        console.log( a -b);
    },
    divide :  function(a, b){
        console.log(a/b);
    },
    times : function(a, b){
        console.log(a*b);
    },
    power : function(a,b){
      console.log(a ** b);
    }
}
calculator.plus(1,2);
calculator.minus(1,2);
calculator.divide(1,2);
calculator.times(1,2);
calculator.power(1,2);


```
<br>

### Return
계속해서 console.log를 이용해서 데이터를 출력했는데
console.log를 데이터를 활용하기에는 어려움이 있다.

어디에 값을 가지고 있거나, 저장, 또는 다른 값에 전달, 화면에 출력하기 위해서는 다르것을 사용하는 것을 좋다.

> 함수가 작동하고 그 결과를 코드로 받을 수 있다.
> function이 function의 밖과 소통하는 방법이다.
> function을 실행했을떄, 무언가를 실행하고 끝났을때 값을 반환해준다.

```javascript
console.log(calculator.plus(1,2););
//undefined
```
이 경우에 undefined가 나타난다. 함수의 코드 데이터가 있지 않고 출력만 했기 때문에 안에 있는 내용이 없다고 하는 것이다.

이떄 return을 사용해 함수의 값을 코드로 반환해 변수에 저장할 수 있다.

```javascript
const age = 96;
function calculateKrAge(ageOffForeigner){
    return ageOffForeigner + 2;
}
const KrAge = calculateKrAge(age);
console.log(KrAge); //96
```
console과 return과 차이점이 있다. 
console은 출력만하고 출력된 값을 가져다 쓸 수 없지만, return은 출력은 되지 않지만 함수가 실행한 값을 가지고 코드내에서 값을 가져다 사용할 수 있는 점에서 큰 차이점을 가진다.

<br>
<br>

### Conditionals(조건문)
true인지 false인지 알려주기 때문에 중요하다. (예. 로그인여부 등)
```javascript
const age = propmt("How old are you?");
```
+ prompt 는 사용자기 직접 입력 하게 한다.
+ prompt는 자바스크립트를 기다리게 한다.
+ 실행하면 실행한 페이지가 로딩하는 것 처럼 작동된다.
+ 브라우저가 만들어 놓은 방법이라 안예쁨
+ 요즘은 잘 안쓰고 직접 만들어서 모달창을 만든다.
+ cancel하면 null이 저장된다.
+ 입력한 값은 문자타입으로 받기때문에 데이터 변환이 필요하다.
+ 입력한 값은 다 값으로 받기 때문에 데이터 변환을 통해 원하는 값을 구분해야 한다.
+ 한 type을 받아서 다른 type으로 바꿀 수 있는 방법이 필요하다.
  + number값으로 변경해보자
  > `typeof` : 값의 type을 알고 싶을때 쓴다.
  > + typeof 변수명  or  typeof(변수명)

#### parseInt() 
> A string to convert into a number.
> parseInt("15") -> 15



<br>
<br>
<br>

## 4일차
### The Document Object

 + Document는 객체이다. 그래서 원하는 값을 가져다 쓸 수 있다.
 + 그리고 document의 프로퍼티의 값을 바꿀 수 있다.
 ```javascript
console.log( document.title);
//html파일에 입력한 title이 나온다.
 document.title = Hi~
console.log( document.title);   
//title이 Hi로 변경되었다.
```
+ 자바스크립트를 이용ㅇ해 html의 정보를 가져다 쓸 수 있으며, 변경도 가능하다.
+ `document`는 모든 것의 시작점이면서 website를 의미한다.
```javascript
document.body
//html의 안에 있는 body태그를 보여준다.
```
<br>

### HTML in Javascript
특정한 무언가를 가져오는 방법을 알아보자
+ 자바스크립트파일에서 html elemnent를 가져오는 것은 가장 중요한 개념중에 하나이다.
+ 매우 중요함으로 이 개념은 머리속에 기억하도록 하자

> `html element를 가져온다. ` →  `자바스크립트를 통해 변경`

#### 1. 값을 가져온다. => getElementById()
>자바스크립트로 html에 있는 id의 값을 element를 가져올 수 있으며, 이것을 통해 자바스크립트가 값을 변경할 수 있다.
(class의 값을 가져올 수도 있다.)

```javascript
const title = document.getElementById('title');

title.innerText = "Got you!"
console.log(title.id);      //title
console.log(title.className);     //
```
자바스크립트에 의해 안에 있는 내용을 바꾸었다.<br>
또한 변수 title의 id를 조회하면 "title"이 출력되지만, 
class를 조회하면 class를 부여하지 않았기 떄문에 아무것도 출력하지 않는다.

<br>

## Searching For Elements
+ class를 이용한 방법
### getElementsByCalssName()
> element를 한번에 가지고 와야 하는 경우 사용하는데 class이름이 같은 것들을 배열(array)로 가져와 준다.
```javascript
const hellos = document.getElementsByClassName("hello");

console.log(hellos);
//HTMLCollection(6) [h1.hello, h1.hello, h1.hello, h1.hello, h1.hello, h1.hello]
```

### getElementsByTagName();
>()안에 있는 태그 들을 모두 가져와 배열로 만든다.

### querySelector();
> querySelector는 elemnet를 css방식으로 검색할 수 있다.
즉 css처럼 감싸고 있는 태그 속에 있는 태그를 직접 선택할 수 있다.
css selector처럼 사용할 수 있다.

```javascript
const title = document.querySelector(".hello h1");

console.log(title);
//<h1>Grab me!</h1>
```
+ css처럼 쓸 수 있어서 쓰기 편해서 자주 사용하는 경우가 많다.
+ `querySelector()`는 만약 여러개에 부합한 값이 있다면 `첫번째꺼` `only하나만` 나오게 된다.
+ elelment를 출력해준다. (배열이 아니라)
```javascript
const title = document.querySelector("#hello");
const title2 = document.getElementId("hello");
```
`title1`과 `title2`는 똑같은 일을 한다.<br>
`getElementId()`는 지정한 element의 하위 element를 지정할 수 없다는 차이점이 있다. 

다른 예제롤 보자.
```html
<div class="hello">
        <h1>Grab me 1!</h1>
    </div>
    <div class="hello">
        <h1>Grab me2!</h1>
    </div>
    <div class="hello">
        <h1>Grab me3!</h1>
    </div>
```
```javascript
const title = document.querySelector(".hello h1");
console.log(title);
//<h1>Grab me 1!</h1>
```
만약 여기서 모든 element를 가져오고 싶다면 ?
### querySelectorAll();
>querySelector()의 조건에 부함하는 모든 element를 가져오고 싶을떄 사용한다.
+ 배열로 출력해준다.
```javascript
const title = document.querySelectorAll(".hello h1");
console.log(title);
//NodeList(3) [h1, h1, h1]
```
<br>

### Events
>클릭, 마우스를 올라가는 것, 입력을 끝내거나 enter를 누른다. wifi에 접속하는 등의 모든 것들

#### evnet를 listne해야 한다. => addEventListener
+ 유저의 행동을 listen하여 event를 실행한다. 
>addEventListener는 이벤트를 listen하는 건데 어떤 이벤트를 listen해야하는지 알려줘야 한다.(우리는 모든 이벤트가 필요한것이 아니라 한가지 이벤트를 이용하고 싶으니까)

```javascript
const title = document.querySelector(".hello h1");

function handTitleClick(){
    console.log("title was clicked");
}

title.addEventListener('click', handTitleClick);

```
+ title를 클릭하면 console에 "title was clicked"가 출력된다.
+ 이때 중요한 것은 이벤트 함수의 두번쩨 인수에는 함수 이름을 넣을떄 `()`을 넣지 않고 입력해줘야한다. 자바스크립트 엔진이 알아서 함수를 호출할 수 있도록 하기 위함이다.
<br>

### Events part Two
+ 이벤트의 종류를 알고 싶을때

1. [MDN 페이지](https://developer.mozilla.org/en-US/docs/Web/API/Element#events)를 통해 이벤트를 조사할 수 있다.

2. `console.dir()`를 통해 on으로 시작하는 속성들은 모두 이벤트를 나타낸다.


#### 마우스 이벤트알아보기(mouseenter, mouseleave)
+ `mouseenter` : 마우스가 올라가면 실행되는 이벤트
+ `mouseleave` : 마우스가 지정한 element를 떠나가면 실행되는 이벤트

```javascript
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
title.addEventListener('click', handTitleClick);
title.addEventListener('mouseenter',handleMouseEnter);
title.addEventListener('mouseleave',handleMouseLeave);
```

<br>

### More Events
+ 이벤트를 실행에 또다른 실행 코드
```javascript
title.onclick = handTitleClick;
title.onmouseenter = handleMouseEnter;
title.onmouseleave = handleMouseLeave;
```
  하지만 이 방법보다는 `addEventListener`를 이용하는데 그 이유는 `removeEventListenr`를 이용해 제거할 수 있기 때문이다.


#### [window MDN](https://developer.mozilla.org/ko/docs/Web/API/Window) : 윈도우 이벤트 찾아서 적용해보기
```javascript

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

```

+ `resize` : 윈도우 창이 변경되면 실행되는 이벤트
+ `copy` : 윈도우에 복사가 이러나면 실행되는 이벤트
+ `offline` : wifi가 없으면 일어나는 이벤트
+ `online` : wifi가 연결되면 일어나는 이벤트

이 모든 이벤트들은 자바스크립트에서 지원하고 있다.
필요에 따라 이벤트를 찾아보는 자세가 필요해 보인다.

## 5일차
### CSS in Javascript
자바스크립트 파일 안에서 css인 style을 이용해 색상을 변경해보자
```javascript
const h1 = document.querySelector(".hello h1");

function handTitleClick(){
    if(h1.style.color === "blue"){
        h1.style.color = "tomato";
    }else{
        h1.style.color = "blue"
    }
}

h1.addEventListener("click", handTitleClick);
```
+ if문을 이용해 style.color가 blue이면 tomato색으로 변경하고, 그렇지 않으면 blue를 넣어 색상을 변경한다.

하지만 공통된 단어가 반복 됨으로 `h1.style.color`를 변수에 넣어 사용하여 코드를 사용이 좋게 하도록 한다.

```javascript
const h1 = document.querySelector(".hello h1");

function handTitleClick(){
    const currentColor = h1.style.color;
    let newColor;
    if(currentColor === "blue"){
        newColor = "tomato";
    }else{
        newColor = "blue"
    }
    h1.style.color = newColor;
}

h1.addEventListener("click", handTitleClick);
```
+ `currentColor`에 반복되었던 `h1.style.color`를 저장한다.
+ `let newColor`변수를 생성해 if문 안에서 h1에 조건 상황에 맞는 색상을 할당해 준다.
+ if문이 끝나면 `newColor`에 할당되어 저장된 색상이 `h1.style.color`에 적용되게 해준다.
+ 그러면 클릭했을때 우리가 원하는 결과를 얻을 수 있다.

하지만, element의 style을 자바스크립트 안에서 변경하는 것은 좋은 방법이 아니다. 왜냐하면 style을 관여한느 파일인 css가 있음에도 자바스크립트에서 변경하게 되면 스타일에 대한 코드가 섞여 나중에는 찾기 어려워져 유지보수하는데에 어려움이 있다.

따라서 스타일은 css를 통해 설정하고 그것을 가져와 제어하는 것이 가장 바람직하다.

>**이벤트 함수 다루기** 
>1. html의 element를 가져온다. → 2. element에 이벤트를 걸어준다.  →  3. 이벤트 함수에 동작을 적용한다.

<br>

### CSS in javascript 2
css는 style에 적합한 일을 하기 위한 언어임으로 그게 맞는 일을 할 수 있도록 코드를 작성해 주어야 한다.

> `className` : element의 class를 조회할 수 있으며, 할당할시 이전의 class를 고려하지 않고 이전 class를 삭제하고 새로 할당한 class를 추가 한다.

```css
body{
    background-color: beige;;
}

h1{
    color : cornflowerblue
}

.active{
    color: tomato;
}
```
css에 바꾸고자하는 색상을 클래스로 설정해준다.

```javascript
const h1 = document.querySelector(".hello h1");

function handTitleClick(){
   h1.className = "active";
}

h1.addEventListener("click", handTitleClick);
```
자바스크립트로 css를 바꾸지 않고 html의 요소를 추가하는 방법으로 html과 상호작용하는 코드(` h1.className = "active";` - h1에 class "active"를 추가해준다.)로 작성한다. 그러면 본래의 자바스크립트의 역활인 html과 상호작용만을 통해 style을 바꿀 수 있게 된다.

```javascript
const h1 = document.querySelector(".hello h1");

function handTitleClick(){
    if(h1.className === "active"){
        h1.className = " ";
    }else{
        h1.className = "active";
    }
}

h1.addEventListener("click", handTitleClick);
```
+ if문을 이용해 클래스 active가 있으면 " "(빈문자열)을 할당하고, 없으면 "active"가 할당되게 하게 해서 글자의 색상을 클릭할때마다 변화하도록 했다.

+ 이 코드에서 "active"로 할당한 값은 사람의 실수로 에러를 발생시킬 수 있는 위험성이 있다. 그리고 active의 값이 아닌 다른 클래스로 변경하고 싶어질때 여러번 그 작업을 수행해야 함으로 유지보수와 에러에 취약할 수 있는 단점이 있다.

+ 따라서 "active"를 변수에 넣어 관리하면 이름이 변경되어 수정할때 수정이 용이하다.
```javascript
const h1 = document.querySelector(".hello h1");

function handTitleClick(){
    const clickedClass = "active";
    if(h1.className === clickedClass){
        h1.className = " ";
    }else{
        h1.className = clickedClass;
    }
}

h1.addEventListener("click", handTitleClick);
```
`const clickedClass = "active";`를 넣어 사용하게 되면 active의 이름이 변경되어도 이 변수의 값만 변경하면 되고, 또한 자바스크립트에서 실수를 알려주기도 하기 때문에 문자보다는 변수의 식별자를 이용해 작성하는 것이 좋다.

+ 하지만, 이곳에서도 작은 버그가 있다.

그 버그는 만약 `h1`이 원래 가지고 있는 class가 있다면 현재의 코드를 실행하게 된다면 원래 가지고 있는 코드를 날리고 교체가 되는 것임으로 원래의 class를 유지하기 어려워진다.

### CSS in Javscript 3
원래 가지고 있는 클래스를 삭제하지 않고 class를 추가한다.
> `classList` : class들의 목록으로 작업할 수 있게 허용해준다. 
> + 여러가지 옵션을 가지고 있다. ( `contains`, `add`, `remove` 등)
> 1. `contains()` :  ()안에 클래스를 포함하고 있는지에 대한 여부를 알 수 있다.
>1. `add()` : ()안에 클래스를 element에 다른 클래스에 영향을 주지 않고 추가할 수 있다.
> 1. `remove()` : ()안에 클래스만 제거할 수 있다.

```javascript
const h1 = document.querySelector(".hello h1");

function handTitleClick(){
    const clickedClass = "active";
    if(h1.classList.contains(clickedClass)){
        h1.classList.remove(clickedClass);
    }else{
        h1.classList.add(clickedClass);
    }
}

h1.addEventListener("click", handTitleClick);
```
+ 이렇게 하면 기존에 있는 클래스에 영향을 주지 않고 클래스를 추가하고 제거할 수 있다.
>4. `toggle()` : ()안에 있는 클래스가 없다면 추가해주고, 있다면 제거해주는 함수
>+ 위 예제에서 작성했던 if문안에 `contains`, `add`, `remove`등의 코드를 사용하지 않고 한줄로 코드를 작성할 수 있다.

```javascript
function handTitleClick(){
    h1.classList.toggle("active");
}
```
+ `toggle`은 "active"가 있는지 체크하고, 없다면 추가, 있다면 제거를 해준다.
+ "문자열"은 2개 있을때는 const로 묶어 관리하지만, 한번만 사용한다면 문자열 그대로 사용하도록 하자.
