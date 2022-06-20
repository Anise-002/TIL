import {useState} from "react";

const DiaryEditor = ()=>{

    const [state , setState] = useState({
        author : "",
        content : "",
        emotion : "1",
    });


    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]  : e.target.value,
        })
    }

    const handleSubmit = ()=>{
        console.log(state);
        alert("저장 성공!");
    }

    return(
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
            name = "author"
            value = {state.author}
            onChange = {handleChange}
            />
        </div>
        <div>
            <textarea 
            name = "content"
            value = {state.content}
            onChange = {handleChange}/>

        </div>
        <div>
            <span>오늘의 감정점수 : </span>
            <select 
            name = "emotion"
            value = {state.emotion}
            onChange = {handleChange}
            >
                <option vlaue ={1}>1</option>
                <option vlaue ={2}>2</option>
                <option vlaue ={3}>3</option>
                <option vlaue ={4}>4</option>
                <option vlaue ={5}>5</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>
    )
}
export default DiaryEditor;