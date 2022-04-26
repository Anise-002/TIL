# 객체(Object)
## 객체란?
>사람에는 속성이 있다.
이름, 성별, 키, 나이 등의 속성
말하기, 걷기, 먹기, 잠자기 등의 취할 수 있는 액션(기능)의 집합체를 객체라고 이해하면 된다.

### 1. 빈 객체에 임의로 넣어준다.
객체 안에 프로퍼티 접근하기 위해서 `객체이름.프로퍼티`로 접근 한다.
객체에 넣어줄때에도 `객체이름.프로퍼티 = 값`으로 넣어준다.
```
    const person = {};
        person.name = '일분이';
        person.age = 10;
        //빈 객체에 임의로 속성을 넣었다.
        //속성 = 프로퍼티(property)
        
        person.introduce = function(){
            console.log('안녕하세요. 저는 일분이이고 나이는 10살이에요.');
        };
        //액션을 임의로 넣어준다. (액션 => 함수)
        person.introduce();
        //속성중에 함수 값을 가지는 것을 메소드(method)
```
### 2. 객체를 생성할떄 속성 값을 다 값이 생성한다.<br>
이 방법이 일반적인 방법이다.
```
const person = {
            name : '일분이',
            age : 10,
            introduce : function(){
                console.log('안녕하세요? 저는 일분이고, 나이는 10살이에요!');
            }
        };
        console.log(person.name);
        person.introduce();
```

## 객체의 프로퍼티를 이용해 값을 출력하고 싶다면?
```
const person = {
            name : '일분이',
            age : 10,
            introduce : function(){
                console.log('안녕하세요? 저는 일분이고, 나이는 10살이에요!');
            }
        };
        const person2 = {
            name : '이분이',
            age : 8,
            introduce : function(){
                console.log('안녕하세요? 저는 이분이고, 나이는 8살이에요!');
            }
        };
        person.introduce();
        person2.introduce();

```
여기서 메소드 부분의 동작이 이름과 나이만 다른 중복되었기 때문에 수정할 수 있다.

```
introduce : function(){
                console.log('안녕하세요? 저는' + name +'고, 나이는 ' + age +'살이에요!');
            }
```
에러가 난다. 
왜? name과 age를 변수를 지정하지 않았기 때문이다.
근데 왜? age만??? 에러로 나오는건가? window전역 객체의 맴버인 name으로 인식되어 은 빈문자열로 나타나면서 에러가 나타나지 않았다.
그래서 age로 에러가 나타났다.
그러면 어떻게 객체 안의 프로퍼티에 접급해야 할까?

this를 이용!!!!
this는 객체가 메서드를 실행했을때 메서드의 `주체 객체`를 가리키는 것이다.
```
introduce : function(){
                console.log('안녕하세요? 저는' + this.name +'고, 나이는 ' + this.age +'살이에요!');
            }
```
<br>
<br>

## 생성자 함수
만약 100명의 사람의 인적정보를 입력해야 한다면 100개의 객체 하나씩 입력해야 할까? 이럴 때는 어떻게 해야 할까? <br>
인적사항 객체를 생성할 수 있는 틀을 만든다. => 생성자 함수

### 생성자(constructor)함수
```
function Person(nickname, age){
            this.nickname = nickname,
            this.age = age;
            this.introduce = function{
                console.log('안녕하세요? 저는' + this.name +'고, 나이는 ' + this.age +'살이에요!');
            }
        }
```
객체를 만드는 생성자 함수는 관례적으로 함수 식별자의 `첫글자를 대문자`로 하여 일반함수와 구별한다.

틀을 만들었다면,
틀안에 정보를 입력 받는 것은 생성자 함수의 매개변수에 맞춰서 정보를 입력하면 된다.
```
const person1 = new Person('일분이' , 10);
const person2 = new Person('이분이', 8);
```
생성자 함수를 호출할때에는 new키워드를 불여 호출한다.
그리고 생성자 함수의 `this`는 윈도우를 가리킬 것 같지만, `new`키워드로 인해 개별 객체를 가르키게 된다.

### * 인스턴스(instance) : 생성자 함수로 만들어진 각각의 함수를 뜻한다.
이 예제에서는 person1과 person2가 그러하다.

---
<br>
<br>
<br>
<br>
<br>




## 생성자 함수로 인스턴스 카드 만들기
<img src="./카드 완성본.png">

```

<h1>프로토타입을 이용해 카드 만들기</h1>
    <script>
        function Card(num, color){
            this.num = num;
            this.color = color;
            this.init();
        };
        //프로토타입도 객체이기때문에 {}를 사용해할 수 있다.
        //단, 주의할점 
        //constructor 속성을 꼭 설정해줘야한다.(그렇지 않으면 콘솔에 이름이 없는 것으로 나온다.)
        //Card.prototpye.dddd 일 경우에는 속성을 추가하는 것이라 constructor를 사용하지 않아도 된다.
        //프로토타입 객체를 만들려고 할때는 꼭 주의하자.

        Card.prototype = {
            constructor : Card,
            init : function(){
                const mainElem = document.createElement('div');
                mainElem.style.color = this.color;
                mainElem.innerHTML = this.num;
                mainElem.classList.add('card');
                document.body.appendChild(mainElem);
            }
        }

        const card1 = new Card(1,'green');
        const card2 = new Card(7,'blue');


        //생성자로 인스턴스를 만드는 과정이다.
        //공통정 기능 : html으로 div를 만들고 컬러, 숫자 설정, 그리고 그것들을 조립하는 것을 함수로 넣음
        
```
```
<style>
        .card{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 150px;
            border: 2px solid black;
            border-radius: 10px;
            font-size: 3rem;
            font-weight: 900;
        }
    </style>
```