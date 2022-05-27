(()=>{

    let yOffset = 0;    //window.pageYOffset 대신 쓸 수 있는 변수


    //애니메이션의 정보
    const sceneInfo = [
        {   
            //scroll-section-0
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll-section-0')
            }//html 요소들을 넣는 객체

        },
        {
            //scroll-section-1
            type : 'normal',
            heightNum : 5, 
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll-section-1')
            }

        },
        {
            //scroll-section-2
            type : 'sticky',
            heightNum : 5, 
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll-section-2')
            }

        },
        {
            //scroll-section-3
            type : 'sticky',
            heightNum : 5, 
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll-section-3')
            }

        }
    ];

    function setLayout(){
        //각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }
    }

    function scrollLoop(){
        
    }


    window.addEventListener('resize',setLayout);
    window.addEventListener('scroll',()=>{
        //스크롤 함수를 이용해서 여러개의 함수를 이용하기 위해서 익면 함수를 사용했다.
        yOffset = window.pageYOffset;
        scrollLoop();   //스크롤 하면 기본적으로 실행되는 함수
    })

    setLayout();
})();
