# 섹션 1 - 웹 페이지 골격 만들기
##
<br>
<br>

# 섹션 2 - 스크롤 이용한 인터랙션 구현
## 인터랙션 구현 컨셉
각 section 별 구간을 scroll값을 미리 나눠놓고, 각 구간별 애니메이션을 구상한다. (타임라인처럼)
각 스크롤될때 해당 범위의 section구간만 애니메이션 처리를 해주고,
나머지 section은 움직이지 못하도록 한다.(성능을 위해서)

각 스크롤의 높이에 따라 애니메이션 스피드가 달라진다.
+ 스크롤이 짧으면 빠르게 재생될 것이고, 길다면 느리게 애니메이션이 재생될 것이다.
+ 비디오나 이미지의 프레임의 정보, 중간 애니메이션의 타이밍에 대한 정보를 가지고 배열에 넣어 사용한다.(한눈에 알아보기 쉽고, 수정하기에 용의하다.)
즉, 배열에 애니메이션에 필요한 정보를 배열에 넣어 활용한다.


## 위치가 고정된 요소의 처리

예제사이트에서 스크롤해도 움직이지 않는 요소들을 `position: fixed`를 부여해준다.

현재 스크롤한 요소들만 보이도록 js로 스크롤 구간을 알아낸 뒤에 body에 해당 스크롤되는 id를 부여해 css로 `display: block`을 해서 보이도록 한다.
```javascript
.sticky-elem{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
#show-scene-0 #scroll-section-0 .sticky-elem
#show-scene-1 #scroll-section-1 .sticky-elem
#show-scene-2 #scroll-section-2 .sticky-elem
#show-scene-3 #scroll-section-3 .sticky-elem{
    display: block;
}
```

## 스크롤 높이 세팅

### js파일생성
+ 즉시실행 함수를 사용해 전역변수 사용을 피하기 위해서 사용한다.
+ 즉시실행 함수 안에 있는 변수는 지역변수가 되어 즉시실행 함수 밖에서 참조할 수 없다.
+ 전역변수 사용을 하면 어디서나 찾을 수 있어 중복이 일어 날 수 있으며, 전역변수가 변경될 위험이 있어 사용하는 것을 주의해야한다.

<br>
<br>

### 스크롤 애니메이션 정보를 담은 배열 생성
#### 1. 정보를 담는 배열을 만든다.
```javascript
const sceneInfo = [
        {   
            //scroll-section-0
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll-section-0')
            }//html 요소들을 넣는 객체

        },
        ....
        {
            //scroll-section-3
            type : 'sticky',
            heightNum : 5, 
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll-section-3')
            }

        }
    ];
```
+ 높이 `scrollHeight`프로퍼티로 설정하는데 값은 0으로 설정한다.
   + 0으로 한 이유는 사용자가 이용하는 기기의 높이를 제대로 맞추어 계산되도록 하기 위해 기본 세팅 값을 0으로 한다.(나중에 함수로 기기 대응을 함수로 처리할 것이다.)
+ `type` : 각 섹션이 어떤한 애니메이션 성격을 가지고 있는지 알려주는 요소
+ `heightNum` : 각 기기의 화면 높이를 보다 5배 크기의 섹션의 크리고 잡기 위해 설정한 값
+ `scrollHeight` : 초기값 0 - 함수를 이용해 다양한 디바이스 화면 높이에 일정한 비율로 적용 될 수 있도록 하기 위해 일단 0으로 세팅
+ `objs` : 각 섹션마다 가지고 있는 html요소의 것들을 모아둔 객체

#### 2. 기기 화면에 따른 스크롤 높이 설정
함수를 이용해 각 기기의 화면 마다 스크롤 높이를 설정하도록 한다.
```javascript
function setLayout(){
        //각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            //기기 화면에 맞춰 스크롤 높이를 계산해 준다.
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
            //계산한 값을 style.height를 이용해 변경시켜준다.
        }
    }
```
화면의 높이가 달라질 수 있는 경우도 있으니, 이벤트 `resize`를 이용해 `setLayout`함수를 호출해주면 화면의 높이가 달라져도 알아서 계산되도록 한다.

<br>

## 스크롤 처리 기본 개념 잡기
<br>

## 현재 활성시킬 씬 결정하기
scorollLoop는 바로 
 현재 화면에서 스크롤 되고 있는 section이 어떤 section인지를 확인하도록 한다.

### 일단, 전체 스크롤의 값을 알아보자
```javascript
let prevScrollHeight =0; //이전 스크롤의 값을 넣는 변수 생성

function scrollLoop(){
        //스크롤이 일어날떄마다 값이 계속 중첩되기때문에 
        //값을 초기화 시켜주기 위해 0을 할당한다.
        prevScrollHeight = 0;
        //4구간에 전체 스크롤 값을 알기 위한 반복문
        for(let i = 0; i < sceneInfo.length; i++){  
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        console.log(prevScrollHeight);
        
    }
```
+ `scrollLoop()`함수는 스크롤이 일어날때마다 호출되는 함수이다.
+ 따라서 함수 안에 있는 내용들은 스클롤이 되는 횟수마다 실행 된다.
   + `prevScrollHeight`의 값을 초기화 시켜줘야 스크롤될 떄마다 값은 값을 나오게 된다. 그렇지 않게 되면 값이 중첩된다.

### 내가 원하는 것은 내 화면의 위치가 어떤 섹션인지 원한다.

이전 스크롤의 높이 값 구하기
```javascript
let prevScrollHeight =0;
let currentScene = 0; //현재 화면의 인덱스 번호를 담는다.

function scrollLoop(){
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
    }

```
`sceneInfo.length`를 `currentScene`로 변경한다.
+ 함수가 실행되면 반복문이 실행되면서 `currentScene`의 값만큼 반복해서 `prevScrollHeight` 변수 안에 `sceneInfo`배열 안에 있는 정보들을 넣어주게 된다.
+ 1이면 `sceneInfo`배열의 인덱스 1까지 반복문으로 참조되어 값을 이전 스크롤 했던 값들(섹션을 기준인 높이를 가져온)의 합을 가져올 수 있게 된다.


`currentScene`의 값을 스크롤 값에 의해 구하도록 한다.
```javascript
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
        }
        if(yOffset < prevScrollHeight){
            if(currentScene === -1) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
        }
```
+ `yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight`
>+ `sceneInfo[currentScene].scrollHeight`이 있는 이유<br>
   > 만약 ` prevScrollHeight`만 있게 된다면,
   >     + `yOffset`의 값은 처음만 0이고 스크롤 할때부터 값을 갖게 된다. `prevScrollHeight`의 처음 값은 계속 0이기 때문에 `currentScene`의 값이 1이 된다. 즉, 0의 값을 유지할 수 없게 된다.
      >     + 처음 스크롤 할때부터 `currentScene`의 값이 1로 바뀐다. 
      >    + 결론 : `sceneInfo[currentScene].scrollHeight`값을 더하지 않은 경우에 `currentScene++`하게 되면 1이되면서 `0`의 값을 계속해서 얻지 못한다. 
      >    + `prevScrollHeight`의 값은 `sceneInfo[0].scrollHeight`의 값을 얻게 된다.
+ 또한, 처음부터 `currentScene`의 값이 1이 되면, `prevScrollHeight`의 값이 `sceneInfo[0].scrollHeight`이 되면서 처음 높이 0에서 대략(내 노트북 크기) 3730px를 가지게 되어,  `(yOffset < prevScrollHeight)`의 조건에 맞게 된다.
+ 그렇게 되면, `currentScene`는 감소되서 0이되고 0이되면 `prevScrollHeight`의 값이 0이 되어 첫번째 조건문에 조건에 해당되어 다시 `currentScene`값이 증감되어 계속해서 값이 변화하는 현상이 발생한다.


메뉴떄문에 값이 원하는 곳에 currentScene이 바뀐다. 따라서 메뉴의 공간을 차지하지 않도록 해준다.
+ 방법 1 : `prevScrollHeight`에 nav값을 빼주는 방법
+ 방법 2 : 공간차지하지 않도록 css를 position: absolute하면 pageYOffset에도 나타나지 않는다.

계산하기 쉬운 방법2를 사용한다.
```css
.global-nav{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    padding: 0 1rem;
}
.local-nav{
    position: absolute;
    top: 45px; 
    left: 0;
    width: 100%;
    height: 52px;
    border-bottom:1px solid #ddd; 
    padding: 0 1rem;
}
```
+ `position :absolute;`는 공간을 차지하지 않기 때문에 css에 추가해준다.
+ 각 요소마다의 위치 값들을 수정 해 준다.
+ `.local-nav`에 top의 값을 45px로 한 이유는 `.global-nav`의 높이가 44px이니 겹치지 않기 위해서 설정한 것이다.
+  `position :absolute;`는 width값을 넣지 않으면 쫄그라드니까 주의

<br>

## 현재 활성 씬 반영하기 
### id적용해 숨겼던 .elem-sticky 나타내기
`scrollLoop`함수를 통해 현재화면이 `currentScene`의 값을 구할 수 있었다.
`currentScene`의 값을 통해 css에서 body에 id로 `#show-scene-${currentScene}`를 넣어주어 `display:none`이었던 '.sticky-elem`을 'display : block `으로 변경시켜준다.
```javascript
function scrollLoop(){
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;

        }
        if(yOffset < prevScrollHeight){
            if(currentScene === -1) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
        }

       document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
```

### 새로고침 후에도 id 적용하기
새로고침 첫 화면과 스크롤을 하지 않았을 경우에는 id가 적용되지 않는 오류가 발생했다.

그래서 새로고침 했을때의 이벤트에 id를 적용시키는 함수를 넣어 주도록 한다.
현재 코드에서 초기화를 시켜주는 함수는 `setLayout()`이므로, 그곳에 현재 페이지의 `currentScene`값을 얻어 다시 id를 붙여주는 코드를 만든다.

```javascript
 function setLayout(){
        ...
        yOffset = window.pageXOffset;
        let totalScrollHeight = 0;
        for(let i = 0; i <sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);

    }

    window.addEventListener('load',setLayout);
    //window.addEventListener('DOMContentLoaded');
```
+ `totalScrollHeight` : 전체 페이지의 높이를 담는 변수(반복문을 이용해서 값이 변할 수 있어 let을 이용)
+ 반복문을 이요해서 `totalScrollHeight`의 값을 순차적으로 더해주는데, 조건식을 사용하여 제한을 걸어준다.
+ `조건식` : for문이 순차적으로 페이지 높이값을 더할때, 현재 더해진 값과 스크롤된 위치의 값을 비교해서 더해진 값보다 스크롤된 값이 작다면 그 해당 i의 값을 `currentScene`의 값으로 할당 후 반복문을 종료 시킨다.
+ body에 id를 `show-scene-${currentScene}`으로 넣어서 현재 화면에 숨겨진 '.sticky-elem'을 나타나게 해준다.

### scrollLoop( )함수 수정
```javascript

function scrollLoop(){
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);

        }
        if(yOffset < prevScrollHeight){
            if(currentScene === -1) return; 
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }       
    }
```
`currentScene`이 바뀔때 마다 id값을 부여해줄 수 있다. -> setLayout()에서 로드하자마자 `currentScene`를 계산해서 id를 넣어줬기 때문에 스크롤을 하지 않아도 id가 이미 부여되어 있어 `sticky-elem`이 나타나 있다.<br>
따라서 `currentScene`가 바뀔 때에 재 설정만 해주면 된다.
<br>

### 스크롤 애니메이션 구현1
`sceneInfo`객체 안 objs에 우리가 원하는 html요소를 추가한다.
```javascript
{   
            //scroll-section-0
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs : {

                container : document.querySelector('#scroll-section-0'),
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d'),
            },//html 요소들을 넣는 객체
            values : {
                messageA_opacity : [0, 1]
            }

        }
```
`#scroll-section-0 .main-message.a`요소는 스크롤 했을때 투명도가 0에서 1로 바뀌었다가 다시 0으로 돌아가는 애니메션을 가지고 있는 요소가 될 것이다.

opacity값도 values라는 프로퍼티 객체로 넣어 정보를 입력해준다.


```javascript
function playAnimation(){
        switch(currentScene){
            case 0: 
                console.log('0 play');
                break;
            case 1 : 
                // console.log('1 play');
                break;
            case 2 :
                // console.log('2 play');
                break;
            case 3 :
                // console.log('3 play');
                break;
        }
    }
```
스크롤 할때 일어나는 동작임으로 스크롤 이벤트를 실행하는 함수에서 호출시켜주며,
switch문을 이용해 전달 받은 매개변수의 값에 조건을 통해 현재 내가 스크롤한 화면이 몇번 section인지 값을 얻어 올수 있다.

그리고 화면상의 section에 해당하는 동작도 case를 통해 구분해서 넣을 수 있다.

<br>

### 스크롤 애니메이션 구현2
섹션 안에서 스크롤이 위치하는 비율을 구해야 한다.
> 섹션안에서의 offsetY 값 / 섹션의 전체 높이 => 0에서 1사이의 비율을 얻을 수 있다.
#### 섹션 안에서의 offsetY 값 구하기
> pageYOffset(전체페이지에서 움직인 스크롤의 높이 값) - 이전 섹션들의 높이의 합
   + 이렇게 계산하게 되면 현재 보여지는 섹션에서의 스크롤의 값만 알 수 있다.

### 섹션안에서의 비율을 구하는 함수
```javascript
//currentYOffset : 현재 얼마나 스클로이 되었는지 (각 섹션에서)
    function calcValues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        
        rv = scrollRatio * ( values[1]-values[0]) + values[0];
        
        return rv;
    }
```
+ `rv = scrollRatio * ( values[1]-values[0]) + values[0];` 
   + 0에서 1사이의 값을 사용하기엔 힘이 들고, 재사용하기 힘들기 때문에 큰 숫자로 바꿔줄 필요가 있다.
   + 그래서 변화되는 값의 차이를 곱해 범위를 정하고, 변화되기 전의 초기값을 더해줘 처음 값이 0이 되지 않도록 한다.
+ 함수의 매개변수 
   + `values` : sceneInfor객체안에 value프로퍼티에 접근하도록 하는 인수
   + `currentYOffset` : 현재 스크롤이 현재의 섹션에 몇px의 값을 갖는지 얻기 위한 인수
   + 두 인수 전부 스크롤 할때 호출되는 함수(playAnimation()) 안에서 계산되어진 값이면서 playAnimation()는 `calcValues`함수를 호출하여 값을 인수로 넣어준다.

#### 구한 값을 css에 적용하기
```javascript
const currentYOffset = yOffset - prevScrollHeight;

switch(currentScene){
            case 0: 
                //console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                console.log(messageA_opacity_in);
                //css
                objs.messageA.style.opacity = messageA_opacity_in;
                break;
                ....
}
```
변화하는 비율을 값에 따라 변화되도록 만든 함수를 이용해 css에 적용시켜준다.
+ `calcValues(values.messageA_opacity, currentYOffset);를 이용해 스크롤을 할때마다 변화되는 값을 얻는다.
+ css.style.opacity를 통해 `objs.messageA`의 css를 변경시켜준다.

하지만, 섹션에 처음부터 끝까지 실행되는것이 아닌 특정 구역만 실행하도록 원한다.

<br>

#### 스크롤 애니메이션 구현4
다음 섹션으로 넘어갈때나 위로 스크롤할때, 값이 마이너스(-)값이 될는 오류가 발생한다.
이 것은 스크롤이 속도에 따라 값이 영향을 받기 때문이라, 섹션이 변경될때 이러한 오류가 발생하니까 그 순간(섹션이 넘어가는 순간)만 값의 체크를 해준다.

섹션이 바뀌는 것을 알 수 있는 구간은 currentScene이 변화되는 곳이다.
즉, `scrollLoop()`안에 코드를 수정해주면 된다.

```javascript
let enterNewScene;  //새로운 section이 시작된 순간 true;

function scrollLoop(){
        prevScrollHeight = 0;
        enterNewScene = false;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);

        }
        if(yOffset < prevScrollHeight){
            if(currentScene === -1) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(enterNewScene === true) return;
        playAnimation();
       
    }
```
+ 전역 변수로 `let enterNewScene; ` 선언해준다. (이 변수는 currentScene이 변화되는지 알려주는 변수가 된다.)
+ currentScene이 변화될때 `enterNewScene`의 값을 true로 만든다.
+  `scrollLoop()` 안에 `enterNewScene`의 값을 false로 지정해준다. 그 이유는 스크롤할 때마다 초기값을 false로 만들어줘야 currnetScene이 변화될때 true로 변화되는 것을 인식할 수 있기 때문이다.
 + if문을 통해 `enterNewScene`의 값이 true일때는 함수를 빠져나가 아무것도 실행되지 않도록 해준다.


이렇게 하면 섹션을 아래에서 위로 올릴때 섹션이 변화될때 발생하는 마이너스(-)값의 오류를 방지할 수 있다.
<br>

#### 특정 타이밍 스크롤 애니메이션 기능 추가