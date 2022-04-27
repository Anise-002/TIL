# Section 9. Transition/Animation 이벤트

## 1. Transition 이벤트 (index1.html파일 참고)

```javascript
<script>
    const ballElem = document.querySelector('.ball');

    window.addEventListener('click',function(e){
        console.log(e.clientX, e.clientY);
        ballElem.style.transform = 'translate('+ e.clientX +'px,' + e.clientY +'px)';
    });

</script>
```
코드에서 클릭했을때 ballElem이 마우스 클릭하나 부분에 따라오지만 완전하게 따라오지 않는 것처럼 보인다.
그 이유는 css reset을 해주지 않은 것도 있으며, ballElem의 position이 absolute가 아니여서 그렇게 표현되는 것이다.

따라서 css로 positon : absolute를 해주던가 css reset을 해주면 좋으나 안해준 것 보다 오차 범윅가 줄어들었지만 커서가 ball의 커서를 가운데에 가고 싶으면
margin값을 조정하거나, e.clientX값을 조정해서 오차범위를 줄인다.
1. css로 조정
```css
.ball{
     position: absolute;
    left: 0;
    top: 0;
    margin : -15px 0 0 -15px;
}
```
2.script로 조정
```javascript
ballElem.style.transform = 'translate('+ (e.clientX-15) +'px,' + (e.clientY-15) +'px)';
```


### 1.  Transitionend 이벤트 
> 트랜지션이 끝났을때 발생하는 이벤트
무언가를 할때 트렌지션이 끝나고 바로 다른것을 이어서 해줄때 유용한 기능이다.
```javascript
ballElem.addEventListener('transitionend', function(){
        ballElem.classList.add('end');
    });
```
트렌지션이 끝나면 css end클래스(background-color : blue)가 붙여 변화가 일어난다.

1. transitionend 속성
+ elapsedTime :  트랜지션이 얼마나 시간이 경과했는지 알 수 있는 속성 (= transition-duration)
+ propertyName : 


### 2. Transitionstart 이벤트
> 트랜지션이 시작하자마자 이벤트 핸들러가 실행되는 이벤트 

<br>
<br>
<br>



## 2. Animation 이벤트
```css
.ball{
    animation: ball-ani 1s 3 alterante forwards;
};
```
+ `1s` : animation-duration
+ `3` : animation-iteration-count 
+ `alterante` : animation-direction
+ `forwards`(애니메이션이 끝난 후 끝난 상태를 유지하도록 하는 것) : animation-fill-mode 

### 1. animationend 이벤트
```javascript
ballElem.addEventListener('animationend', function(){
        ballElem.classList.add('end');
    })
```
`transitionend`와 비슷하게 작동하는데 
> 애니메이션이 끝난 후에 발생하는 이벤트
### 2. animationstart 이벤트
> 애니메이션이 시작하자마 실행되는 이벤트
### 3. animationiteration 이벤트 
> 반복실행하는 시점에서도 실행된다.
> 반복이 일어날때 일어나는 이벤트로 첫번째에는 반복하는 상태가 아니기 때문에 실행되지 않고 두번째 재생일때부터 일어난다. 

```javascript
ballElem.addEventListener('animationiteration', function(){
        console.log('반복');
    }
```
여기서 콘솔에는 반복이 2번 일어난다.
css 애니메이션에서는 3번 재생되게 했으나 2번 반복이 출력되는 것은 처음 재생한 상태는 반복재생의 상태가 아니기 때문에 `animationiteration`이 작동하지 않고 두번째 재생하는 시점은 반복재생하는 시점이기 때문에 그떄부터 실행하게 되는 것이다.