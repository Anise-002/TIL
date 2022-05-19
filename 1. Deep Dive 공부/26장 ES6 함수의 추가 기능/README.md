# 26장. ES6함수의 추가 기능
## 26.1 함수의 구분
### ES6 이전
ES6 이전의 함수는 사용 목적에 따라 명확히 구분되지 않았다. 따라서 모든 함수는 일반 함수로서 호출할 수 있는 것은 물론, 생성자 함수로서 호출 할 수 있다.
+ 모든 함수는 callable 이면서 constructor이다.
  + `callable` : 호출할 수 있는 함수 객체
  + `constructor` : 인스턴스를 생성할 수 있는 함수 객체
+ 즉, 메서드 또한 callable이고, constructor이다.
+ 콜백함수또한 constructor이기 때문에 불필요한 프로토타입 객체를 생성한다.

> 명확한 구분이 없어 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성할 수 있다.
혼란스럽고 실수를 유발 시킬 수 있는 가능성이 다분하다.

### ES6 이후
함수를 사용 목적에 따라 세 가지 종류로 명확히 구분했다.
#### 1. 일반 함수(Normal) 
>+ `constructor` : ㅇ
>+ `prototype` : ㅇ
>+ `super` : x
>+ `arguments` : ㅇ

#### 2. 메서드(Method) 
>+ `constructor` : x
>+ `prototype` : x
>+ `super` : ㅇ
>+ `arguments` : ㅇ

#### 3. 화살표 함수(Arrow) 
>+ `constructor` : x
>+ `prototype` : x
>+ `super` : x  <br> → `super`을 가지고 있지 않아 상위스코프의 것을 참조한다.
>+ `arguments` : x   <br>→ `arguments`가 없어 자신이 받은 인수를 조회할 수 없다. ES6에 도입된 `rest파라미터`를 이용해 조회 할 수 있다.


 <br>
 <br>

  
## 26.2 메서드
  > ES6사양에서의 메서드는 `축약 표현으로 정의된 함수`만 의미한다.
  
```javascript
const obj = {
  x : 1,
  //foo는 메서드이다.
  foo(){return this.x};
  //bar에 바인딩된 함수는 메서드가 아닌 일반 함수이다.
  bar : function(){return this.x;}
};
```
+ ES6 사양에서 저의한 메서드는 인스턴스를 생성할 수 없는 `non-constructor`이다. 
  + 생성자 함수로서 호출 할 수 없다.
  + 인스턴스를 생성할 수 없으므로 `prototype`프로퍼티가 없고 프로토타입도 생성하지 않는다.
+ ES6메서드는 내부슬롯 [[HomeObject]]를 갖는다.
  + 자신을 바인딩한 객체를 가리키는 내부슬롯
  + 따라서 `super`키워드를 사용할 수 있다.
+ ES6 메서드는 본연의 기능(super)을 추가하고 의미적 맞지 않은 기능(constructor)를 제거했기에 <u>메서드를 정의할때에는 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6이전 방식은 사용하지 않는 것이 좋다.</u>
<br>
<br>

## 26.3 화살표 함수
> function 키워드 대신 `화살표(=>, fat arrow)`를 사용하여 기존의 함수 정의 방식보다 간략하게 함수를 정의한다.
+ 표현과 내부 동작 모두 기존 함수보다 간략하다.
+ <span style="background-color: #fff5b1">콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하기 위한 대한으로 유용하다.</span>
  
### 1. 화살표 함수 정의
#### 1-1. 함수 정의
  >+ 함수 선언문으로 정의 할 수 없고 표현식으로 정의해야 한다.
  >+ 호출 방식은 기존 함수와 동일하다.
  
```javascript
  const multiply = (x,y) => x * y;
  multiply(2,3);
```

#### 1-2. 매개변수 선언
1. 매개변수가 여러개일 경우 : `소괄호(  )` 안에 매개변수를 선언한다.
```javascript
const arrow = (x,y) => {...};
```
2. 매개변수가 한 개인 경우 : `소괄호(  )`를 생략 할 수 있다.
```javascript
const arrow = x => {...};
```
3. 매개변수가 없는 경우 : `소괄호(  )`를 생략 할 수 없다.
```javascript
const arrow = () => {...};
```

#### 1-3. 함수 몸체 정의
1. 몸체가 하나의 문으로 구성 : `중괄호{  }`를 생략 할 수 있다.
    + 이때, 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.
    ```javascript
	//concise body
    const power = x => x ** 2;
    power(2);

    //위 표현은 다음과 동일하다.
    //block body
    const power = x => {return x ** 2};

    ```
   + `중괄호{  }`을 생략 한 경우, 내부의 문이 표현식이 아닌 문이라면 에러가 발생한다.(표현식이 아닌 문은 반환할 수 없기 때문이다)
2. 함수 몸체에 문이라면 `중괄호{  }`를 생략 할 수 없다.
3. 객체 리터럴을 반환하는 경우 : 객체리터럴을 `소괄호(   )`로 감싸줘야 한다.
   + `소괄호(   )`로 감싸지 않은면 객체리터럴 기호를 함수 몸체를 감싸는 중괄호로 해석한다.
4. 함수 몸체가 여러개의 문으로 구성 : `중괄호{  }`를 생략 할 수 없다.
또한, 반환값이 있다면 명시적으로 반환해야 한다.
5. 화살표 함수도 즉시 실행 함수로 사용 할 수 있다.
6. 화살표 함수는 일급 객체이므로, `Array.prototype.map`,`Array.prototype.filter`,`Array.prototype.reduce`같은 고차 함수에 인수로 전달 할 수 있다.
    + 이 경우, 일반 함수보다 표현이 간결하고 가독성이 좋다.
    ```javascript
    //ES5 
    [1,2,3].map(function(v){
      return v * 2;
    });

    //ES6
    [1,2,3].map(v => v *2); 
    //[2,4,6]
    ```

### 2. 화살표 함수와 일반 함수의 차이
> 1. 화살표 함수는 인스턴스를 생성 할 수 없는 `non-constructor`이다.
2. 중복된 매개변수 이름을 선언할 수 었다.
   + 일반함수는 가능했으나 화살표 함수는 그렇지 않다.
3. 화살표 함수는 함수 자체의 `this`,`argument`, `new.target` 바인딩을 갖지 않는다.
    + 화살표 함수 내부에서 참조할때 스코프 체인을 통해 상위 스코프의 `this`,`argument`, `new.target`를 참조한다.
    + 만약 그 상위 스코프에도 없다면 스코프 체인상 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수를 참조한다.
    
### 3. this
화살표 함수가 일반 함수와 구별되는 가장 큰 특징이다.<br>
함수는 호출될때 this가 결정되는 동적으로 결정되는데 콜백함수일때 문제가 생긴다. 콜백함수로서 함수가 호출될 경우 콜백함수는 일반함수로 호출된다.따라서 함수가 가지고 있는 this가 전역객체에 바인딩 되어 전역객체로 this를 가리키게 되어 의도한 값을 출력해내지 못하고 엉뚱한 값을 가져온다.

#### 이 현상을 막기 위해 ES6이전에 사용한 방법
1. this를 회피시켜 다른 변수에 넣고 그것을 이용하도록 한다.
```javascript
...
add(arr){
  //this를 회피시킨다.
  const that = this; //이렇게 하면 add가 호출될때의 this를 그대로 사용할 수 있다.
  return arr.map(function(item){
    //this대신 정의한 that을 참조한다.
    return that.prefix. + ' ' + item;
  });
}
```
2. `Array.prototype.map`의 `두번째 인수`로 this를 전달한다.
   + map은 "콜백 함수 내부의 this문제"를 해결하기 위해 두번째 인수로 콜백 함수 내부에서 this로 사용할 객체를 전달 할 수 있다.
```javascript
...
add(arr){
  return arr.map(function(item){
    //this대신 정의한 that을 참조한다.
    return that.prefix. + ' ' + item;
  },this);
  //this에 바인딩된 값이 콜백함수 내부의 this에 바인딩 된다.
}
```
3. `Function.prototpye.bind`메서드를 사용해 this를 바인딩한다.
```javascript
...
add(arr){
  return arr.map(function(item){
    //this대신 정의한 that을 참조한다.
    return that.prefix. + ' ' + item;
  }.bind(this));
  //this에 바인딩된 값이 콜백함수 내부의 this에 바인딩 된다.
}
```

#### ES6 이후 - 화살표 함수를 사용해 해결 할 수 있다.
```javascript
class Prefixer{
  constructor(prefix){
    this.prefix = prefix;
  }
  
  add(arr){
    return arr.map(item => this.prefix + item);
  }
}
```
화살표 함수는 <u>**lexical this**</u> 작동한다.
+ 화살표 함수는 `함수 자체에 this 바인딩을 갖지 않는다.`
+ 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
+ 즉, 레시컬 스코프처럼 화살표 함수와 this가 함수가 정의된 위치에서 정의된다느느 것을 의미한다.

따라서 함수 내부의 this가 바인딩 되지 않으므로 일반 식별자처럼 스코프 체인을 통해 상위 스코프에서 this를 탐색하게 된다.

화살표 함수끼리 중첩이 되어 있다면 상위 화살표 함수에도 this가 바인딩이 없으므로 스코프체인 상 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.

+ 프로퍼티에 할당한 화살표 함수도 이와 같이 동작한다.
+ `Function.prototype.call`,`Function.prototype.apply`,`Function.prototype.bind`메서드를 사용해도 화살표 함수 내부의 this를 교체 할 수 없다.

+ 일반 메서드와 프로토타입 객체의 프로퍼티는 전역 this를 가리키기 때문에 화살표 함수로 정의하는 것은 피해야한다.

+ 클래스 필드에 할당한 화살표 함수는 인스턴스 메서드가 된다.
   + this가 바인딩이 되어 있지 않으니, this를 참조하기 위해 상위 스코프로 올라가는데 class의 this는 인스턴스를 가리키고 있기 때문에 클래스 필드에 할당된 화살표 함수는 인스턴스의 메서드가 된다.

### 4. super
>화살표 함수는 함수 자체에 super 바인딩을 갖지 않는다.
>따라서 this와 마찬가지로 상위 스코프에서 super를 참조한다.

### 5. arguments
> 화살표 함수는 함수 자체에 arguments를 바인딩을 갖지 않닫.
> 따라서 this, super와 마찬가지로 상위 스코프에서 참조한다.

+ arguments는 매개변수를 확정할 수 없는 가변 인자 함수를 구할 때 유용하게 사용된다. 

하지만, 화살표 함수는 자신이 받은 인수를 arguments에 넣을 수 없어 목록을 확인 할 수 없게 된다. 따라서 화살표 함수가 가변인자 함수를 구현해야 할 때는 반드시 `Rest 파라미터`를 사용한다.

<br>
<br>

## 26.4 Rest 파라미터
### 1. 기본문법
> 매개변수 이름 앞에 세개의 점 ...을 붙여서 정의한 매개변수이다.
Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달 받는다.

```javascript
function foo(...rest){
  console.log(resr);
}
foo(1,2,3,4);
//[1,2,3,4]
```
#### 1. 일반 매개변수와 파라미터는 함께 사용 할 수 있다.
 + 함수에 전달된 인수들은 매개변수와 Rest 파라미터에 순차적으로 할당된다.
```javascript
function foo(param, ...rest){
  console.log(param); //1
  console.log(rest); //[2,3,4,5]
}
foo(1,2,3,4,5);

function bar(param1,param2, ...rest){
  console.log(param1); //1
  console.log(param2); //2
  console.log(rest); //[3,4,5]
}
bar(1,2,3,4,5);
```
#### 2. Rest파라미터는 반드시 마지막 파라미터여야 한다.
   + 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된다.
  ```javascript
  function foo(...rest, x,y){}
  foo(1,2,3,4);
  //SyntaxError 
  ```
#### 3. Rest파라미터는 단 하나만 선언할 수 있다.
#### 4. Rest파라미터는 함수객체 `length`프로퍼티에 영향을 주지 않는다.

### 2. Rest파라미터와 arguments 객체
가변인자 함수의 인수 목록을 배열로 직접 전달받을 수 있다. 이를 통해 유사배열 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.
```javascript
function sum(...args){
  //Rest 파라미터 args에는 배열 [1,2,3,4,5]가 할당된다.
  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1,2,3,4,5));	//15
```
+ ES6에서 Rest파라미터와 arguments 객체를 모두 사용할 수 있다.
+ 화살표 한수는 함수 자체에 arguments 객체를 가지고 있지 않기 때문에 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시  Rest파라미터를 사용해야 한다.

## 26.5 매개변수의 기본값
자바스크립트 엔진이 매개변수의 개수와 인수의 개수를 체크하지 않는다. 따라서 인수가 전달되지 않은 매개변수의 값은 `undefined`이다. 
그래서 코드 내에 인수체크 및 초기화 코드를 적어줘야 에러가 발생하지 않는 번거로움이 있다.
 
>ES6에 도입된 매개변수 기본값을 사용하면 함수 내에 수행하던 인수 체크 및 초기화를 간소화 할 수 있다.
>매개변수 기본값은 매개변수에 인수를 전달하지 않은 경우와 undefined를 전달한 경우에만 유효하다.-> null을 매개변수 인수로 전달하면 null로 변화된다.

```javascript
function sum(x = 0, y = 0){
  return x + y;
}
console.log(sum(1,2)); 	//3
console.log(sumg(1));	//1
```
+ Rest 파라미터에는 기본값을 지정할 수 없다.
+ 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 length프로퍼티와 arguments객체에 아무런 영향을 주지 않는다.
```javascript
function sum(x = 0, y= 0){
  console.log(arguments);
}
console.log(sum.length);	//1

sum(1)	//Arguments{ '0' : 1}
sum(1,2)	//Arguments{'0':1, '1':2}
```