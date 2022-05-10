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


