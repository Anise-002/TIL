# 25장 클래스 (3)
## 25.8 상속에 의한 클래스 확장
### 1. 클래스 상속과 생성자 함수 상속
> 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것
+ 클래스는 상속은 문법이 기본적으로 제공된다. (`extends 키워드`)

```javascript
class Animail{
  constructor(age, weight){
    this.age = age;
    this.weight = weight;
  }
  
  eat(){return 'eat'};
  
  move(){return 'move'};
}

//상속을 통해 Animal클래스를 확장한 Bird 클래스
class Bird extends Animal{
  fly(){return 'fly'}
}

const bird = new Bird(1,5);

console.log(bird); 		//Bird{age : 1, weight : 5}
console.log(bird instanceof Bird);		//true;
console.log(bird instanceof Animal);	//true;

console.log(bird.eat());	//eat
console.log(bird.move());	//move
console.log(bird.fly());	//fly
```
+ 클래스 상속은 상속되어지는 클래스 속성을 사용하면서 자신만의 고유한 속성을 추가하여 확장한다.
+ 클래스 확장 코드 재사용 관점에서 매우 유용하다.
<br>
### 2.extends 키워드
>`extends 키워드`를 사용하여 상속받은 클래스를 정의한다.
+ `extends 키워드`의 역활은 수퍼클래스와 서브클래스 간의 상속 관계를 설정한다.
+ 클래스 간의 프로토타입 체인을 생성( 프로토타입 메서드, 정적 메서드 모두 상속 가능)

```javascript
//수퍼(베이스/부모)클래스
class Base{}

//서브(파생/자식)클래스
class Derived extends Base{}
```
1. `서브 클래스`(파생 클래스, 자식 클래스) : 상속을 통해 확장된 클래스
2. `수퍼 클래스`(베이스 클래스, 부모 클래스) : 서브 클래스에게 상속된 클래스
<br>

### 3. 동적 상속
> 생성자 함수를 상속 받아 클래스를 확장할 수 있다.
단, `extends 키워드` 앞에는 반드시 클래스가 와야 한다.

```javascript
//생성자 함수
function Base(a){
  this.a = a;
}

//생성자 함수를 상속받는 서브 클래스
class Derived extends Base{}

const derived = new Derived(1);
console.log(derived);	//Derived{a:1}
```
+ `extends 키워드` 다음에는 `클래스`, `[[Constructor]]내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식`을 사용 할 수 있다.
→ 이를 통해 동적을 상속받을 대상을 결정할 수 있다.

```javascript
fucntion Base1{}

class Base2{}

let condition = ture;

//조건에 따라 동적으로 상속 대상을 결정하는 서브 클래스
class Derived extends (condition ? Base1 : Base2){}

const derived = new Derived();
console.log(derived);		//Derived{}

console.log(derived instanceof Base1);	//true
console.log(derived instanceof Base2);	//flase
```
+ 이 예제에서 condition의 boolean값에 따라 Base1을 상속 받을지, Base2를 받을 지 결정이 되어 동적 상속이 이루어진다.
<br>

### 4. 서브클래스의 constructor
클래스에 constructor를 생략하면 비어있는 constructor가 암묵적으로 정의된다.

> 서브클래스에 constructor를 생략하면 암묵적으로 super(...args)가 정의된다.
```javascript
constructor(...args){super(...args)}
```

+ `super()`는 수퍼클래스의 constructor를 호출하여 인스턴스를 생성한다.
<br>

### 5. super 키워드
>`super 키워드`는 호출할 수도 있고, this와 같이 참조할 수 있는 특수한 키워드이다.
+ `호출` : 수퍼클래스의 constructor를 호출한다.
+ `참조` : 수퍼클래스의 메서드를 호출 할 수 있다.

#### 1. super호출
>super를 호출하면 수퍼클래스의 constructor(super-constructor)를 호출한다.

```javascript
//수퍼클래스
class Base{
  constructor(a,b){
    this.a = a;
    this.b = b;
  }
}

//서브클래스
class Derived extends Base{
  //다음과 같이 암묵적으로 constructor가 정의된다.
  //constructor(..args){super(...args)}
}

const derived = new Dervied(1,2);
console.log(derived);		//Derived{a:1,b:2}
```
+ 서브 클래스의 암묵적인 정의된 constructor의 super 호출을 통해 수퍼클래스의 constructor에 전달된다.

```javascript
//수퍼클래스
class Base{
  constructor(a,b){
    this.a = a;
    this.b = b;
  }
}

//서브클래스
class Derived extends Base{
  constructor(a,b,c){
    super(a,b);
    htis.c = c;
  }
}

const derived = new Derived(1,2,3);
console.log(derived);		//Derived{a:1, b:2, c:3}
```
+ 수퍼클래스에서 추가한 프로퍼티와 서브클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브클래스의 constructor를 생략 할 수 없다.
+ new 연산자와 함께 서브클래스를 호출하면서 전달한 인수 중에서 수퍼클래스의 constructor에 전달할 필요가 있는 인수는 서브클래스의 super를 통해 전달 된다.

+ 수퍼클래스와 서브 클래스는 서로 협력하여 인스턴스를 생성한다.

> #### super 호출할 때 의 주의사항
>1. 서브클래스에서 constructor를 생략하지 않은 경우, 서브클래스의 constructor에서는 반드시 super를 호출해야 한다.
>2. 서브클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
  >```javascript
  >class Base{}
>
  >class Derived extends Base{
    constructor(){
      //ReferenceError :
      //Must call super construcotor in derived class 
      //before accessing 'this' or returning from derived constructor
      this.a = 1;
      super();
    }
  }
>
 > const derived = new Derived(1);
>
  >```
>3. super는 반드시 서브클래스의 constructor에만 호출한다.
서브 클래스가 아닌 클래스의 constructor나 함수에서 super를 호출하면 에러가 발생한다.

<br>

#### 2. super참조
>메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출 할 수 있다.

1. 서브 클래스의 프로토타입 메서드 내에서 super.sayHi는 수퍼클래스의 프로토타입 메서드 sayHi를 가리킨다.
  ```javascript
  //수퍼클래스
  class Base{
    construcotor(name){
      this.name = name;
    }

    sayHi(){
  return `Hi! ${this.name}`;
    }
  }

  //서브클래스
  class Derived extends Base{
    sayHi(){
      //super.sayHi는 수퍼클래스의 프로토타입 메서드를 가르킨다.
      return `${super.sayHi()}. how are you doing?`;
    }
  }

  const derived = new Derived('Lee');
  console.log(derived.sayHi());	//Hi! Lee. how are you doing?
  ```
    + super참조가 동작하기 위해서는 super를 참조하고 있는 메서드(Dervied의 sayHi)가 바인딩되어 있는 객체(Derived.prototype)의 프로토타입(Base.prototype)을 찾을 수 있어야 한다. 
   + 이를 위해서는 메서드는 내부 슬롯 `[[HomeObject]]`를 가지며 자신을 바인딩하고 있는 객체를 가리킨다.

   + <span style = "background-color : #fff5b1"><u>ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 갖는다.</u></span>단, super참조는 수퍼클래스의 메서드를 참조하기 위해 사용하므로 `서브클래스의 메서드`에서 사용해야 한다.
   + super참조는 `객체 리터럴`에서도 사용 가능하다.(다, ES6 축약 표현으로 정의된 함수만 가능하다)

2. 서브클래스의 정적 메서드 내에서는 super.sayHi는 수퍼클래스의 정적 메서드sayHi를 가리킨다.
  ```javascript
  //수퍼클래스
  class Base{
    static sayHi(){
      return 'Hi';
    }
  }

  //서브클래스
  class Dervied extends Base{
    static sayHi(){
      //super.sayHi는 수퍼클래스의 정적 메서드를 가리킨다.
      return `${super.sayHi()} how are you doing?`
    }
  }

  console.log(Dervied.sayHi());
  //Hi! how are you doing?
  ```
<br>

### 6. 상속 클래스의 인스턴스 생성 과정
```javascript
//수퍼클래스
class Rectangle{
  constructor(width,height){
    this.width = width;
    this. height = height;
  }
  
  getArea(){
    return this.width * this.height;
  }

  toString(){
    return `width = ${this.width}, height = ${this.height}`;
  }
}

//서브클래스
class ColorRectangle extneds Rectangle{
  constructor(width, height, color){
    super(width, height);
    this.color = colorl
  }
  
  //메서드 오버라이딩
  toString(){
	return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle);
//ColorRectangle {width : 2, height:4, color: 'red'}

//상속을 통해 getArea 메서드 호출
console.log(colorRectangle.getArea()); 		
//8
//상속을 통해 toString 메서드를 호출
console.log(colorRectangle.toString());		
//width = 2, height = 4, color = red
```
1. 서브클래스의 super호출
2. 수퍼클래스의 인스턴스 생성과 this바인딩
3. 수퍼클래스의 인스턴스 초기화
4. 서브클래스 constructor로의 복귀와 this바인딩
5. 서브클래스의 인스턴스 초기화
6. 인스턴스 반환
<br>

### 7. 표준 빌트인 생성자 함수 확장
>`filter`, `reducue`, `map`, 등을 이용할 수 있다.


<br>
<br><br>

# 30일차를 마치며..
30일차라고 하지만 공부한 날로 치면 한 20일정도 되지 않을까한다.
그래도 한달동안 꾸준히(?) 책을 보면서 공부하니까 많은 도움이 되었던 것 같다. 특히 구글에 검색해 문서를 읽을때 문서 안에 코드보다 문맥을 이해하기 어려웠는데 한달 전보다는 조금이나마 이해할 수 있게 된게 느껴진다. 하지만 아직 내용들이 어렵고 이해되지 않은 부분들이 있어서 한번에 다 알기란 어려운 것 같다. 처음 챌린지를 시작할때도 여러번 책을 읽는것을 목표로 했기때문에 첫술에 배부르지 않을 거란 생각을 했지만, 첫술이 생각보다 크고 버거워서 헐떡거리고 있다..ㅎ

이번 파트는 대충 흐름을 이해가 되지만, 책 속에 설명이 되어 있는 것들을 이해하기가 어려워서 과감하게 스킵했다. 어려웠던 프로토타입과 연관된 파트라서 그런가 이해가 될 듯 말듯한 아리송 하기만 했다. 
