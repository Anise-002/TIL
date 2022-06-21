import React, { useEffect, useState } from 'react';

const UnmountTest = () => {

    useEffect(() => {
        console.log("Mount!");

        return () => {
            //Unmount시점에서 실행되게 된다.
            console.log("Unmount!");
        }
    }, [])

    return (
        <div>Unmount Testing Component</div>
    )
}

const Lifecycle = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);

    return (
        <div style={{ padding: 20 }}>
            <button onClick={toggle}>on/off</button>
            {isVisible && <UnmountTest />}
            { /* 단락 회로 평가를 통해
                isVisible이 false라면 isVisible값이 나오고,
                isVisible이 ture이면 unmountTest의 값이 화면에 출력된다. */}

        </div>
    )
}
export default Lifecycle;

