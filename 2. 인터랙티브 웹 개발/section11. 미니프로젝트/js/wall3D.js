(function(){
    
    const houseElem = document.querySelector('.house');
    const stageElem = document.querySelector('.stage');
    let maxScrollValue;
    const mousePos = {x : 0, y:0};
    const barELem = document.querySelector('.progress-bar');
    

    function resizeHandler(){
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }
    console.log(maxScrollValue);

    window.addEventListener('scroll', function(){
        // console.log(this.pageYOffset/maxScrollValue);
        // 이거 뭐냐? 왜?? 작동은 되는데 줄이 있지??
        const scrollPer = pageYOffset/maxScrollValue;
        // 전체에서 스크롤의 비율계산을 scrollPer로 선언
        const zMove = scrollPer * 970 -490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        //프로그래스바 
        barELem.style.width =  (scrollPer*100)+ '%';
    });
    
    window.addEventListener('mousemove',function(e){
        // console.log(e.clientX, e.clientY);
        mousePos.x = -1 +(e.clientX/this.window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY/this.window.innerHeight) * 2;
        // console.log(mousePos.x, mousePos.y);
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) +'deg)';
    });

    window.addEventListener('resize',resizeHandler);
    resizeHandler();
    //이거는 처음 윈도우를 열면서 값을 초기화 시켜줄려고 함수를 호출한다.

})();