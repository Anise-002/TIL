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
 <br>


 ### 2) 공간의 옆벽 만들기

<img src = "../image/3D%EA%B3%B5%EA%B0%84.jpeg" >

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

<img src = "../image/3D-2.jpeg" >

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
### HTML
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
### CSS
### JS
1.생성자를 이용해 만들기

2.클릭하면 그 위치에 캐릭터 생성하기

3. 스크롤 했을때 캐릭터 움직이게 하기
3-1.css에 runing클래스를 붙여 애니메이션 실행하기
```css
.character.running .character-leg-right { animation: ani-running-leg 0.2s alternate infinite linear; }
.character.running .character-leg-left { animation: ani-running-leg 0.2s alternate-reverse infinite linear; }
.character.running .character-arm { animation: ani-running-arm 0.2s alternate infinite linear; }
```
3-2. runnig클래스 붙이기

3-3. 스크롤이 멈추면 running클래스 제거해 움직임 멈추기

3-4. 캐릭터 뒤통수 보이게 하기

4. 캐릭터 키보드로 좌우로 움직이게 하기

※ 참고) keycode.info ->키보드 코드를 알려주는 웹사이트 

4.1 keydown 이벤트, keyup 이벤트

4.2 좌우로 이동하는 것 (속도도 다르게 한다.)
requestAnimationFrame을 활용.

5. 속도를 랜덤으로 만들기



