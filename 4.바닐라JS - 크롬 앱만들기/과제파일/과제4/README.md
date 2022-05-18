# 과제4
## 과제내용
## TIME UNITL CHRISTMAS
크리스마스까지 시간 디데이 만들기
+ `Date`와 `setInterval`함수를 사용해 크리스마스까지 며칠이 남았는지 알려주는 시계를 만드세요.

### HTML
```html
<h1>Time Until Christmas Eve</h1>
<h2 class="js-clock"></h2>
```
+ h2태그 안에 결과 값을 넣어준다.

### JS
```javascript
const clockTitle = document.querySelector(".js-clock");

function ChritsmasDday() {
  const Christmas = new Date("2022-11-25");
  const today = new Date();
  const milliSeconds = Christmas - today;
  const days = String(
    Math.floor(milliSeconds / (1000 * 60 * 60 * 24))
  ).padStart(2, "0");
  const hours = String(
    Math.floor((milliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");
  const minutes = String(
    Math.floor((milliSeconds % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const second = String(
    Math.floor((milliSeconds % (1000 * 60)) / 1000)
  ).padStart(2, "0");

  clockTitle.innerText = `${days}d ${hours}h ${minutes}m ${second}s `;
}
ChritsmasDday();
setInterval(ChritsmasDday, 1000);

```
+ `new Date()`의 인수로 지정 날짜를 넣어 변수 `Christmas`에 저장한다.
+ 현재 시간을 갖는 변수를 만든다. => `today`
+ 연산자-를 사용해 크리스마스날짜에서 현재 날짜는 빼준다.
  + 이때, Date() 값을 연산하게 되면 ms(밀리초)단위의 값이 리턴된다.
    > 300일 16시간 33분 21초를 밀리초로 환산한 계산식
    > +   300일 (25920000000ms) + 16시간 (57600000 ms) + 33분 (1980000 ms) + 21초 (21000 ms) = 25979601000 ms
+ 밀리초 값을 일, 시간, 분, 초 단위에 맞게 환산해준다.
  > 시간 단위
  >+  1day = 1000 * 60 * 60 * 24 miliseconds
  >+  1hour = 1000 * 60 * 60 miliseconds
  >+ 1minutes = 1000 * 60 miliseconds
  >+ 1second = 1000 miliseconds<br>

>+ `days`(날짜) = miliseconds / 1000 * 60 * 60 * 24 의 몫
>+ `hours`(시간)은 `miliseconds / 1000 * 60 * 60 * 24`의 나머지 값을 구해 시간 단위로 바꿔준다.
  >   + 우리가 알고 싶은 것은 전체 밀리초가 몇시간인지가 아니라 `Christmas와 today의 시간만의 차`를 구해 나타내야 한다.
  >   +  전체 밀리초에서 1일이 몇시간인지 구하면 나머지 값으로는 ((시간 + 분 + 초)의 밀리초값)의 합계 값이 나타난다.
  >   + (milliSeconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  >   + 그 합계 값을 시간단위(1000 * 60 * 60)로 나누면 그 몫이 분이 되고 나머지 값((분 + 초)의 밀리초)이 된다.
>+ `minutes`(분) : (milliSeconds % (1000 * 60 * 60)) / (1000 * 60)
  >   + 전체 밀리초에서 분을 나누면 나머지 값((분 + 초)의 밀리초 합계)가 나온다.
>+ `second`(초) : milliSeconds % (1000 * 60) / 1000
  >   + 전체 밀리초에서 분을 나눈 나머지 값이 초의 값이 된다. 나온 값은 밀리초 단위이기 때문에 1000을 곱해 초(s)로 바꿔준다.

+ 이때 값들은 소수점 자리일 수 도 있으므로 [`Math.floor()`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)를 이용해 소수점을 날려 정수로 만들어준다.
+ `padStart()`를 이용하기 위해 Date()값을 문자열을 만들어준다. -> `String()`이용
+ `padStart(2,"0")`을 사용해 문자열을 2자리로 제약을 주고 2자리가 아닌 경우에 앞에 0을 붙여주도록 한다.

<br>
<br>

#### 단위변화 계산식을 다른 방법으로 계산해 보았다.
```javascript
const TestMonth = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));
  const TestHours = Math.floor((milliSeconds / (1000 * 60 * 60)) % 24);
  const TestMinutes = Math.floor((milliSeconds / (1000 * 60)) % 60);
  const TestSeconds = Math.floor((milliSeconds / 1000) % 60);
  console.log(TestMonth);
  console.log(TestHours);
  console.log(TestMinutes);
  console.log(TestSeconds);
  ```
  + 전체밀리초를 원하는 단위로 바꾼다음  `%연산자`를 이용해 원하는 시간이 나머지 값이 되도록 했다.
  + `Math.floor()`를 이용해 소수점을 날린다.

<br>
<br>
<br>

## 과제를 하면서
 디데이 카운트를 만드는게 쉽다고 생각했는데 쉽지 않았다.
 디데이날짜에서 현재 날짜를 뺀 날짜를 html태그에 넣으면 될 거라고 생각하고 날짜를 뺐더니.. 값이 이상한 값이 나왔었다. 
 알게 된건, Date()의 값을 빼면 ms(밀맃초단위)로 환산된되어 단위를 변환시켜야 했다...근데.. 단위를 바꾸는 계산식을 세워야하는데 도통 생각이 나지 않아 구글님께 도움을 청해 해결했다.
  내가 구상했던 틀은 똑같았지만, 구체적인 계산식에서 막혀서 구글링하면서 이번 과제를 풀었다. 구글링을 통해 과제를 해결한 것 같아서 컨닝한 것 같지만... [인터넷의 그분](https://velog.io/@dev-hannahk/js-d-day)(의 댓글)의 계산식이 아니였다면 이번 과제를 풀지 못했을 지도 모른다.. 감사합니다.ㅠㅠㅠㅠ 공부를 위해 값의 단위를 나타낼수 있는 식을 고민해 다른 계산식을 세워보았다. 수학은..정말... 큰 산이다..

