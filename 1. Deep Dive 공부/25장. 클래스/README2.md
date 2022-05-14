# 25장 클래스
## 25.6 클래스의 인스턴스 생성 과정
> 클래스의 인스턴스는 `new 연산자`와 함께 호출한다.
+ `new 연산자` 없이는 호출 할 수 없다.

**1. 인스턴스 생성과 this 바인딩**
+ `new 연산자`와 함께 클래스를 호출하면 constructor의 내부 코드가 실행에 앞에 암묵적으로 빈 객체를 생성한다.
+ 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다.
+ 즉, constructor 내부의 this는 클래스가 생성한 인스턴스를 가리키며 this가 그것을 바인한다.

<br>

**2. 인스턴스 초기화**
constructor의 내부가 실행되면서 this에 바인딩되어 있는 인스턴스를 초기화한다.
+ 바인딩된 인스턴스에 프로퍼티를 추가
+ constructor가 받은 인수로 초기값을 전달 받아 초기화 한다.
+ constructor가 생략 된다면 이 과정도 생략된다.
<br>

**3. 인스턴스 반환**
클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환한다.
```javascript
class Person{
  //생성자
  constructor(name){
    //1. 암묵적으로 인스턴스가 생성되고 this를 바인딩한다.
    console.log(this); 	//Person{}
    console.log(Object.getPrototypeOf(this) === Person.prototpye);	//true
    
    //2.this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;
    
    //3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환한다.
  }
}
```
<br>
<br>

## 25.7 프로퍼티
>총 5가지 프로퍼티 종류가 있지만 3.4.5번의 정의 제안은 아직 ECMAScript의 표준사양이 아니고 현재 진행형인 정의이다.
현재는 아직이지만, 미래의 언젠가는 이것이 표준사양으로 자리할 수 있다.
+ 현재는 1.2번만 중점적으로 공부하자

### 1. 인스턴스 프로퍼티
>constructor 내부에서 정의해야 한다.
```javascript
class Person{
  constructor(name){
    //인스턴스 프로퍼티
    this.name = name;
  }
}
const me = new Person('Lee');
console.log(me);	 //Person{name : 'Lee'}
```

+ constructor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 된다.
+ 인스턴스 프로퍼티는 언제나 `public`하다.
(ES6의 클래스는 다른 객체지향 언어처럼 private, public, protected 키워드와 같은 접근제한자를 지원하지 않기때문)


### 2. 접근자 프로퍼티
>자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 떄 사용하는 접근자 함수
+ `getter함수`와 `setter함수`로 구성되어 있다.
+ 생성자 함수를 생성할때에 setter,getter 함수와 동일하게 작동한다.
+ 클래스 접근자 프로퍼티는 프로토타입의 프로퍼티이다.
(기본적으로 클래스의 메서드는 프로토타입 메서드가 된다.)

1. `getter함수` : 인스턴스 프로퍼티에 접근할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용한다.
     + 무언가를 취득할 때 사용하므로 반드시 무언가를 반환해야 한다. 
  2. `setter함수` : 프로퍼티에 값을 할당할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용한다.
     + 무언가를 프로퍼티에 할당해야 할 때 사용하므로 반드시 매개변수가 있어야 한다.

```javascript
class Person{
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  //fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  //getter함수
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
  //setter 함수
  set fullName(){
    [this.firstName, this.lastName] = name.split(' ');
  }
}
const me = new Person('Ungmo','Lee');
```
#### 데이터 프로퍼티를 통한 프로퍼티 값의 참조
>```javascript
console.log(`${this.firstName} ${this.lastName}`);
//Ungmo Lee
>```

#### 접근자 프로퍼티를 통한 프로퍼티 값의 저장
+ 접근자 프로퍼티 fullName에 값을 저장하면 `setter함수`가 호출된다.
>```javascript
me.fullName = 'Heegun Lee';
console.log(me);
//{firstName : 'Heegun', lastName : 'Lee'}
>```

#### 접근자 프로퍼티를 통한 프로퍼티 값의 참조
+ 접근자 프로퍼티 fullName에 접근하면 `getter함수`가 호출된다.
>```javascript
console.log(me.fullName);
// Heegun Lee
>```

#### fullName은 접근자 프로퍼다.
+ 접근자 프로퍼티는 get,set,enumerable,configurable 프로퍼티 어트리 뷰트를 갖는다.


### 3. 클래스 필드 정의 제안
> 자바스크립트에서 인스턴스 프로퍼티를 마치 클래스 기반 객체 지향 언어의 클래스 필드처럼 정의 할 수 있는 새로운 표준사양으로 <u>클래스 몸체에서 클래스 필드를 정의할 수 있는 것</u>
+ 최신브라우저(Chrome 72이상) 또는 Node.js(버전12이상)에는 동작한다.
+ 모든 클래스 필드는 인스턴스 프로퍼티이다.

+ `클래스필드` : 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어
```javascript
class Person{
  //클래스 필드 정의
  name = "Lee";
}

const me = new Person();
console.log(me);	//Person{name:"Lee"}
```

#### 특징
1. 클래스 필드 `정의`하는 경우 this에 클래스 필드를 바인딩해서는 안된다.
(this는 constructor와 메서드 내에만 유효)
  ```javascript
  class Person{
    //this에 클래스 필드를 바인딩해서는 안된다.
    this.name = " ";
  //SyntaxError : Unexpected token '.'
  }
  ```
1. 클래스 필드를 `참조`하는 경우 this는 반드시 사용해야 한다.
  ```javascript
  class Person{
    //클래스 필드
    name = 'Lee';
      constructor(){
          console.log(name);
       //ReferenceError : name is not defined
      }
  }
  new Person();
  ```
1. 클래스 필드에 초기값을 할당하지 않은면 `undefined`를 갖는다.
  ```javascript
  class Person{
    //클래스 필드를 초기화하지 않으면 undefined를 갖는다.
    name;
  }
  const me = new Person();
  console.log(me);	//Person{name : undefined}
  ```
1. 함수를 클래스 필드에 할당할 수 있다.(클래스필드를 통해 메서드를 정의할 수 있다.)
    + 함수는 프로토타입 메서드가 아닌, 인스턴스 메서드가 된다.
    + 클래스 필드에 함수를 할당하는 것으느 권장하지 않는다.
  ```javascript
  class Person{
    //클래스 필드
    name = 'Lee';

    //클래스 필드에 함수를 할당
    getName = function(){
      return this.name;
    }
    //화살표 함수로 정의할 수도 있다.
    //getName = () => this.name;
  }
  const me = new Person();
  console.log(me);	//Person{name : "Lee", getName: f}
  console.log(me.getName());	//Lee
  ```

### 4. private 필드 정의 제안
> private 필드의 선두에 `#` 을 붙인다.
+ 참조를 할때에도 `#`을 붙여준다.
+ 외부에서 참조할 수 없다.
+ 접근자 프로퍼티를 통해 간접적으로 접근 할 수 있다.
+ private필드는 반드시 클래스 몸체에 정의해야 하며, constructor에 정의하면 에러가 발생한다.

```javascript
class Person{
	//private 정의
	#name = '';
	
	constructor(name){
		this.#name = name;
	}

	//name접근자 프로퍼티다.
  get name(){
      //private 필드를 참조하여 trim한 다음 반환한다.
      return this.name.trim();
  }
}

const me = new Person('Lee');
console.log(me.name);	//Lee
```
### 5. static 필드 정의 제안
> 클래스에서 static키워드를 통해 정적 메서드를 정의하지만 정적 필드를 정의 할 수 는 없다.
+ `static public필드` `static private 필드` `static private 메서드`를 정의할 수 있도록 2021년에 제안되었다.

```javascript
class MyMath{
	//static public 필드 정의
	static PI = 22/7;

	//static private 필드 정의
	static #num = 10;

	//static 메서드
	static increment(){
		return ++MyMath.#num;
	}
}

console.log(MyMath.PI);	//3.142857142857143
console.log(MyMath.increment());	//11

```