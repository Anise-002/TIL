# 21장. 빌트인 객체
## 21.1 자바스크립트 객체의 분류
### 표준 빌트인 객체
>+ ECMAScript 사양에 정의된 객체를 말하여, 애플리케이션 전역 공통 기능을 제공
+ 자바스크립트 실행환경과 관계없이 언제나 사용할 수 있다.
+ 표준 빌트인 객체는 전역 객체의 프로퍼티로서 제공
+ 별도의 선언없이 전역 변수처럼 참조 할 수 있다.
+ `Object`  `String` `Number` `Boolean` `Symbol` `Math` `RegExp` `Array` `Map/Set` `WeakMap/WeakSet` `Function` `Promise` `Reflect` `Proxy` `JSON` `Error` 등 40여개가 있음

### 호스트 객체 
> 자바스크립트 실행환경(브라우저환경, Node.js환경)에서 추가로 제공하는 객체
+ 브라우저 환경에서는 클라이언트 사이드 Web API호스트 객체를 제공
(DOM, BOM, Canvas, XMLHttpRequest, requestAnimationFrame, SVG, Web Storage, Web Componint, Web Worker)
+ Node.js환경 : Node.js고유의 API를 호스트 객체로 제공


### 사용자 정의 객체
>기본 제공되는 객체가 아닌 사용자가 직접 정의한 객체

<br><br>

## 21.2 표준 빌트인 객체
>`Object`  `String` `Number` `Boolean` `Symbol` `Math` `RegExp` `Array` `Map/Set` `WeakMap/WeakSet` `Function` `Promise` `Reflect` `Proxy` `JSON` `Error` 등 40여개가 있음

+ `Math` `Reflect` `JSON`을 제외한 표준 빌트인 객체는 모두 인스턴스를 생성할 수 있는 생성자 함수이다.
+ 생성자 함수 객체인 표준 빌트인 객체는 프로퍼티타입 메서드와 정적 메서드를 제공한다.
+ 생성자 함수 객체가 아닌 표준 빌트인 객체는 정적 메서드만 제공

```javascript	
//1.String 생성자 함수에 의한 String 객체 생성
const strObj = new String('Lee'); //String{"Lee"}
console.log(typeof strObj);	//object

//2.Number 생성자 함수에 의한 Number 객체 생성
const numObj = new Number(123); //Number{123}
console.log(typeof numObj);	//object

//3.Boolean 생성자 함수에 의한 Boolean 객체 생성
const boolObj = new Boolean(true); //Boolean{true}
console.log(typeof boolObj);	//object

//4.Function 생성자 함수에 의한 Function 객체 생성
const func = new Function('x','return x * x'); //f anoymous(x)
console.log(typeof func);	//function

//5.Array 생성자 함수에 의한 String 객체 생성
const arr = new Array(1,2,3); //(3) [1,2,3]
console.log(typeof arr);	//object

//6.RegExp 생성자 함수에 의한 RegExp 객체 생성
const regExp = new RegExp(/ab+c/i); // /ab+c/i
console.log(typeof regExp);	//object

//7.Date 생성자 함수에 의한 StrinDateg 객체 생성
const date = new Date(); // Fri May 08 2020 10:43 ---
console.log(typeof date);	//object

```

+ 표준 빌트인 객체인 String을 생성자 함수로서 호출하여 생성한 String인스턴스의 프로토타입은 String.prototype 이 된다.
+ 그렇게 되면, prototype 프로퍼티에 바인딩된 객체는 다양한 기능의 빌트인 프로토타입 메서드를 제공하게 됨으로서, 인스턴스 없이 호출 가능한 빌트인 정적 메서드를 제공하게 된다.

 ####Number.prototyp의 프로로타입 메서드 
 1. toFixed : 소수점 자리를 반올림 하여 문자열을 반환한다.
```javascript
const numObj = new Number(1.5);
consol.log(numObj.toFixed());	//2
```

2. IsInteger : 인수가 정수(interger)인지 검사하여 그 결과 값을 Boolean으로 반환한다.
```javascript
const numObj = new Number(1.5);
console.log(numObj.IsInteger());	//false
```
<br><br><br>

## 21.3 원시값과 래퍼 객체
원시값은 객체가 아니다.그러니 프로퍼티나 메서드를 가질 수 없으나 객체처럼 동작하기도 한다.
```javascript
const str = 'Hello';

//원시 타입인 문자열이 프로퍼티와 메서드를 갖고 있는 객체처럼 동작한다.
console.log(str.length); 	//5
console.log(str.toUpperCase());	//HELLO
```
원시값을 객체처럼 사용하면 자바스크립트 엔진은 암묵적으로 연관된 객체를 생성하여 생성된 객체로 프로퍼티에 접근하거나 메소드를 호출하도록 하고 다시 원시값을 되돌린다.

이때 만들어지는 객체를 `래퍼 객체`라고 한다.

>`래퍼 객체` : 문자열, 숫자, 불리언 값에 대해 객체처럼 접근하여 생성되는 임시 객체
> + 래퍼객체는 생성자 함수의 인스턴스의 프로퍼티 메서드를 상속 받아 사용할 수 있다.


```javascript
const str = 'hi';

//원시 타입인 문자열이 래퍼 객체인 String 인스턴스로 변환된다.
console.log(str.legnth); 	//2
console.log(str.toUpperCase()));	//HI

//래퍼 객체로 프로퍼티에 접근하거나 메서드를 호출한 후, 다시 원시값으로 되돌린다.
cosole.log(typeof str); //string
```
>+ 래퍼객체의 처리가 종료되면 원시값으로 원래의 상태로 되돌아 가며 래퍼 객체는 사비지 컬렉션의 대상이 된다.

```javascript
//1.식별자 str은 문자열을 값으로 가지고 있다.
const str = 'hello';

//2. 식별자 str은 암묵적으로 생성된 래퍼 객체를 가리킨다.
//식별자 str의 값 'hello'는 래퍼 객체의 [[StringData]]내부 슬롯에 할당된다.
//래퍼 객체에 naem 프로퍼티가 동적으로 추가된다.
str.name = 'Lee';

//3.식별자 str은 다시 원래의 문자열, 즉 래퍼 객체의 [[StringData]]내부 슬롯에 할당된 원시값을 갖는다.
//이때 2에서 생성된 래퍼 객체는 아무도 참조하지 않은 상태이므로 가비지 컬렉션 대상이 된다.

//4. 식별자 str은 새롭게 암묵적으로 생성된(2에서 생성된 래퍼 객체와 다른) 래퍼 객체를 가르킨다.
// 새롭게 생성된 래퍼 객체에는 naem 프로퍼티가 존재하지 않는다.
console.log(str.name); 	//undefined

//5.식별자str은 다시 원래 문자열, 즉 래퍼 객체의 [[StringData]]내부 슬롯에 할당된 원시값을 갖는다.
//이때 4에 생성된 래퍼 객체는 아무도 참조하지 않은 상태이므로 가비지 컬렉션 상태가 된다.
console.log(typeof str, str);	//string hello
```
+ 숫자와 불리언 값도 문자열처럼 작용된다.
그러나, 불리언 값으로 메서드를 호출 하는 경우는 거의 없다.

+ ES6에서 심벌도 래퍼 객체를 생성한다.

#### 결론
> 문자열, 숫자, 불리언, 심벌은 암묵적으로 생성되는 래퍼 객체에 의해 마치 객체처럼 사용할 수 있으며, 표준 비트인 객체 String, Number, Boolean생성자 함수를 new 연산자와 함께 호출하며 문자열, 숫자, 불리언 인스턴스를 생성할 필요가 없으며 권장하지 않는다.
+ null, undefined는 래퍼객체를 생성하지 않는다. 객체처럼 사용하게 되면 에러가 발생한다.


<br>
<br><br>

## 21.4 전역 객체
### 전역객체란?
>코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체
+ 어떤 객체에도 속하지 않은 최상위 객체
+ 브라우저 환경 : `window`(selft, this, frames)
+ Node.js 환경 : `global`

### 특징
1. 전역객체는 개발자가 의도적으로 생성할 수 없다.
1. 전역객체의 프로퍼티를 참조할때 window(또는 global)를 생략 할 수 있다.
1. 전역객체는 Object, Number, String, Boolean, Function Array, RegExp, Date, Math, Promise 같은 표준 빌트인 객체를 프로퍼티로 가지고 있다.
1. 자바스크립트 실행환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다.
1. var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역, 그리고 전역 함수는 전역 객체의 프로퍼티가 된다.
1. let이나 const키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. (보이지 않은 개념적인 블록 내에 존재하게 된다.)
1. 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 window를 공유한다.

<br>

### 21.4.1 빌트인 전역 프로퍼티
1. `Infinity`
>무한대를 나타내는 숫자값 Infinity를 갖는다.
> + typeof NaN 의 값은 number을 갖는다.

1. `NaN`
> 숫자가 아님(Not-a-Number)을 나타내는 숫자값 NaN을 갖는다.
> + typeof NaN 의 값은 number을 갖는다.

1. `undefined`
> 원시타입 undefined를 값으로 갖는다.

<br>

### 21.4.2 빌트인 전역 함수
애플리케이션 전역에서 호출할 수 있는 빌트인 함수로서 전역객체의 메서드이다.

1. `eval`
>자바스크립트 코드를 나타내는 문자열을 인수로 전달 받는다. 
>+ 표현식이라면 문자열 코드를 런타임에 평가하여 값을 생성
>+ 표현식이 아닌 문이라면 런타임에 실행한다.
>+ 여러개의 문으로 이루어져 있다면 모든 문을 실행한다.

  eval 함수를 통해 사용자로부터 입력 받은 콘텐츠를 실행하는 것은 보안에 매우 취약하며, 코드 실행에 비해 처리 속도가 느려 <u>**eval함수의 사용은 금지해야 한다.**</u>

1. `isFinite`
> 전달받은 인수가 정상적인 유한수인지 검사한다.
>+ 유한수 : true
>+ 무한수 : false
>+ 숫자 타입이 아닌 경우 : 숫자타입으로 변환 후 검사를 수행
>+ NaN으로 평가된 값 : false

  ※ isFinite(null)은 true를 반환한다.
  null은  숫자로 반환하면 0이 됨으로 유한수이니 true가 된다.

1. `isNaN`
> 전달받은 인수가 NaN인지 검사하여 불리언 타입으로 반환한다.


1. `parseFloat`
>전달받은 문자열 인수를 부동 소수점 숫자, 즉 실수로 해석하여 반환한다.
1. `parseInt`
>전달받은 문자열 인수를 정수로 해석하여 반환한다.
1. `encodeURI`/`decodeURI`
> + `encodeURI` 
: 함수를 완전한 URI를 문자열로 전달받아 이스케이프 처리를 위해 인코딩한다.
 ```javascript
	const uriComp = 'http://example.com?name=이응모&job-----"
	let enc = encodeURI(uriComp);
	console.log(enc);
	//http://example.com?name=%EC%9K%D-----
  ```
>+ `decodeURI` 
: 인코딩된 URI를 인수로 전달받아 이스케이프 처리 이전으로 디코딩한다.

  <span style="font-size: 0.9rem ">※ 인코딩 
  : URI의 문자들을 이스케이프 처리하는 것을 의미한다. 
  ※ 이스케이프 처리 
  : 네트워크를 통해 정보를 공유할 때 어떤 시스템에도 읽을 수 있는 아스키 문자셋으로 변환하는 것(알파벳, 0~9의 숫자, -_.!~*'()문자는 이스케이프 처리에서 제외된다.)</span>

1. `encodeURIComponent`/`decodeURIComponent`
>+  `encodeURIComponent`
: 함수를 인수로 전달된 문자열을 URI의 구성요소인 쿼리 스트링의 일부로 간주한다. 따라서 쿼리 스트링 구분자로 사용되는 =, ? , & 까지 인코딩을 한다.
  ```javascript
	const uriComp = 'name=이응모&job=programmer&teacher';
	let enc = encodeURIComponent(uriComp);
	console.log(enc);
	//name%3D%----
  ```
> + `decodeURIComponent`
: 인코딩된 URI를 인수로 전달 받아 디코딩을 한다.




<br>

### 21.4.3 암묵적 전역

>스코프 체인을 통해 선언된 변수인지 확인 후 변수의 선언을 찾을 수 없다면 전역객체로 해석되어 전역 객체에 프로퍼티를 동적 생성하게 된다.
결국 전역 객체의 프로퍼티가 되어 마치 전역 변수처럼 동작하는 것

```javascript
//전역 변수 x는 호이스팅이 발생한다.
console.log(x); //undefined
//전역 변수가 아니라 단지 전역 객체의 프로퍼티인 y는 호이스팅이 발생하디 않는다.
console.log(y); //ReferenceError : y is not defined

var x = 10; //전역 변수

function foo(){
  //선언하지 않은 식별자에 값을 할당
  y = 20;	//window.y = 20;
}
foo();

//선언하지 않은 식별자 y를 전역에서 참조할 수 있다.
console.log(x+y); //30

```
+ 변수 없이 전역 객체의 프로퍼티로 추가되었을 뿐이라 변수 호이스팅이 일어나지 않는다.
+ 변수가 아니라서 프로퍼티를 `delete`연산자로 삭제할 수 있다.
```javascript
delete x; 	//전역변수는 삭제되지 않는다.
delete y; 	//프로퍼티는 삭제된다.

console.log(window.x);	//10
console.log(window.y); 	//undefined
```
<br>
<br><br><br>

# 18일차를 마치며
결국 19장인 프로토타입을 산을 넘지 못하고 3일동안 흐지부지 책만 읽다가 끝냈다. 정리를 하려고 했지만, 이해가 되지 않아 정리를 할 수가 없다.ㅎ
그래서 과감하게 모르고 이해 안되는 부분은 건너뛰고 다른 것을 먼저 공부하기로 했다. 이해안된다고 붙잡고 있자니 의욕도 안나고 부정적인 생각이 들어서 그 부분은 내가 어느정도 경험치를 얻고 다시 보기로 했다. 

그리고 모든 것을 이해하기보다는 큰 맥락을 이해하는 것으로 공부 초점을 맞췄다. "이런 것들이 있구나~"하는 정도로 공부하는 것이 지금의 내 수준에서는 맞는 것 같다.

이 챌린지를 하면서 다른 강의를 들으면 더 이해가 되는 부분도 있어써 얻은 것들이 있지만 공부한는 시간 동안 이해가 되지 않고 모호한 느낌의 답답함의 고통이 상당히 괴로웠다. 시작을 했으니 끝을 꼭 보고 싶다.

이제 약 목표한 40일 중에 약 20일을 앞두고 있다. 흐지부지하게 도중에 포기하는 것이 아니라 책의 마지막 페이지까지 보고 잘 끝맺음 맺어보고 싶다. 