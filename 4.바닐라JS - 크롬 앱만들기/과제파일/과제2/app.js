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