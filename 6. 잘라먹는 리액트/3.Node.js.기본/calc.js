//계산 기능을 하는 파일

const add = (a,b) => a +b;
const sub = (a,b)=> a-b;

module.exports = {
    mouduleName : "calc module",
    add : add,
    sub : sub
}
//계산 모듈 객체

//js파일을 기능별로 구별하고 각각의 기능을 다른 파일에 불러오는 방법
//Node.js에서 기본적으로 제공되는 모듈 시스템 => common system
//module.exports은 module을 만들고 파일밖으로 내보낸다.
// require(경로)를 통해 다른 파일에 불러오는 기능을 가진다.
//module.exports, require은 Node.js에서만 제공되기 때문에 바닐라js에서는 사용하기 어렵다.
