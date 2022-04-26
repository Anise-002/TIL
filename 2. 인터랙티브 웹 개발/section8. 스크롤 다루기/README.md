# Section8. 스크롤 다루기

## 1. 스크롤 이벤트 다루기

### pageYoffset
> 스크롤이 몇px 되었는지 확인하기

```
(function(){
            //스크롤이 몇 px했는지 확인한다.

            const outputElem = document.querySelector('.output');

            window.addEventListener('scroll', function(){
                outputElem.innerHTML = window.pageYOffset;
            })
        })();
```

## 2. 스크롤 위치에 따라 오브젝트 조작하기

### offsetTop
>처음 위치를 가져온다.(스크롤이 변화 할때의 위치는 반영되지 않는다.)


### getBoundingClientRect() 
> 크기와 위치를 알수 있는 메서드로서 스크롤 할때마다 바뀌는 위치를 알수 있다.

메서드의 속성으로는 bottom, height, left, right, top, width, x, y값이 있다.
x, y값은 인터넷익스플로어에서 지원하지 않아 top, left값으로 사용할 수 있다.

스크롤할때의 y값을 알고 싶으니까 top을 속성값으로 해서 가져온다.
```
ilbuniElem.getBoundingClientRect().top;
```
스크롤할때마다 값이 갱신이 된다. 

+ 스크롤 안한 상태가 offsetTop과 같다. 차이점은 소수점까지 나온다는것
+ 브라우저에 딱 맞는 위치는 0이 된다.
+ 현재의 엘리먼트가 어디에 있는지 알 수 있다.

### 응용
브라우저의 4분의1 지점에서 엘리먼트 크기가 커지게  만든다면

```
const outputElem = document.querySelector('.output');
const ilbuniElem = document.querySelector('.ilbuni');

function showValue(){
    let posY = ilbuniElem.getBoundingClientRect().top;
    //일분이의 y값
    outputElem.innerHTML = posY;
    //일분이의 y값을 output에 나타나게 한다.

    
    if(posY < window.innerHeight * 0.2){
        ilbuniElem.classList.add('zoom');
    }else{
        ilbuniElem.classList.remove('zoom');
    }
}

window.addEventListener('scroll', function(){
    showValue();
    //스크롤할때 showValue(일분이의 y값 출력과 4분의 1지점일때 크기변화)

})

```
+ 이벤트함수는 최대한 간략하게 만든다.
-> 움직임, 기능을 주는 함수는 밖으로 빼내어 호출하는 형식으로 한다.
-> 그렇게 하면 코드가 유연해지고 각 다른 상황에 대처하기 좋다.
+ 크기를 조절하는 함수 showValue()함수를 생성한다.
+ if문으로 브라우저높이의 4분의 1지점일때 엘리먼트가 커지는 css클래스를 더하고 그렇지 않으면 클래스는 제거한다.



