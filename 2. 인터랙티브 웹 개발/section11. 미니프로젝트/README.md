# 미니프로젝트

## 프로젝트 기능
1. 3D공간 만들기(css)
2. 스크롤 이벤트 - 3D 공간감 나타내기
3. 프로그래스바 만들기
4. 마우스 이벤트 - 3D 공간 시점 움직이기
5. 캐릭터 동적 생성
6. 캐릭터 조합
7. 키보드 조작 - 캐릭터와 공간 조작
8. 클릭 이벤트 - 공간의 색상변화와 캐릭터 바꾸기

## 1. 3D공간 만들기 (CSS)
### 1) 공간 자체를 3D로 만들기

```css
.world{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    perspective: 1000px;
}
```
.word에 perspecive를 사용하고, position을 fixed로 설정(이렇게 하면 스크롤이 위아래로 움직이지 않는다.)하고 width와 height를 화면꽉차게 한다.

```css
.stage{
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    transform-style: preserve-3d;
}
```
`transform-style: preserve-3d;` 는 `.word`에서 설정한 3D효과를 잘 전달하기 
위해서 설정해 두었다.
 EI는 지원이 안됨/웹킷 기반 브라우저에 지원된다.(크롬, 모바일기반, 사파리 등)

 <br>


 ### 2) 공간의 옆벽 만들기

<img src = "../image/3D%EA%B3%B5%EA%B0%84.jpeg" width="700vw">

 ```css
.wall-left{
    left: -500vw;
    width: 1000vw;
    background: #f8f8f8;
    transform: rotateY(90deg);
}
```
`transform: rotateY(90deg);`하면 센터를 중심으로 돌아갔다.
옆으로 옮겨줘야 하는 `.wall-left`의 width의 반 길이 만큼 옆으로 옮겨져야 `.wall`의 옆에 붙어서 표현된다.

#### 그럼? right는???

```css
.wall-right{
    left: -500vw;
    width: 1000vw;
    background: #f8f8f8;
    transform: rotateY(90deg) translateZ(100vw);
    /* translateZ로 움직인 이유는 y축으로90도로 돌렸기 때문에 x축이 아니라 z축쪽으로 움직이고 wall의 너비 만큼만 움직여줘야 하기 때문에 wall의 너비 100vw만큼 움직여 주면 된다. */
}
```
다른 방법으로는 

<img src = "../image/3D-2.jpeg" width="700vw">

```css
.wall-left{
    width: 1000vw;
    background: #f8f8f8;
    transform: rotateY(90deg) translateZ(-500vw);
}
.wall-right{
    width: 1000vw;
    background: #f8f8f8;
    transform: rotateY(90deg) translateZ(-400vw);
}
```
이 방법은 left를 사용하지 않고 translateZ를 이용해 이동한 것으로 y축으로 rotate한 상태에서 z축 -(마이너스)방향으로 left는 500vw(자신의 너비의 반)/ right는 -400vw(500vw-100vw(wall의 너비)의 값)을 이동하면 된다.

 <br>
 <br>

### 3) 콘텐츠 벽에 공간감 주기
```css
.wall-front-a{transform: translateZ(300vw);}
.wall-front-b{transform: translateZ(50vw);}
.wall-front-c{transform: translateZ(-200vw);}
.wall-front-d{transform: translateZ(-500vw);}
/* translateZ에 490vw로 하면 화면 꽉차게 나온다. */
```

---
 <br>
 <br>
 <br>

## 2. 스크롤 이벤트 - 3D 공간감 나타내기
### 1) 스크롤 할 수 있는 범위 구하기


```javascript
const houseElem = document.querySelector('.house');
let maxScrollValue =document.body.offsetHeight - window.innerHeight;
//전체 스크롤 할 수 있는 범위

window.addEventListener('scroll', function(){
    const zMove = pageYOffset/maxScrollValue * 970 -490;
});
```

`pageYOffset / maxScrollValue ` : 스크롤한 비율을 0에서 1로 나타내게 한다.
+ `pageYOffset` : 웹 문서가 수직으로 얼마나 스크롤 되었는지 px단위로 반환하는 속성 - window scroll 이벤트와 함께 실시간 스크롤 진행 여부를 체크한다.

### 2) 창 사이즈 변경 할때의 대응
:star: :star: :star: :star:<br>
**많이 사용하니까 중요하다.**

>창 사이즈가 변경 될때(사이즈를 줄임) 화면이 의도한 대로 마지막까지 보여지지 않는 에러가 발생한다.
F5를 눌러야 변경된 사이즈의 창으로 변경되어 에러가 나오지 않는다.

창 사이즈가 변경될떄에 maxScrollValue도 변경이 되는데 그 값을 갱신해 줘야 한다. F5를 누르지 않고 이런 에러를 대응 할 수 있다. 
이떄 사용하는 것을 `resize이벤트`

```javascript
function resizeHandler(){
    maxScrollValue =document.body.offsetHeight - window.innerHeight;
}

window.addEventListner('resize', resizeHandler);
resizeHandler();
```
창 사이즈가 변경 될떄마다 maxScrollValue의 값이 변경될 것이고 그 값을 사용하는 `zMove`변수의 값이 갱신이 되면서 창 사이즈에 따라 스크롤의 비율을 갱신하게 된다.

이렇게 되면 창 사이즈가 변경되어도 대응할 수 있게 된다.

#### 마지막에 resizeHandler() 함수를 호출한 이유는
> 창이 실행되자마자 resizeHandler()함수를 호출해 초기값을 갱신하기 위함이다.

---

<br>
<br>
<br>

## 3. 프로그래스바 만들기
스크롤을 할때마다 프로그래스바를 그 비율만큼 퍼센트를 Width를 변경해주면 된다.
1. 프로그래스바 엘리먼트를 잡아낸다.
```javascript
const barElem = document.querySelector('progress-bar');
```
2. 스크롤 이벤트 안에 프로그래스바의 css를 조정해준다.
이때 스크롤의 비율의 값의 퍼센트값을 너비의 값으로 넣어주었기 때문에
사용하는 `pageYOffset/maxScrollValue`의 식이랑 같다. 

```javascript
window.addEventListener('scroll', function(){
    const zMove = pageYOffset/maxScrollValue * 970 -490;

    //progress bar
    barElem.style.width = pageYOffset/maxScrollValue * 100 + '%';
});
```

따라서 `pageYOffset/maxScrollValue`값을 변수로 넣어서 재상용 할 수 있게 만들어준다.
```javascript
window.addEventListener('scroll', function(){
    const scrollPer = pageYOffset/maxScrollValue;
    const zMove = scrollPer * 970 -490;

    //progress bar
    barElem.style.width = scrollPer * 100 + '%';
});
```
---
<br>
<br>
<br>




## 4. 마우스 이벤트 - 3D 공간 시점 움직이기
### mousemove 이벤트사용하기
이벤트 핸들러를 사용할떄 e(이벤트 객체)를 매개변수 자리에 넣고 그 값을 받아 올 수 있다.<br>
이벤트 객체 속성 중에  `clientx`, `clienty`값을 이용한다.
마우스를 움직일떄 마다 그 마우스의 x,y좌표를 볼 수 있다.

>`clientx`, `clienty` 를이용하여 마우스의 현재 위치를 px단위로 알 수 있다.
+ 이 값을 계산해서 우리가 쓰기 좋은 형태로 만들어줘야 한다.
+ 이 속성은 화면의 왼쪽 위의 값이 0에 수렴한다.
+ 우리가 원하는 효과는 마우스가 가운데에 있을때 회전이 안되어 있는 즉, 기준으로 위, 아래, 좌우가 균일하게 움직이길 원한다.

<img src = "../image/%EC%A2%8C%ED%91%9C.jpeg" width = "700vw">

+ 하지만 cilentx, clinety값을 그대로 쓰기면 가운데에 마우스가 있을때 회전이 된 상태이고 회전각을 계산하기에 어려움이 있다.
+ 따라서 가운데의 값(0)를 기준으로 마이너스(-1), 플러스(+1)값을 이용해서 해서 많든다.
```javascript
window.addEventListener('mousemove', function(e){
    const mousePos = {x : 0, y:0};
    //마우스 움직이는 포인트로 세팅하려고 한다.
    //가운데를 0으로 한 값을 각도를 구해 사용할 것이다.

    mousePos.x = -1 +(e.clientX/this.window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY/this.window.innerHeight)*2;
});
 
```
이 식을 통해 가운데가 원점(0)으로 만들 수 있다.!!!!!!
이 값에서 적절한 값을 곱해 원하는 값을 만들 수 있다.
+ <u>아주 많이 사용하는 식임으로 기억해두는 것이 좋다.</u>
+ 설명 : `e.clientX/this.window.innerWidth`은 현재 모니터에 마우스의 현재 위치를 0에서 1사이의 값의 비율을 나타낸다. 
+ `mousePos.x = -1 +(e.clientX/this.window.innerWidth) * 2;`는 잘 계산해 보면 가운데가 0이고 왼쪽이 -1 값을 갖고, 오른쪽이 +1값을 갖는 비율읠 계산해준다.
+ `mousePos.y`의 계산식도 이와 같은 계산식으로 가운데가 0, 위가 +1, 아래가 -1을 갖는 비율로 계산된다.

#### 어디에 적용해야 할까???
캐릭터도 추가할 예정임으로 벽으르 포함하고 있는 `house`와 캐릭터를 포함하고 있는 컨테이너인 `stage`를 회전 시켜 적용시켜준다.
```javascript
const stageElem = document.querySelector('.stage');
//스테이지 엘리먼트를 가져온다.
window.addEventListener('mousemove', function(e){
    const mousePos = {x : 0, y:0};
    //마우스 움직이는 포인트로 세팅하려고 한다.
    //가운데를 0으로 한 값을 각도를 구해 사용할 것이다.

    mousePos.x = -1 +(e.clientX/this.window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY/this.window.innerHeight)*2;

    stageElem.style.transform = 'rotateX(' + 0 + 'deg) rotateY(' + 0 +'deg)';
    //스테이지의 css transform을 변경하도록 한다.
    //transform속성을 두개 쓸때는 띄어쓰기 한다.
});

```
이때 `mousePos.x`값은 어디에 넣어야 할까? 
마우스가 좌우로 움직일때 stage의 움직임의 축은 Y축이고
마우스가 위,아래로 움직일때는 stage의 움직임의 축이 X축이다.
그래서 위에 구해낸 `mousePos.x`값은 `rotateY값`에  `mousePos.y`값은 `rotateX값`에 넣어준다.
```javascript
stageElem.style.transform = 'rotateX(' + mousePos.x + 'deg) rotateY(' + mousePos.y +'deg)';
```
이때, 범위가 -1에서 1의 값 사이기 때문에 곱하기(*)를 이용해 값을 좀더 크게 조절할 수 있다.
```javascript
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) +'deg)';
```
---
<br>
<br>
<br>

## 4. 3D 캐릭터 구현 
각 부위별로 잘라서 이미지로 만든다.<br>
css파트에 카드 만들기를 참고하자.
### HTML
이 부분은 자바스크립트로 클릭했을때 동적 생성을 하기 떄문에 html파일에 직접 작성하지 않는다.
```html
<div class="character">
            <div class="character-face-con character-head">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>
            <div class="character-face-con character-torso">
                <div class="character-face character-torso-face face-front"></div>
                <div class="character-face character-torso-face face-back"></div>
            </div>
            <div class="character-face-con character-arm character-arm-right">
                <div class="character-face character-arm-face face-front"></div>
                <div class="character-face character-arm-face face-back"></div>
            </div>
            <div class="character-face-con character-arm character-arm-left">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>
            <div class="character-face-con character-leg character-leg-right">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>
            <div class="character-face-con character-leg character-leg-left">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>

        </div>
```
각 부위 파트마다 앞, 뒤가 있고 그 것을 그룹해주는 div로 묶어주는 형태의 html구조이다.
+ `character-face-con` : character-face를 감싸고 있는 container라는 뜻
+ `character-face` : 캐릭터의 면(face)을 의미
+ `face-front` : 앞면을 의미
+ `face-back` : 뒷면을 의미

### CSS
```css
.character {
    position: absolute;
    left: 12%;
    bottom: 5%;
    width: 10vw;
    height: 15.58vw;
    /* 여기서는 가로 : 세로의 비율을 픽스하기 위해서 vw로 높이 단위로 했다. */
    transform-style: preserve-3d;
    /* 상위 엘리먼트의 3d효과가 하위에도 적용되기 위해서 사용하는 것. */
}
```
+ `width와 height의 비율을 vw단위`로 맞춰서(뷰포트의 크기에 따라 크기를 다르게 하되, 비율을 그대로 가져가기 위해서 사용);

```css
.character[data-direction='forward'] { transform: rotateY(180deg); } /*앞모습*/
.character[data-direction='backward'] { transform: rotateY(0deg); } /*뒷모습*/
.character[data-direction='left'] { transform: rotateY(-90deg); } /*왼쪽*/
.character[data-direction='right'] { transform: rotateY(90deg); } /*오른쪽*/

```
 data-direction='forward'으로 바라보는 방향을 css로 설정해 놓은 것 
 상황에 맞춰서 [data-direction]값을 <u>방향을 결정</u>하는 것을 js로 지정하도록 미리 세팅한 값이다.

```css
.character-head {
    left: calc(42 / 856 * 100%);
    /* 이미지의 (left로 움직이고 싶은 길이/전체길이)의 비율을 퍼센트로 만들어서 넣어준 것*/
    top: 0;
    z-index: 60;
    width: calc(770 / 856 * 100%);
    /* (머리의 너비 / character 전체 길이)의 비율을 퍼센트로 만들었음 
    calc 함수인 경우 계산하지 않아도 수식으로 남길 수 있어서 수정하기 용이하다.*/
    /* 계산 값만 쓰게 된다면 수식을 주석으로 남겨 놓아 나중에 보기 좋게 해줘라. */
    height: calc(648 / 1334 * 100%);
    /* 놓이도 (머리 높이/character의 높이)의 비율을 calc함수고 계산 */
    transform-origin: center bottom;
    /* 이거 중요!!! transform의 기준의 center이라 목을 기준으로 움직이기 위해서 center bottom을 기준으로 설정했다. */
    animation: ani-head 0.6s infinite alternate cubic-bezier(0.46, 0.18, 0.66, 0.93);
}
```
+ `calc()` : calc(칼크)함수는 연산값이 숫자면 괜찮다.
+ 계산해서 숫자를 넣어도 되는데 연산의 식을 넣으므로서 나중에 이해 할 수 있다. 
+ `left: calc(42 / 856 * 100%);` : clac(옮기기 위한 수치/ 전체 그림 너비 값 * 100%); 

<br>

### CSS Animation
```css
@keyframes ani-head {
    to{transform: rotateX(-10deg);}
    /* 적용하는 엘리멘트에 animation : alternate를 널어주면 자연스럽다. */
}
@keyframes ani-running-leg {
    from{
        transform: rotateX(-30deg);
    }
    to{
        transform: rotateX(30deg);
    }
}
@keyframes ani-running-arm{
    from{
        transform: rotateY(-30deg);
    }
    to{
        transform: rotateY(30deg);
    }
}
```


### JS

#### 1. 생성자를 이용해 캐릭터를 만들기<bt>
character.js파일에 캐릭터 생성자 함수를 만들다.

```javascript   
    function Character(){
        this.mainElem = document.createElement('div');
        this.mainElem.classList.add('character');
        this.mainElem.innerHTML =`
        <div class="character-face-con character-head">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>
            <div class="character-face-con character-torso">
                <div class="character-face character-torso-face face-front"></div>
                <div class="character-face character-torso-face face-back"></div>
            </div>
            <div class="character-face-con character-arm character-arm-right">
                <div class="character-face character-arm-face face-front"></div>
                <div class="character-face character-arm-face face-back"></div>
            </div>
            <div class="character-face-con character-arm character-arm-left">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>
            <div class="character-face-con character-leg character-leg-right">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>
            <div class="character-face-con character-leg character-leg-left">
                <div class="character-face character-head-face face-front"></div>
                <div class="character-face character-head-face face-back"></div>
            </div>`;

            document.querySelector('.stage').appendChild(this.mainElem);
    }
```
코드 해석

+ 생성자 함수이니까 식별자의 첫 글자는 대문자로 만들어준다.
+ <div>를 가지고 있는 `mainElem`을 만들고,  거기에 클래스 `.character`도 붙여준다. 
+ `mainElem`안에 캐릭터의 html구조 코드를 넣어준다.
+ 이 것을 appendChild를 이용해 `stage`안 마지막 부분에 밀어 넣어준다.

#### 2) 생성자 함수의 인스턴스를 만들어 호출시켜준다.
생성자 함수 안에는 작성한 코드가 실행되는 코드가 없기 때문에 화면상에 나오지 않는다. 그래서 화면에 캐릭터를 나타나게 할려면 `인스턴스`를 통해 생성자함수가 만들어낸 캐릭터는 화면에 호출시킨다.
`new키워드`를 사용해서 생성자를 붙여논다.

```javascript
new Character();

```
이때 나타나는 캐릭터의 위치는 `left : 12%`자리에 나타나도록 .character에 css에서 설정해 놓아서 캐릭터의 위치는 고정으로 그 자리에 나타난다.

#### 3) 클릭한 곳에 캐릭터 생성하기

하지만, 클릭을 한 자리에 나타나도록 해야하기 떄문에
'click이벤트`와 e(이벤트 객체)의 속성인 `clientX`의 값을 사용한다.

```javascript
window.addEventListener('click',function(e){
    new Character();
})

```
전체너비에서 클릭한 위치의 비율의 퍼센트를 구해 .character의 left값을 넣어주면 클릭한 위치에 인스턴스가 생성될 수 있다.
```javascript
e.clientX/window.innerWidth *100
```
이 식을 바로 매개변수에 넣어주는 것이 아니라 인스턴스의 매개변수를 객체로 만들어서 넣어준다.
```javascript
window.addEventListener('click',function(e){
    new Character({
        xPos : e.clientX/window.innerWidth *100
    });
})
```
이렇게 만들면 생성자함수 Character(info)의 매개변수(info)의 값에 xPos의 값이 들어가게 된다. 이 info의 값을 사용해서 생성자 함수 Character안에서 새롭게 만들어지는 캐릭터를 둘러싼 엘리먼트인 `mainElem`의 left값으로 넣어주면 된다.

```javascript   
    function Character(){
        this.mainElem = document.createElement('div');
        this.mainElem.classList.add('character');
        this.mainElem.innerHTML =`
        <div class="character-face-con character-head">
                ....
        </div>`;

        document.querySelector('.stage').appendChild(this.mainElem);

        this.mainElem.style.left = info.xPos + '%';
    }
```
`this.mainElem.style.left = info.xPos + '%';` : info가 객체이니까 객체 안의 xPos의 값을 가져오려고 `info.xPos`를 넣고 단위(%)를 넣어주었다.


#### 4. 스크롤 했을때 캐릭터 움직이게 하기
4-1.css에 runing클래스를 붙여 애니메이션 실행하기
```css
.character.running .character-leg-right { animation: ani-running-leg 0.2s alternate infinite linear; }
.character.running .character-leg-left { animation: ani-running-leg 0.2s alternate-reverse infinite linear; }
.character.running .character-arm { animation: ani-running-arm 0.2s alternate infinite linear; }
```
4-2. runnig클래스 붙이기

4-3. 스크롤이 멈추면 running클래스 제거해 움직임 멈추기

4-4. 캐릭터 뒤통수 보이게 하기

5. 캐릭터 키보드로 좌우로 움직이게 하기

※ 참고) keycode.info ->키보드 코드를 알려주는 웹사이트 

5.1 keydown 이벤트, keyup 이벤트

5.2 좌우로 이동하는 것 (속도도 다르게 한다.)
requestAnimationFrame을 활용.

6. 속도를 랜덤으로 만들기



