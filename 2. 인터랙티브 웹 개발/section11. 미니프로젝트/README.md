# 미니프로젝트

## 프로젝트 기능
1. 3D공간
2. 스크롤 이벤트 - 3D 공간감 나타내기
3. 마우스 이벤트 - 3D 공간 시점 움직이기
4. 캐릭터 동적 생성
5. 캐릭터 조합
6. 키보드 조작 - 캐릭터와 공간 조작
7. 클릭 이벤트 - 공간의 색상변화와 캐릭터 바꾸기

## 1.
## 2.
## 3. 마우스 이벤트 - 3D 공간 시점 움직이기
### mousemove 이벤트
>`clientx`, `clienty` 를이용하여 마우스의 현재 위치를 px단위로 알 수 있다.
+ 이 값을 계산해서 우리가 쓰기 좋은 형태로 만들어줘야 한다.
+ 이 속성은 화면의 왼쪽 위의 값이 0이다.
+ 우리가 원하는 효과는 마우스가 가운데에 있을때 기준으로 위, 아래, 좌우가 균일하게 움직이길 원한다.
+ 하지만 cilentx, clinety값을 그대로 쓰기에는 어려움이 있기떄문에 회전각을 계산하기에 어려움이 있다.
+ 따라서 가운데의 값(0)를 기준으로 마이너스(-1), 플러스(+1)값으로 해서 많든다.
```javascript
 const mousePos = {x : 0, y:0};
mousePos.x = -1 +(e.clientX/this.window.innerWidth) * 2;
mousePos.y = 1 - (e.clientY/this.window.innerHeight)*2;
```
이 식을 통해 가운데가 원점(0)으로 만들 수 있다.!!!!!!
이 값에서 적절한 값을 곱해 원하는 값을 만들 수 있다.
+ 아주 많이 사용하는 식임으로 기억해두는 것이 좋다.
+ 설명 : `e.clientX/this.window.innerWidth`은 0에서 1사이의 값의 비율을 나타낸다.

#### 어디에 적용해야 할까???
캐릭터도 추가할 예정임으로 벽으르 포함하고 있는 `house`와 캐릭터를 포함하고 있는 컨테이너인 `stage`를 회전 시켜 적용시켜준다.
```javascript
const stageElem = document.querySelector('.stage');

stageElem.style.transform = 'rotateX(' + 0 + 'deg) rotateY(' + 0 +'deg)';
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

## 4.
