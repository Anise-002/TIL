(()=>{

    let yOffset = 0;    //window.pageYOffset 대신 쓸 수 있는 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
    let currentScene = 0; //(인덱스)/현재 활성화된 (눈 앞에 보고 있는 씬) scroll-section
    let enterNewScene;  //새로운 section이 시작된 순간 true;
    let acc = 0.1;
    let delayedYOffset = 0;
    let rafId;
    let rafState;
    console.log(window.innerHeight);


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
                canvas : document.querySelector('#video-canvas-0'),
                context :  document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages : []
            },//html 요소들을 넣는 객체
            values : {
                //canvas
                videoImageCount : 300,
                imgaeSequence : [0, 299],
                canvas_opacity : [1, 0, {start : 0.9, end : 1}],
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
            // heightNum : 5, //normal에서는 필요 없음
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
                canvas : document.querySelector("#video-canvas-1"),
                context : document.querySelector("#video-canvas-1").getContext('2d'),
                videoImages : []
            },
            values : {
                //cavas
                videoImageCount : 960,
                imgaeSequence : [0, 959],
                canvas_opacity_in : [0, 1, { start : 0, end : 0.05}],
                canvas_opacity_out : [1, 0, { start : 0.95, end : 1}],
                //in
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.59, end: 0.62 }],
				messageC_translateY_in: [30, 0, { start: 0.8, end: 0.9 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.59, end: 0.62 }],
				messageC_opacity_in: [0, 1, { start: 0.8, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.69, end: 0.77 }],
				messageC_translateY_out: [0, -20, { start: 0.95, end: 0.97 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.75, end: 0.77 }],
				messageC_opacity_out: [1, 0, { start: 0.95, end: 0.97 }],
				pinB_scaleY: [0, 1, { start: 0.59, end: 0.62 }],
				pinC_scaleY: [0, 1, { start: 0.85, end: 0.9 }],
				pinB_opacity_in: [0, 1, { start: 0.59, end: 0.62 }],
				pinC_opacity_in: [0, 1, { start: 0.85, end: 0.9 }],
				pinB_opacity_out: [1, 0, {start: 0.69, end: 0.77}],
				pinC_opacity_out: [1, 0, { start: 0.95, end: 0.97 }]
            },

        },
        {
            //scroll-section-3
            type : 'sticky',
            heightNum : 5, 
            scrollHeight: 0,
            objs : {
                container : document.querySelector('#scroll-section-3'),
                canvasCaption : document.querySelector('.canvas-caption'),
                canvas : document.querySelector('.image-blend-canvas'),
                context : document.querySelector('.image-blend-canvas').getContext('2d'),
                imagesPath : [
                    `./images/blend-image-1.jpg`,
                    `./images/blend-image-2.jpg`
                ],
                images : []
            },
            values:{
                //미리 정할수 없어 0으로 자리만 만들어놓았다.
                rect1X : [0, 0, {start : 0, end : 0}],
                rect2X : [0, 0, {start : 0, end : 0}],
                rectStartY : 0,
                blendHeight : [0, 0, {start: 0, end:0}],
                canvas_scale : [0, 0, {start: 0, end:0}],
                canvasCaption_opacity : [0, 1, {start: 0, end : 0}],
                canvasCaption_translateY : [35, 0, {start: 0, end : 0}],
            }

        }
    ];
    

    function setCanvasImage(){
        let imgElem;
        for(let i = 0; i < sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image(); //이미지를 생성한다.
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);            
        }

        let imgElem2;
        for(let i = 0; i < sceneInfo[2].values.videoImageCount; i++){
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        let imgElem3;
        for(let i = 0; i <sceneInfo[3].objs.imagesPath.length; i++ ){
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }

    }

    //메뉴바
    function checkMenu(){
        if(yOffset > 44){
            document.body.classList.add('local-nav-sticky');
        }else{
            document.body.classList.remove('local-nav-sticky');
        }
    }

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


        //캔버스
        const heightRatio = window.innerHeight / 1080;
        console.log(window.innerHeight);
        console.log(heightRatio);
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform =  `translate3d(-50%, -50%, 0) scale(${heightRatio})`;

    }



    //currentYOffset : 현재 얼마나 스클로이 되었는지 (각 섹션에서)
    function calcValues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        const valuesDistance = values[1] - values[0];
        
        if(values.length === 3){
            //start~end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ){
                rv = (currentYOffset-partScrollStart) / partScrollHeight * valuesDistance + values[0];
            }else if(currentYOffset < partScrollStart ){
                rv = values[0];
            }else if(currentYOffset > partScrollEnd ){
                rv = values[1];
            }
        }else{
            rv = scrollRatio * valuesDistance + values[0];
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
                // let sequence = Math.round(calcValues(values.imgaeSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity,currentYOffset);
                
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
                if(scrollRatio <= 0.81){
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_in,currentYOffset)}%)`;
                }else{
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translateY(${calcValues(values.messageD_translateY_out,currentYOffset)}%)`;
                }

                break;
            case 2:
                // let sequence2 = Math.round(calcValues(values.imgaeSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
                
                if(scrollRatio <= 0.5){
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in,currentYOffset);
                }else{
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out,currentYOffset);
                }

                if(scrollRatio <= 0.25){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;

                }else{
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;
                }

                if(scrollRatio <= 0.65){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_in,currentYOffset)}%)`;
                    objs.pinB.style.opacity = calcValues(values.pinB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`
                }else{
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translateY(${calcValues(values.messageB_translateY_out,currentYOffset)}%)`;
                }

                if(scrollRatio <= 0.93){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_in,currentYOffset)}%)`;
                    objs.pinC.style.opacity = calcValues(values.pinC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`
                }else{
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translateY(${calcValues(values.messageC_translateY_out,currentYOffset)}%)`;
                    objs.pinC.style.opacity = calcValues(values.pinC_opacity_out, currentYOffset);
                }

                //currentScence 3에서 쓰는 캔버스를 미리 그려주기 시작
                if(scrollRatio > 0.9 ){
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    // 가로/세로 모두 꽉차게 하기 위해 여기서 세팅(계산필요)
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;

                    if(widthRatio <= heightRatio){
                        //캔버스보다 브라우저 창이 홀쭉한 경우
                        canvasScaleRatio = heightRatio;

                    }else{
                        //캔버스보다 브라우저 창이 납작한 경우
                        canvasScaleRatio = widthRatio;
                    }

                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.fillStyle = 'white';
                    objs.context.drawImage(objs.images[0], 0, 0);

                    //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                    const recalculatedInnerWidth = window.innerWidth/canvasScaleRatio;
                    const recalculatedInnerHeight = window.innerHeight/canvasScaleRatio;

                    const whiteRectWidth = recalculatedInnerWidth * 0.15;
                    values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth;
                    
                    objs.context.fillRect(parseInt(values.rect1X[0]),0, parseInt(whiteRectWidth),objs.canvas.height);
                    objs.context.fillRect( parseInt(values.rect2X[0]), 0, parseInt(whiteRectWidth),objs.canvas.height);
                }

            break;
            case 3 :
                // 가로/세로 모두 꽉차게 하기 위해 여기서 세팅(계산필요)
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if(widthRatio <= heightRatio){
                    //캔버스보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = heightRatio;

                }else{
                    //캔버스보다 브라우저 창이 납작한 경우
                    canvasScaleRatio = widthRatio;
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.images[0], 0, 0);

                //캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                const recalculatedInnerWidth = window.innerWidth/canvasScaleRatio;  //원래 캔버스 기준의 px로 innerWidht값을 구한다.
                const recalculatedInnerHeight = window.innerHeight/canvasScaleRatio;

                if(!values.rectStartY){
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                    values.rectStartY = objs.canvas.offsetTop +( objs.canvas.height - objs.canvas.height*canvasScaleRatio) / 2;
                    //transform: scale을 한 요소는 transform을 적용하기 전의 offsetTop값을 가져와서  계산을 한 것이다.
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;

                }
                
                const whiteRectWidth = recalculatedInnerWidth * 0.15;
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                //좌우 흰색 박스 그리기
                // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                
            objs.context.fillRect(
                    parseInt(calcValues(values.rect1X, currentYOffset)),
                    0, 
                    parseInt(whiteRectWidth),
                    objs.canvas.height
                )
                objs.context.fillRect(
                    parseInt(calcValues(values.rect2X, currentYOffset)),
                    0, 
                    parseInt(whiteRectWidth),
                    objs.canvas.height
                )

                if(scrollRatio < values.rect1X[2].end){
                    console.log('닿기전');
                    objs.canvas.classList.remove('sticky');

                }else{
                    // console.log('닿기후');
                    //이미지 블랜드
                    // imageBlendY : [0, 0, {start: 0, end:0}]
                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rect1X[2].end;
                    values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
                    const blendHeight = calcValues(values.blendHeight,currentYOffset);

                    // objs.context.drawImage(img, x, y, width,  height);
                    objs.context.drawImage(objs.images[1],
                        0, objs.canvas.height-blendHeight, objs.canvas.width, objs.canvas.height,
                        0, objs.canvas.height-blendHeight, objs.canvas.width, objs.canvas.height,
                    );

                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.marginTop = `0px`;
                    objs.canvas.style.top = `-${( objs.canvas.height - objs.canvas.height*canvasScaleRatio) / 2}px`;

                    if(scrollRatio > values.blendHeight[2].end){
                        values.canvas_scale[0] = canvasScaleRatio;
                        values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);
                        values.canvas_scale[2].start = values.blendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                    }

                    if(scrollRatio > values.canvas_scale[2].end && 0 < values.canvas_scale[2].end){
                        objs.canvas.classList.remove('sticky');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;
                        
                        values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                        values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                        values.canvasCaption_translateY[2].start = values.canvas_scale[2].end;
                        values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].start + 0.1;
                        objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                        objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;

                    }

                }
            break;
        }
    }

    function scrollLoop(){
        prevScrollHeight = 0;
        enterNewScene = false;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);

        }
        if(delayedYOffset < prevScrollHeight){
            if(currentScene === -1) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if(enterNewScene === true) return;
        playAnimation();
       
    }

    function loop() {
        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

       if(!enterNewScene){
           
            if(currentScene === 0 || currentScene === 2){
                const currentYOffset = delayedYOffset - prevScrollHeight;
                const objs =  sceneInfo[currentScene].objs;
                const values = sceneInfo[currentScene].values;
                let sequence = Math.round(calcValues(values.imgaeSequence, currentYOffset));
                if(objs.videoImages[sequence]){
                    objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                }
            }
       }
        
        

        rafId = requestAnimationFrame(loop);
        console.log('루프');

        if (Math.abs(yOffset - delayedYOffset) < 1) {
            cancelAnimationFrame(rafId);
            rafState = false;
        }
    }

    setCanvasImage();
    window.addEventListener('scroll',()=>{
        //스크롤 함수를 이용해서 여러개의 함수를 이용하기 위해서 익면 함수를 사용했다.
        yOffset = window.pageYOffset;
        scrollLoop();   //스크롤 하면 기본적으로 실행되는 함수
        checkMenu();

        if (!rafState) {
            rafId = requestAnimationFrame(loop);
            rafState = true;
        }

    });   
    window.addEventListener('load',()=>{
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
        setLayout();
    }); 
    window.addEventListener('resize',()=>{
        if(window.innerWidth > 900){
            setLayout();
        }
        sceneInfo[3].values.rectStartY = 0;
    });
    window.addEventListener('orientationchange', setLayout);
 
    
    
})();
