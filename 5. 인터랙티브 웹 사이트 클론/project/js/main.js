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
                //in
                messageA_opacity_in : [0, 1, { start : 0.1, end:0.2}],
                messageA_translateY_in :[20, 0,{ start : 0.1, end:0.2}],
                messageB_opacity_in : [0, 1, { start : 0.3, end:0.4}],
                //out
                messageA_opacity_out : [1, 0, { start : 0.25, end:0.3}],
                messageA_translateY_out :[0, -20, { start : 0.25, end:0.3}],
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
            if(sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
            }else if(sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHegiht;
                sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
            }
            
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
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        
        if(values.length === 3){
            //start~end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ){
                rv = (currentYOffset-partScrollStart) / partScrollHeight * ( values[1]-values[0]) + values[0];
            }else if(currentYOffset < partScrollStart ){
                rv = values[0];
            }else if(currentYOffset > partScrollEnd ){
                rv = values[1];
            }
        }else{
            rv = scrollRatio * ( values[1]-values[0]) + values[0];
        }
        
        return rv;
    }
    
    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch(currentScene){
            case 0: 
                //console.log('0 play');
                const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
                const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
                const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
                const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
                // console.log(messageA_opacity_in);

                if(scrollRatio <= 0.22){
                    // in
                    objs.messageA.style.opacity = messageA_opacity_in;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`; 
                }else{
                    //out
                    objs.messageA.style.opacity = messageA_opacity_out;
                    objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
                }                
               
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
