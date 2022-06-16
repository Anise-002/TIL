// import './App.css';

import MyHeader from './myHeader';
import Counter from './Counter';
import Container from './Container';

function App() {
  const countProps = {
    a : 1,
    b : 2,
    c : 3,
    d : 4,
    e : 5,
    // initialValue : 5,
  }

  return(
    <Container>
      <MyHeader/>
      <Counter {...countProps}/>
    </Container>
  )
}

export default App;

//조건부 랜더링
//조건에 따라 각각 다른 것을 랜더링 하는 것
//{number}는 : {number % 2 === 0 ? '짝수' : '홀수'}
