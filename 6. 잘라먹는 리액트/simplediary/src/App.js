import {useRef ,useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author : "이정환",
//     content : "하이1",
//     emotion : 5,
//     created_date : new Date().getTime()
//   },
//   {
//     id:2,
//     author : "ㅎ호홍",
//     content : "하이2",
//     emotion : 2,
//     created_date : new Date().getTime()
//   },
//   {
//     id:3,
//     author : "아무개",
//     content : "하이3",
//     emotion : 1,
//     created_date : new Date().getTime()
//   },
// ]

function App() {

  const [data, setData] =useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion)=>{
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current,
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  return (
    <div className="App">
      <DiaryEditor onCreate = {onCreate}/>
      <DiaryList diaryList = {data}/>
    </div>
  );
}

export default App;
