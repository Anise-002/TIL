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
                messageB_opacity_in : [0, 1, { start : 0.3, end:0.4}],
                messageC_opacity_in : [0, 1, { start : 0.5, end:0.6}],
                messageD_opacity_in : [0, 1, { start : 0.7, end:0.8}],

                messageA_translateY_in : [20, 0 ,{start : 0.1, end : 0.2}],
                messageB_translateY_in : [20, 0 ,{start : 0.3, end : 0.4}],
                messageC_translateY_in : [20, 0 ,{start : 0.5, end : 0.6}],
                messageD_translateY_in : [20, 0 ,{start : 0.7, end : 0.8}],
                //out
                messageA_opacity_out : [1, 0, { start : 0.25, end:0.3}],
                messageB_opacity_out : [1, 0, { start : 0.45, end:0.5}],
                messageC_opacity_out : [1, 0, { start : 0.65, end:0.7}],
                messageD_opacity_out : [1, 0, { start : 0.85, end:0.9}],

                messageA_translateY_out : [0, -20, { start : 0.25, end:0.3}],
                messageB_translateY_out : [0, -20,{start : 0.45, end : 0.5}],
                messageC_translateY_out : [0, -20,{start : 0.55, end : 0.6}],
                messageD_translateY_out : [0, -20,{start : 0.85, end : 0.9}],
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
                container : document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
				messageB: document.querySelector('#scroll-section-2 .b'),
				messageC: document.querySelector('#scroll-section-2 .c'),
				pinB: document.querySelector('#scroll-section-2 .b .pin'),
				pinC: document.querySelector('#scroll-section-2 .c .pin'),
            },
            values : {
                //in
                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
				messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                pinB_scaleY: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0, 1, { start: 0.72, end: 0.77 }],
                //out
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            },

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
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
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
                // console.log(currentScene);
                //A
                if(scrollRatio <= 0.22){
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`; 
                }else{
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }                
                //B
                if(scrollRatio <= 0.42){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_in,currentYOffset)}%)`;
                }else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_out,currentYOffset)}%)`;
                }
                //C
                if(scrollRatio <= 0.62){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_in,currentYOffset)}%)`;
                }else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_out,currentYOffset)}%)`;
                }
                //D
                if(scrollRatio <= 0.82){
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_in,currentYOffset)}%)`;
                }else{
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_out,currentYOffset)}%)`;
                }

                break;
            case 1:
                // console.log(currentScene);

                break;

            case 2:

                if(scrollRatio <= 0.25){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;

                }else{
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }

                if(scrollRatio <= 0.57){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_in,currentYOffset)}%)`;
                    objs.pinB.style.opacity = calcValues(values.pinB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
                }else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_out,currentYOffset)}%)`;
                }

                if(scrollRatio <= 0.83){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_in,currentYOffset)}%)`;
                    objs.pinC.style.opacity = calcValues(values.pinC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`
                }else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_out,currentYOffset)}%)`;
                    objs.pinC.style.opacity = calcValues(values.pinC_opacity_out, currentYOffset);
                }
            break;
            case 3 :

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
