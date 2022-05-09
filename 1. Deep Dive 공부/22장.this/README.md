# 22장. this
## 22.1 this 키워드
> 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수
this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
+ this가 가르키는 값, 즉 this 바인딩은 <u>함수 호출 방식에 의해 동적으로 생성된다.</u>

+ this는 어디에서든 참조가 가능하다.
+ 일반적으로 객체의 메서드내부 또는 생성자 함수 내부에서만 의미가 있다.
+ strict mode가 적용된 일반 함수 내부의 this에는 `undefined`가 바인딩된다.(일반함수 내부에서는 this를 사용할 필요가 없기 때문)
<br>

## 22.2 함수 호출 방식과 this바인딩
### 22.2.1 일반 함수 호출
>기본적으로 this에는 전역객체(대게는 window)가 바인딩 된다.

```javascript
function foo(){
  console.log("foo's this :", this);	//window
  function bar(){
    console.log("bar's this: ", this);	//window
  }
  bar();
}
foo();
```
#### 주의) 어떤 함수라도 일반 함수로 호출되면 this에 전역객체가 바인딩된다.
1. 메서드 내에 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩 된다.
```javascript
var value = 1; 

const obj = {
  value : 100,
  function foo(){
  console.log("foo's this :", this);	//{value : 100, foo:f}
    function bar(){
      console.log("bar's this: ", this);	//window
    }
    bar();	//일반 함수로 호출됨
    //따라서 메서드 내에 중첩 함수도 일반함수처럼 호출되면
    //내부의 this는 전역개체에 바인딩 된다.
  }

obj.foo();
```

2. 콜백 함수가 일반함수로 호출되면 콜백 함수 내부의 this에도 전역객체가 바인딩된다.(콜백함수로 호출되지 않은 경우로 이해된다.)
```javascript
var vaule = 1;

const obj = {
  value : 100,
  foo(){
    console.log("foo is this : ", this); 	{value: 100, foo:f}
    //콜백함수 내부의 this에는 전역 객체가 바인딩 된다.
    SetTimeout(function(){
      console.log("callback's this : ", this);	//window
      console.log("callback's this.value :" , this.value); //1
    },100);
  }
};
obj.foo();
    
```

#### 중첩함수나 콜백 함수의 this바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법
1. this바인딩 변수를을 할당한다.
```javascript
var value = 1;

const obj ={
  value L 100,
  foo(){
    //this바인딩을 변수 that에 할당한다.
    const that = this;
    //콜백 함수 내부에서 this대신 that을 참조한다.
    setTimeout(function(){
      console.log(that.value);	//100
    },100);
  }
};

obj.foo();
    
```
2. `Function.prototype.apply/call/bind` 사용
```javascript
var vaule = 1;

const obj ={
  value : 100,
  foo(){
    //콜백 함수에 명시적으로 this를 바인딩한다.
    setTimeout(function(){
      console.log(this.value);	//100
    }.bind(this),100);
  }
};

obj.foo();
```
3. `화살표 함수`를 사용해 this바인딩을 일치시킨다.
```javascript
var value = 1;

const obj = {
  value : 100, 
  foo(){
    //화살표 함수 내부의 this는 상위 스코프의 this를 가르킨다.
    setTimeout(()=> console.log(this.value),100); //100
  }
};

obj.foo();
```
<br>

### 22.2.2 메서드 호출
>메서드를 호출할 때 메서드 이름앞의 마침표(.)연산자 앞에 기술한 객체가 바인딩된다. 
즉, <u>호출한 객체</u>에 바인딩 된다.
+ 프로토타입 메서드 내부에서 사용된 this도 호출한 객체에 바인딩 된다.

+ 메서드는 프로퍼티에 바인딩된 함수이다. 
즉, 객체에 프로퍼티가 가리키는 함수 객체는 객체에 포함된 것이 아닌 독립적으로 존재하는 별도의 객체임으로 다른 객체에 프로퍼티로 할당할 수도 있고, 일반 변수에 할당도 가능하며 일반 함수로도 호출이 가능하다.
```javascript
const anotherPerson ={
  name : 'kim'
};
//getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;
//anotherPerson.getName = {return this.name};

//anoterPerson = {
//	name : 'kim',
//	getName : {return this.name};
//};
//으로 이해하였다.


//getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName());	//kim

//getName 메서드를 변수에 할당
const getName = person.getName;
//getName = {return this.name};

//getName 메서드를 일반함수로 호출
console.log(getName());	//' '
//일반 함수로 호출된 getName 함수 내부의this는 브라우저의 환경인 window.name다.
//windw.name의 기본값인 ' '이 나온다.
//strict 모드에서는 undefined가 출력된다.
```
<br>

### 22.2.3 생성자 함수 호출
> 생성자 함수 내부의 this에는 생성자 함수(미래에)생성할 인스턴스가 바인딩된다.

```javascript
//생성자 함수
function Circle(radius){
  //생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function(){
    return 2 * this.radius;
  };
}

//반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
//반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter());	//10
console.log(circle2.getDiameter()):	//20
```
+ 생성자 함수 정의 후 new연산자와 함께 호출하면 생성자 함수로 동작한다.
+ new연산자 없이 호출하면 일반함수로 동작한다.

<br>

### 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출
#### 1. Function.prototype.apply / call 메서드
>this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.
+ `apply`/`call` 메서드는 <u>함수를 호출</u>하면서 첫번째 인수로 전달한 특정 객체를 호출한 함수의 this를 바인딩한다.

>+ `apply` : 주어진 this바인딩과 인수 리스트를 배열을 사용
+ `call` : 주어진 this바인딩과 `,`로 구분된 인수 리스트르르 사용하여 함수를 호출한다.


```javascript
function getThisBinding(){
  console.log(arguments);
  return this;
}

//this로 사용할 객체
const thisArg = {a : 1};

//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBing 함수의 this에 바인딩된다.
//apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisAr[1,2,3]);
//Argumetns(3)
//{a : 1}

//call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisAr,1,2,3));
//Arguments(3)
//{a : 1}

```


#### 2. Function.prototype.bind 메서드
> 첫번째 인수로 전달한 값으로 this바인딩이 교체된 함수를 새롭게 생성해 반환하다. 

+ bind 메서드는 함수를 호출하지 않아 명시적으로 호출해야 한다.
```javascript
function getThisBindgs(){
  return this;
};

//this로 사용할 객체
const thisArg = { a: 1};

//bind메서드 사용
console.log(getThisBinding.bind(thisArg));	//getThisBinding
//bind메서드는 함수를 호출하지 않으므로 명식적으로 호출해줘야 한다.
console.log(getThisBinding.bind(thisArg)());	{a:1};
```
+ 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.
```javascript
const person = {
  name = "Lee",
  foo(callback){
    //bind메서드로 callback 함수 내부의 this 바인딩을 전달
    setTimeout(callback.bind(this),100);
  }
};

person.foo(function(){
  console.log(`Hi!my name is ${this.name}`);
});
```
> "외부 함수 person.foo()의 콜백 함수와 내부의 person.foo()의 this의 객체는 다른 서로 다른 객체로 바인딩 되어 있다.
내부는 메서드안의 this임으로 메서드를 호출하는 객체인 person에 바인딩 되어 있으고, 외부 함수의 콜백 함수는 걍 person객체 안에 있는 foo()함수를 똑 떼어내서 독립적으로 사용했다고 생각하면 this에는 전역객체(window)가 바인딩 된다.
<br>this를 일치 시켜야 원하는 값을 얻을 수 있기에, bind메서드를 이용해 내부 메서드의 this의 값을 그대로 사용할 수 있도록 하는 것이다."라고 이해함

<br><br>
<br>
<br>

# 20일차를 마치며
19일차가 되니 마음이 붕뜬 느낌이 들어 공부를 시작하기가 점점 어려워진다. 내용이 어려워지고, 이해할 수 없는 것들이 많아지기 시작하면서 지금의 챌린지가 맞는것인지 하는 생각이 들기도하면서 여러 생각이 들어, 이 챌린지를 알면서도 외면하다 시간을 보내게 된 하루 였던 것 같다.
그렇다고 다른 공부를 안한 건 아니지만, 챌린지를 하는데에 오는 스스로가 만들어간 압박감이 조금 버거웠달까...ㅎ

스스로 압박하지 않고 미룬것은 다 하고자 하는 것이 아닌, 하루에 한단원을 목표로 40일을 넘어가도 좋으니, 1회완독을 목표로 하는 것으로 가볍게 공부를 해야겠다고 생각이 들었다. 
어려우면 다음날까지 붙잡을 수 있도록 스스로에게 여유를 주어야 겠다고 생각이 들었다.




참고 사이트
https://wooooooak.github.io/javascript/2018/12/08/call,apply,bind/

