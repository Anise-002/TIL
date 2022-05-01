# 16. 프로퍼티 어트리뷰트
## 16.1 내부 슬롯과 내부 메서드
> ECMAScript 사양에 등장하는 이중 대괄호`[[...]]`로 감싼 이름을 내부슬롯과 내부 메서드이다.

+ 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다.
+ 일부 내부슬롯과 내부메서드 한에서 `간접적으로 접근 할 수 있다.`
+ 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는데 `__porto__`를 통해 간접적으로 접근이 가능하다.

```javascript
cosnt o ={};

//내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근 할 수 없다.
o.[[Prototype]] //Error
//단, 일부 내부 슬롯과 내부 메서드 한에서 간접적으로 접슨 하룻 있는 수단이 제공된다.
o__propety__ //-> Object.prototype
```
<br>
<br>




## 16.2 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체
> 1. **프로퍼티 어트리뷰트**
자바스크립트 엔진이 관리하는 내부 상태 값인 내부슬롯 `[[value]]` `[[Writable]]` `[[Enumerable]]` `[[Configurable]]`

+ `Object.getOwnPropertyDescriptor` 메서드를 통해 간접적으로 확일 할 수 있다.


>2. **프로퍼티 디스크립터 객체 **
`Object.getOwnPropertyDescriptor`메서드를 통해 프로퍼티 어트리뷰트 의 정보를 반환되어 나오는 객체

+ 만약 존재하지 않은 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 `undefined`가 반환된다.
+ ES8 에서는 `Object.getOwnPropertyDescriptor`는 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
```javascript
const person={
  name : 'Lee'
};
//프로퍼티 동적 생성
person.age = 20;
//모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.propertyDescriptors(person));
/*
{
	name : {value : 'Lee', writable : true, enumerable : true, configurable : true},
    age : {value : 20, writable : true, enumerable : true, configurable : true},
*/
```
<br>
<br>



## 16.3 데이터 프로퍼티와 접근자 프로퍼티

### 16.3.1 데이터 프로퍼티
> + **데이터 프로퍼티 (data property)**
키와 값으로 구성된 일반적인 프로퍼티

#### 데이터 프로퍼티의 프로퍼티 어트리뷰트
1. `[[Value]] `
	+ 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값
    + 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당한다. 이때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 생성된 프로퍼티의 [[Value]]에 값을 지정한다.
    <br>
1. `[[Writable]] `
	+ 프로퍼티 값의 변경 기능 여부를 나타내며 `불리언 값`을 갖는다.
    + [[Writable]]값이 `false`인 경우, 해당 프로퍼티 [[Value]]의 값을 변경할 수 없는 `읽기 전용 프로퍼티`가 된다.
    <br>
1. `[[Enumerable]]` 
	+ 프로퍼티 열거 기능 여부를 나타내며 `불리언 값`을 갖는다.
    + [[Enumerable]]의 값이 `false`인 경우 해당 프로퍼티는 `for..in문`이나 `Object.keys`메서드 등으로 열거 할 수 없다.
    <br>
1. `[[Configurable]]` 
	+ 프로퍼티의 재 정의(다시정의) 가능 여부를 나타내며 `불리언 값`을 갖는다.
    + [[Configurable]]의 값이 `false`인 경우 해당 프로퍼티의 `삭제`,`어트리뷰트 값의 변경`이 금지 된다.
    + 단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]은 false로 변경하는 것은 허용된다.

#### 특징 
+ 프로퍼티가 생성될때 [[value]]값은 프로퍼티 값으로 초기화되며 [[wirtable]],[[Enumerable]],[[Configurable]]의 값은 true로 초기화 된다. 
+ 동적 추가해도 같이 작용된다.

<br>

### 16.3.2 접근자 프로퍼티
>+ **접근자 프로퍼티 (accessor property)**
자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

#### 접근자 프로퍼티의 프로퍼티 어트리뷰트
1. `[[Get]]`
	+ 접근자 프로퍼티를 통해 `데이터 프로퍼티의 값을 읽을 때` 호출되는 접근자 <u>함수</u>
    + 접근자 프로퍼티 키로 프로퍼티 `값에 접근`하면 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 `getter 함수`가 호출되고 그 결과가 프로퍼티 값을 반환한다.
    + `return`이 꼭 있어야 한다.
    <br>
1. `[[Set]]`
	+ 접근자 프로퍼티를 통해 `데이터 프로퍼티의 값을 지정할 때` 호출되는 접근자 <u>함수</u>
    + 접근자 프로퍼티 키로 프로퍼티 `값을 저장`하면 프로퍼티 어트리뷰트 [[Set]]의 값, 즉 `setter 함수`가 호출되고 그 결과 프로퍼티 값으로 저장된다.

3. `[Enumerable]]`
	데이터 프로퍼티와 동일하다.
4. `[[Configurable]]`
	데이터 프로퍼티와 동일하다.
---
```javascript
const person = {
  //데이터 프로퍼티
  firstName = 'Ungmo',
  lastName = 'Lee',
  
  //접근자 프로퍼티
  //getter함수
  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  },
  //setter함수
  set fullName(){
    [this.firstName, this.lastName] = name.split(' ');
  }
};
```
1. `데이터 프로퍼티`를 통한 프로퍼티 `값 참조`
```javascript
consoel.log(person.firstName + ' ' + person.lastName);
//Ungmo Lee
```
2. `접근자 프로퍼티`를 통한 프로퍼티 `값의 저장`
+ 접근자 프로퍼티 fullName에 값을 저장하면 setter함수가 호출된다.
```javascript
person.fullName = 'Heegun Lee';
console.log(person);
//{firstName : 'Heegun', lastName : 'Lee'}
```


3. `접근자 프로퍼티`를 통한 프로퍼티 `값의 참조`
+ 접근자 프로퍼티 fullName에 접근하면, `getter 함수`가 호출된다.
```javascript
console.log(person.fullName); 
//Heegun Lee
```

4. `접근자 프로퍼티`의 어트리뷰트 출력
+ `[[Get]]` `[[Set]]` `[[Enumerable]]` `[[Configurable]]`을 가지고 있다.
```javascript
let descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
//{get : f, set : f, enumerable : true, configurable : true}
```

### 프로토타입(Prototype)
>어떤 객체의 상위(부모) 객체의 역활을 하는 객체
+ 하위(자식)객체에게 자신의 프로퍼티와 메서드를 상속한다.
+ 상속 받은 하위 객체는 자신의 프로퍼티 또는 메서드의 것처럼 자유롭게 사용할 수 있다.
+ `프로토타입 체인`은 프로토타입이 단반향 링크드 리스트 형태로 연결되어 있는 상속 구조이다.
	+ 객체의 프로퍼티나 메서드에 접근하려고 할때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로토타입의 프로퍼티나 메서드를 차례로 검색한다.

<br><br>
## 16.4 프로퍼티 정의
> 1. 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의
2. 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것 →`Object.defineProperty`와 `Object.definePropertes` 메서드 사용
	 >>`Object.defineProperty` : 한번에 하나의 프로퍼티만 정의
     >>`Object.definePropertes` : 여러개의 프로퍼티를 한 번에 정의

```javascript
const person ={};

//데이터 프로퍼티 정의
Object.defineProperty(person.'firstName',{
	value : 'Ungmo',
    writable : true,
    enumerable : true,
    configurable : true
});

Object.defineProperty(person. 'lastName', {
     vaule: 'Lee'
});

//접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName',{
  get(){
    return `${this.firstName}, ${this.lastName}`;
  },
  set(name){
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable : true,
  configurable : true
});

```
+ `[[writable]]` `[[enumerable]]` `[[configurable]]` 생략 가능
+ 디스크립터 객체의 프로퍼티를 누락 시 기본값
	1. `value`, `get`, `set` : undefined
 	2. `wirtable`, `enumerable`, `configurable` : false


<br><br>
## 16.5 객체 변경 방지

### 16.5.1 객체 확장 금지
`Object.preventExtension 메서드` 
>+ 프로퍼티 추가 금지 (동적 추가, Object.defineProperty메서드)
>+ `Object.isExtension 메서드`로 확장 가능한 객체인지 확인 할 수 있다.

```javascript
const person = {name : 'Lee'};
//person 객체는 확장이 금지된 객체가 아니다.
console.log(Object.isExtension(person)); //true

//person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtension(person);

//person 객체는 확장이 금지된 객체이다.
console.log(Object.isExtension(person)); //false
```
1. 프로퍼티 추가 금지된다.
>```javascript
>  person.age = 20;
>  //무시. strict mode에서는 에러
>  console.log(person);
>  //{name : 'Lee'}
>  ```
2. 프로퍼티 추가는 금지되지만 삭제는 가능하다.
>```javascript
>  delete.person.name;
>  console.log(person); //{}
>  ```
3. 프로퍼티 정의에 의한 프로퍼티 추가도 금지된다.
>```javascript
>  Object.defineProperty(person, 'age',{value : 20});
>  //TypeError : Cannnot define property age, object is not extensible
>  ```

<br>

### 16.5.2 객체 밀봉
`Object.seal 메서드`
>밀봉된 객체는 읽기와 쓰기만 가능하다.
>+ 추가, 삭제, 재 정의를 금지
>+ `Object.isSealed 메서드`로 밀봉 객체 여부 확인 가능

```javascript
const person = {name : 'Lee'};
//person 객체는 밀봉된 객체가 아니다.
console.log(Object.isSealed(person)); //false

//person 객체의 밀봉하여 프로퍼티 추가, 삭제, 재정의를 금지한다.
Object.Seal(person);

//person 객체는 밀봉된 객체이다.
console.log(Object.isSealed(person)); //true
//밀봉된 객체는 congiurable이 false이다.
console.log(Object.getOwnPropertyDescriptor(person));
/*
{
name : {value : 'Lee', wirtable : true, enumerable : true, configurable : false,}
*/
```

1. 프로퍼티 추가가 금지된다.
>```javascript
>person.age = 20;
>//무시. strict mode에서는 에러
>console.log(person); 
>//{name : "Lee"}
>```
   
1. 프로퍼티 삭제가 금지된다.
>```javascript
>  delete.person.name;
>  //무시. strict mode에서는 에러
>  console.log(person); //{name : 'Lee'}
>  ```
1. 프로퍼티 값 갱신은 가능하다.
>```javascript
>  person.name = 'Kiem';
>  console.log(person); //{name : 'Kim'}
1. 프로퍼티 어트리뷰트 재정의가 금지된다.
>```javascript
>  Object.defineProperty(person, 'name',{configurable : true});
>  //TypeError : Cannnot redefine propery : name
    
<br>

### 16.5.3 객체 동결
`Object.freeze 메서드`
> 동결된 객체는 읽기만 가능하다.
>+ 프로퍼티 추가, 삭제, 재정의, 쓰기 금지
>+ `Object.isFrozen 메서드` 동결 객체인지 여부 확인 가능

```javascript
const person = {name : 'Lee'};
//person 객체는 동결된 객체가 아니다.
console.log(Object.isFrozne(person)); //false

//person 객체의 동결하여 프로퍼티 추가, 삭제, 재정의, 쓰기가 금지한다.
Object.Freeze(person);

//person 객체는 동결된 객체이다.
console.log(Object.isFrozne(person)); //true
//밀봉된 객체는 Writable이 false이다.
console.log(Object.getOwnPropertyDescriptor(person));
/*
{
name : {value : 'Lee', wirtable : false, enumerable : true, configurable : false,}
*/
```

1. 프로퍼티 추가가 금지된다.
>```javascript
>person.age = 20;
>//무시. strict mode에서는 에러
>console.log(person); 
>//{name : "Lee"}
>```
2. 프로퍼티 삭제가 금지된다.
>```javascript
>  delete.person.name;
>  //무시. strict mode에서는 에러
>  console.log(person); //{name : 'Lee'}
>  ```
3. 프로퍼티 값 갱신이 금지된다.
>```javascript
>  person.name = 'Kim';
>  //무시, strict mode에서 에러
>  console.log(person); 
>  //{name : 'Lee'}
>  ```

4. 프로퍼티 어트리뷰트 재정의가 금지된다.
>```javascript
>  Object.defineProperty(person, 'name',{configurable : true});
>  //TypeError : Cannnot redefine propery : name'
>  ```
  
<br>

### 16.5.4 불변 객체
> `객체 확장 금지` `객체 밀봉` `객체 동결`은 얕은 변경 방식으로 중첩 객체까지 동결 할 수 었다.
따라서, `재귀적으로 Object.freeze 메서드`를 호출해야 한다.

```javascript
fucntion deepFreeze(target){
//객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체는 동결한다.
  if(target && typeof target === 'object' && !Object.isFrozen(target)){
    Object.Freeze(target);
    Object.keys(target).forEach(Key => deepFreeze(target[key]));
  }
  return target;
}
const person = {
  name : 'Lee',
  address : {city : 'Seoul'}
};

//깊은 객체 동결
 deepFreeze(person);

console.log(Object.isFrozen(person)); //true
console.log(Objdec.isFrozen(person.address)); //true

person.address.city = 'Busan';
console.log(person.address);
//city : 'Seoul'
```
<br>
<br><br>

# 16장을 마치며
이론을 공부하는 느낌이라 핵심개념만 알고 넘어가도 될 것 같은데  언제 어떻게 이것을 사용하는지 "실무에서 어떻게 사용할까?"하는 생각을 가지며대한 의문을 가지고 공부를 해야 했다. 
그리고 마지막 예제 코드가 이해하기 어려워서 찾아보니 다행히 동영상 강의가 이 부분까지 있어서 [객체 동결 강의](https://www.youtube.com/watch?v=u_672V85_jI)를 보며 코드를 이해할 수 있었다. 저자 강의는 이번 장까지만 업로드 되어 있어서 조금 아쉽다. 
