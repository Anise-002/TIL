// import './App.css';

import MyHeader from './myHeader';
import MyFooter from './MyFooter';

function App() {
  const style = {
    App :{
      backgroundColor : "black",
    },
    h2 :{
      color : "red"
    },
    bold_text:{
      color : 'green'
    }
  }

  const func = () =>{
    return "func";
  }
  //{}안에는 문자열,숫자, 또는 연산, 함수 호출도 가능하다.
  // 다만 결과값이 문자열, 숫자가 아닌 것들은 나타나지 않는다.

  const number = 5;

  return ( //JSX문법
    <div className="App" style={style.App}>
      <MyHeader/>
        <h2 style={style.h2}>안녕 리액트 {func()}</h2>
        <b style={style.bold_text} id="bold_text">
          React.js<br/>
          {number}는 : {number % 2 === 0 ? '짝수' : '홀수'}
        </b>

      <MyFooter/>
    </div>
  );
}

export default App;

//조건부 랜더링
//조건에 따라 각각 다른 것을 랜더링 하는 것
//{number}는 : {number % 2 === 0 ? '짝수' : '홀수'}
