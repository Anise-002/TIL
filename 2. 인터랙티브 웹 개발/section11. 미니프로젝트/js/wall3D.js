(function(){
    
    const houseElem = document.querySelector('.house');
    const stageElem = document.querySelector('.stage');
    const selectCharacterElem = document.querySelector('.select-character');
    let maxScrollValue;
    const mousePos = {x : 0, y:0};
    const barELem = document.querySelector('.progress-bar');
    

    function resizeHandler(){
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }
    console.log(maxScrollValue);

    window.addEventListener('scroll', function(){
        //****공간 움직임 */
        // console.log(this.pageYOffset/maxScrollValue);
        // 이거 뭐냐? 왜?? 작동은 되는데 줄이 있지??
        const scrollPer = pageYOffset/maxScrollValue;
        // 전체에서 스크롤의 비율계산을 scrollPer로 선언
        const zMove = scrollPer * 970 -490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        //****프로그래스바 
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

    stageElem.addEventListener('click', function(e){
        console.log(e.clientX/window.innerWidth * 100);
        
        new Character({
            xPos : e.clientX/window.innerWidth * 100,
            speed : Math.random() * 0.5 + 0.2
        });
    // 캐릭터 생성자를 호출할려먄 new를 앞에 붙여준다.

    })

    selectCharacterElem.addEventListener('click',function(e){
        const value = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', value);
        
    });

})();