# 과제5
## 과제내용
button을 클릭했을때 랜덤하게 배경색을 바꾼다.

### js
```javascript
const button = document.querySelector("button");
  const body = document.body;
  console.log(body);
  function changeBackColor() {
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    const lastColor = colors[Math.floor(Math.random() * colors.length)];
  
    console.log(firstColor, lastColor);
    body.style.background = `linear-gradient(to right, ${firstColor}, ${lastColor})`;
    console.log(body);
  }
  
  button.addEventListener("click", changeBackColor);
```
+ click 이벤트를 사용해 body의 배경색을 바꾼다.
+ 랜덤한 컬러를 이용하기 위해 `Math.random()`을 사용함
+ 여기서 그라데이션 배경컬러를 style.background를 이용해 넣어준다.
  + 이때, 처음에 backgroundColor를 이용해 그라데이션을 넣으니까 색상이 변경되지 않고 오류도 나지 않아서 잘 못된 부분을 찾는데 시간이 거렸다.
  + `backgroundColor`는 단색일 경우에만 사용한다.
  + `background`는 그라데이션 컬러일때 사용
+ 그라데이션은 css의 [`linear-gradient`](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)를 사용한다.
  + 기본 값은 위에서 아래이므로, 옆으로 이어지는 그라데이션을 만들기 위해 `to right`또는 `to left`를 사용해 지정했다.

<br>
<br>

## 과제를 하면서
이번 과제는 어렵지 않았지만, css쪽에서 은근 애를 먹었다. 
css에 대해 잘 알고 있다고 생각했는데, 잘 안쓰니 잘 까먹는 것 같다. js도 그렇지만 틈틈히 css를 상기시킬 수 있도록 해야 할 것 같다.





