(function(){
    
    const houseElem = document.querySelector('.house');
    let maxScrollValue;
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

    window.addEventListener('resize',resizeHandler);
    resizeHandler();
    //이거는 처음 윈도우를 열면서 값을 초기화 시켜줄려고 함수를 호출한다.

})();