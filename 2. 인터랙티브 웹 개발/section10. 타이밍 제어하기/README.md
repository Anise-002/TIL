# Section 10. 타이밍 제어하기

## 1. setTimeout
> `setTimeout(function(){},걸리는 초);` 의 형태를 가진다.

예제1
```javascript
 setTimeout(function(){
            console.log('setTimeout!');
        },1000);
        //1000ms = 1s 1초 후에 함수를 실행하세요 라는 뜻
```
예제2
```javascript
function sample(){
            console.log('sample!');
        }
setTimeout(sample ,3000);
```
함수를 먼저 정의하고 setTimeout를 이용해 3초 후에 콘솔에 sample를 출력하도록 함

+ setTimeout은 리턴하는 값이 숫자로 있다????
반복이 되면 보통 1씩 늘어난다. 이것을 이용해 setTimeout을 취소할 수도 있다. -> clearTimeout();

+ 내가 원하는 시간만큼 지연시킬떄 사용하는 용도
+ 비동기 테스트, 의도적으로 다음 턴에 사용하는 용도로 사용되면 한번만 실행된다.

## 2.  clearTimeout();
()안에 setTimout이 리턴한 값을 넣으면 setTimeout이 취소가 되어 실행되지 않는다.
```javascript
let timeId;

        function sample(){
            console.log('sample!');
        }
        timeId = setTimeout(sample ,3000);
        
        console.log(timeId);

        clearTimeout(timeId);
```
이때 timeId의 setTimeout은 실행되지 않는다.

예제(index2.html)파일
-> 취소버튼은 클릭하면 setTimeout을 취소하겠금 한다.


## 3. setInterval
> 계속 반복하는 애
시간은 몇초만에 반복할 것이냐 라는 뜻으로 
1000이면 1초마다 반복한다.라는 뜻

배터리 소모가 쉽고, 컴퓨터 성능이 적으면 버벅거리는 단점을 가지고 있다.

### 4. clearInterval
> setInterval을 취소하게 하는 것

### 5. requestAnimationFrame
setInterval의 단점을 개선해서 만들어진 것
구버전은 지원이 되지 않는다.

+ 반복 시킬 함수 안에 적는다.

```javascript
function sample(){
            console.log('sample!');
            
            timeId = requestAnimationFrame(sample);
        };
        //반복해서 여러번 sample이 호출
```
이게 반복되는 이유는 `requestAnimationFrame()안에 호출하는 함수가 자기자신인 함수이기때문에 계속해서 반복되어 호출되어 `setInterval`과 같은 기능을 실행 할 수있다.

`requesAnimationFram`을 반복시킬 함수 밖에 위치하게 된다면 반복하지 않고 `setTimtout`처럼 한번만 실행하고 끝나게 된다.
```javascript
function sample(){
            console.log('sample!');
        };

 timeId = requestAnimationFrame(sample); //sample!

```

+ 초당 60번을 목표로 반복한다.
+ 조건을 만들어서 반복하는 횟수를 정할 수 있다.
```javascript
let timeId;
let n = 0;
const btn = document.querySelector('.btn');

function sample(){
    n++;
    console.log('sample!'); 
    if(n > 200){
        return
    };
    timeId = requestAnimationFrame(sample);
};
sample();
```
n의 변수를 선언해 n의 값을 조건으로 해서 반복되는 횟수를 정한다.

+ `requestAnimationFrame`은 캔버스에서 setInterval보다 많이 사용하기 때문에 잘 알아두자!

### 6. cancelAnimationFrame
> `requestAnimationFrame()`의 실행을 멈출떄 사용한다.
