# 
##
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

### 스크롤 처리 기본 개념 잡기
