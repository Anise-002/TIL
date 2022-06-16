import React,{useState} from 'react'
import OddEvenResult from './OddEvenResult';

const Counter = ({initialValue}) =>{
    //0에서 출발
    //1씩 증가하고
    //1씩 감소하는
    //count 상태
    const [count, setCount] = useState(initialValue);

    const onIncrease = ()=>{
        setCount(count + 1);
    }

    const onDecrease = ()=>{
        setCount(count -1);
    }


    const [count2, setCount2] = useState(0);
    const onIncrease2 = ()=>{
        setCount2(count2 + 1);
    }

    const onDecrease2 = ()=>{
        setCount2(count2 -1);
    }
    return (
        <div>
            <h2>{count}</h2>
            <button onClick = {onIncrease}>+</button>
            <button onClick = {onDecrease}>-</button>
            <OddEvenResult count = {count}/>

            <h2>{count2}</h2>
            <button onClick = {onIncrease2}>+</button>
            <button onClick = {onDecrease2}>-</button>
        </div>
    )
};

Counter.defaultProps = {
    initialValue : 0,
};
//전달받기 못하 props의 기본값을 지정할 수 있다.

export default Counter;

//컴퍼넌트는 자신이 가진 State가 변화하면 화면을 다시 그려 리랜더를 한다
//즉, 함수가 다시 호출된다.
// 그래서 실시간으로 결과값을 받을 수 있게 된다.
// 하나의 컴포넌트에 여러개를 가질 수 있다.

//State는 짧은 코드와 유연한 문법으로  화면에 나타나는 데이터를 쉽게 교체하고 업데이트를 도와준다.
