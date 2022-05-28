(()=>{

    let yOffset = 0;    //window.pageYOffset 대신 쓸 수 있는 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
    let currentScene = 0; //(인덱스)/현재 활성화된 (눈 앞에 보고 있는 씬) scroll-section
    let enterNewScene;  //새로운 section이 시작된 순간 true;
    //애니메이션의 정보
    const sceneInfo = [
        {   
            //scroll-section-0
            type : 'sticky',
            heightNum : 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs : {

                container : document.querySelector('#scroll-section-0'),
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d'),
            },//html 요소들을 넣는 객체
            values : {
                messageA_opacity : [0, 1]
            }

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

    //레이아웃 - sceneInfo의 높이를 세팅해주고, 새로고침하거나, 창을 바꿀 떄도 세팅하도록 한다.
    function setLayout(){
        //각 스크롤 섹션의 높이 세팅
        for(let i = 0; i < sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }
        
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for(let i = 0; i <sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);

    }
    //currentYOffset : 현재 얼마나 스클로이 되었는지 (각 섹션에서)
    function calcValues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        
        rv = scrollRatio * ( values[1]-values[0]) + values[0];
        
        return rv;
    }
    
    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch(currentScene){
            case 0: 
                //console.log('0 play');
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
                console.log(messageA_opacity_in);
                objs.messageA.style.opacity = messageA_opacity_in;
                
                //css
                break;
            case 1 : 
                // console.log('1 play');
                break;
            case 2 :
                // console.log('2 play');
                break;
            case 3 :
                // console.log('3 play');
                break;
        }
    }

    function scrollLoop(){
        prevScrollHeight = 0;
        enterNewScene = false;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);

        }
        if(yOffset < prevScrollHeight){
            if(currentScene === -1) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(enterNewScene === true) return;
        playAnimation();
       
    }

   
    window.addEventListener('scroll',()=>{
        //스크롤 함수를 이용해서 여러개의 함수를 이용하기 위해서 익면 함수를 사용했다.
        yOffset = window.pageYOffset;
        scrollLoop();   //스크롤 하면 기본적으로 실행되는 함수
    });
    window.addEventListener('resize',setLayout);
    window.addEventListener('load',setLayout);
    
    
})();
