import React, { useEffect, useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {

    useEffect(() => {
        console.log("DiaryEditor ㄹㅔㄴㄷㅓ");
    })

    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: "1",
    });


    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        if (state.author.length < 1) {
            //focus
            authorInput.current.focus();
            //useRef는 current메서드를 이용해 사용할 수 있다.
            return;
        }

        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }

        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공!");
        //저장 후 초기화해서 아무것도 안 남게
        setState({
            author: "",
            content: "",
            emotion: "1",
        })
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref={authorInput}
                    name="author"
                    value={state.author}
                    onChange={handleChange}
                />
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    name="content"
                    value={state.content}
                    onChange={handleChange} />

            </div>
            <div>
                <span>오늘의 감정점수 : </span>
                <select
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChange}
                >
                    <option vlaue={1}>1</option>
                    <option vlaue={2}>2</option>
                    <option vlaue={3}>3</option>
                    <option vlaue={4}>4</option>
                    <option vlaue={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    )
}
export default React.memo(DiaryEditor);