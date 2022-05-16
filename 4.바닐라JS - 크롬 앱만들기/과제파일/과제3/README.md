# 과제3
## 과제내용
+ 0에서 사용자가 지정한 숫자까지의 범위에서 랜덤한 숫자를 찾으세요.(범위는 0 이상 입력값 이하가 되어야 한다.)
+ 범위에는 음수가 폼하될 수 없다.
+ 실시간으로 범위 값을 업데이트해야 한다.
+ 유저가 숫자를 선택한 후에 게임을 플레이할 수 있다.
+ 유저에게 게임의 승패를 알려야 한다.

## 과제 수행
### 1. HTML
```html
<h1>Random Number Game</h1>
    <form id="Game-form">
        <h3 class="maxnumber">
            Generate a number between 0 and
            <input required min="1" type="number" />
        </h3>
        <p class="guessnumber">
            Guess the number: <input required max min="0" type="number" />
            <button>play!</button>
        </p>
    </form>
    <p class="hidden" id="game-score">
      You chose : <span class="usernum-view"></span>,
      the machine chose:<span class="machinenum-view"></span>
    </p>
    <h3 class="game-result hidden"></h3>
```
+ `input`의 고정 범위는 html로 지정했다.( min, max )
+ 사용자에 입력에 따라 최대 범위가 바뀌는 `guessnumber input`에는 max값을 지정하지 않고 속성만 남겨 놓았다.
+ html의 form태그의 유효성검사를 사용하기 위해 input태그를 사용한 태그를 form태그에 넣어 작성함

### 2. css
```css
.hidden {
          display: none;
        }
```
+ play를 누르기 전에는 보이지 않아야 할 태크에 css를 이용해 숨겨놓음

### 3. js
#### 사용할 태그 가져옴
```javascript
const GameForm = document.querySelector("#Game-form"); //form전체 태그
const maxInput = document.querySelector(".maxnumber input"); //범위 지정 input태그
const guessInput = document.querySelector(".guessnumber input"); //사용자가 숫자를 입력하는 input 태그
const GameScoreView = document.querySelector("#game-score"); //play를 눌렀을때 나타나는 태그
const usernumView = document.querySelector(".usernum-view"); //사용자가 선택한 숫자를 보여주는 span태그
const machinenumView = document.querySelector(".machinenum-view");
//랜덤한 수를 나타내주는 span태그
const gameResult = document.querySelector(".game-result");
//게임 결과를 알려주는 h3태그

```
#### form이 sumbit을 하면 수행되는 함수

```javascript
function playGameHandler(event) {
  event.preventDefault();
  const maxInputValue = parseInt(maxInput.value);
  const guessInputValue = parseInt(guessInput.value);
  const machinenumValue = Math.ceil(Math.random() * maxInputValue);

  GameScoreView.classList.remove(HIDDEN_CLASS);
  gameResult.classList.remove(HIDDEN_CLASS);
  usernumView.innerText = guessInputValue;
  machinenumView.innerText = machinenumValue;
  if (guessInputValue > machinenumValue) {
    gameResult.innerText = "You win";
  } else {
    gameResult.innerText = "You lose";
  }
}
```
+ 이벤트 매개변수를 통해 기존에 form태그의 기본 행동을 막는다.
+ play를 누르면 `GameScoreView`와 `gameResult`가 보일 수 있게 `hidden`클래스를 제거한다.
+ `guessInput.value`, `maxInput.value`는 문자열을 반환한다. 따라서 `parseInt()`를 통해 문자열인 숫자를 number로 변환시켜준다.
+ 랜덤한 값을 구하기 위해 `Math.random()`를 사용해 0에서 1의 값을 랜덤하게 받은 다음 사용자가 제시한 범위로 만드어주기 위해 `maxInputValue(maxInput.value)- 사용자가 처음 input`에 적은 값을 곱해주면 해당 범위를 지정할 수 있다.
  + `Math.ceil`를 통해 소수점 값을 날려준다. 
  + 날려서 나온 값을 컴퓨터가 계산한 랜덤값을 `machinenumView.innerText`에 넣는다.
+ 조건문을 통해 `사용자가 지정한 수`와 `랜덤한 값`을 비교해 결과를 나타낸다.

#### input에 넣을때마다 값을 실시간으로 범위를 업데이트한다.
maxInput의 값을 `localStorage`에 넣어 저장한다.<br>
form요소의 input을 수정할때마다 이벤트를 감지해서 `localStorage`의 값을 실시간으로 변경해 범위가 변경 될 수 있도록 하는 함수이다.

```javascript
function inputHandler() {
  localStorage.setItem(MAXNUM, maxInput.value);
  console.log(localStorage.getItem(MAXNUM));
  let saveMaxNum = localStorage.getItem(MAXNUM);
  guessInput.setAttribute("max", saveMaxNum);
}
GameForm.addEventListener("input", inputHandler);
```
+ input에 들어오는 값을 maxnum의 key값으로 넣어 `localStorage`에 넣는다.
+ 현재 `localStorage`에 들어간 값을 `getItem()`을 이용해서 변수에 담는다.
+ 변수에 담긴 값을 guessInput의 속성인 max에 값으로 넣는다.(`setAttribut(0,0)`이용)
+ form태그 안에 input이 수정될때마다 이벤트가 실행되도록 한다.
<br>
<br>


## 과제를 하면서
이번 과제는 어려웠다.
처음에는 감을 못잡아서 조거문을 이용해서 max값이 크다면 alret를 띄우는 식으로 코드를 구성했는데, 이 과정에서 많이 삽질했다..이것보다 더 좋은 방법이 있을 거서 같다 생각에 강의를 정리한 노트를 다시 봤다.<br>
이번 강의에서 새롭게 배운 것 중에 `localStroage`를 배웠는데 과제의 의도가 이것을 이용해 max의 값을 실시간으로 변경시키는 것 같다고 생각이 들어서 코드를 다 지우고 다시 작성했다.<br>
코드를 작성하면서 이건는 왜 안되지? 싶은 것들도 있고 왜 이변수는 읽는데 저 변수의 값을 읽지 못하는건가 싶기도한 부분이 있어서 헷갈렸지만 그래도 내가 이렇게 코드를 작성하고 있다는게 너무 신기했다. <br>
나름대로 열심히 구성한 코드인데 해답은 어떻게 나올지 궁금하기도 하다.<br>
저번과제의 해답을 보니까 다른 것들을 다 비슷한데 변수명이 너무 달랐다. 좀더 포괄적이고 어떤 상황에 변경하더라도 변수명이 변경되지 않는 이름으로 변수명을 지어야 겠다는 생각이 들었고 동작을 대표하는 변수명을 지어야 겠다고 생각했다.(각 속성,또는 특징을 변수명으로 하는것이 아닌, 해당 코드의 동작 또는 행동 결과에 대한 변수명을 고민해봐야겠다.)