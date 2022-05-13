# 과제2
## 과제 내용
+ 브라우저 화면에 크기에 따라 배경색을 3단계로 바꾼다.

## 과제 수행
### 1. css로 변경할 컬러들을 클래스로 지정했다.
```css
h1{
    color: white;
}
.purple{
    background-color: blueviolet;
}
.yellow{
    background-color: gold
}
.blue{
    background-color: cornflowerblue;
}
```

### 2. js파일에 조건문을 이용해 코드를 작성
```javascript
const body = document.querySelector('body');


function colorHandler(){
    let windowWidth = window.innerWidth;
    console.log(windowWidth);
    const backYellow = "yellow"
    const backPurple = "purple"
    const backblue = "blue"

    if(windowWidth >= 900){
        body.classList.remove(backPurple,backblue);
        body.classList.add(backYellow);
    }else if(windowWidth < 900 && windowWidth >= 650 ){
        body.classList.remove(backblue,backYellow);
        body.classList.add(backPurple);
    }else{
        body.classList.remove(backYellow,backPurple);
        body.classList.add(backblue);
    }
}

window.addEventListener('resize',colorHandler);
colorHandler();
```
1. html의 body의 배경색을 변경하기 위해 element를 변수에 지정했다.
2. 윈도우를 움직였을때 이벤트가 나와야 하기 때문에 window에 이벤트 'resize'를 걸어주었다.
3. colorHandler함수에 css의 클래스 이름을 변수에 담아 쓰기 편하게 만들었다.(이름을 어떻게 정할지 감이 안와서 일단은 직관적으로 변수명을 정했다.)
4. 윈도우의 창 크기가 변하면 색상이 변경되는데 조건문을 이용해 조건을 걸어주고, classList.add와 remove를 이용해 각 조건마다의 경우를 지정해주었다.
4. 이벤트 핸들러 함수를 입력하고 실행하니까 초기화면에 body의 배경색이 나타나지 않아서 해결하기 위해 colorHandler함수를 코드가 실행될떄 실행시켜 창이 어떤 크기가 되더라도 내가 지정한 조건대로 배경색이 나타나도록 실행했다.

### 과제를 하면서 
+ `let windowWidth = window.innerWidth;`은 전역 함수로 지정하면 값이 변경되지 않았다. 전역변수로 넣었을때 윈도우 값이 변하는 것을 인지하지 못하기 때문에 똑같은 값이 나오는 것 같다.
  + 해결 방법 : 이벤트핸들러 함수 안에 변수를 선언하니까 윈도우가 변경될때마다 값이 변경되어 조건문에 이용했다.
+ `colorHandler();` : 이 함수가 그냥 이벤트를 위한 함수라고 생각하고 한곳에만 쓴다고 고정적으로 나도 모르게 생각하고 있었던 모양이다. 이 코드를 전역에 실행시키지 않고 코드를 실행했을때 초기 화면에 하얗게 나왔을때 내 머리도 하애진걸 생각하면... 이 코드 덕에 어떻게 해야 이벤트가 실행되지 않아도 윈도우에 원하는 결과를 얻을 수 있을까 고민하는 시간을 가질 수 있게 되었다. 결론적으로는 함수는 재사용을 할 수 있다는 것, 고정적으로 딱 한 곳에서 사용하지 않는다는것을 명심해야 겠다.
<br>

과제를 수행하면서 이 코드보다 더 괜찮은 코드는 무엇이 있을까 고민했지만, 지금 내 머리에서 나오는 수준이 이정도가 베스티인 것 같다. 뭔가를 더 할려고 하면 더 코드가 더 길어지는 것 같아서 더 만지기를 포기했다. classList.remove보다 더 나은 코드가 있을 것 같은데 지금까지 배운거로는 할 수 있는게 각 변수명을 넣어서 제거해주는 것밖에... 


