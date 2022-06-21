const DiaryItem= ({onDelet, author, content, emotion, created_date, id})=>{
    return(
    <div className = 'DiaryItem'>
        <div className = 'info'>
            <span>
                작성자 : {author} | 감정 점수 : {emotion}
            </span>
            <br/>
            <span className="date">{new Date(created_date).toLocaleDateString()}</span>
        </div>
        <div className = "content">{content}</div>
        <button onClick={
            ()=>{
                console.log(id);
                if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습까?`)){
                    onDelet(id);
                }
            }
            }>삭제하기</button>
    </div>
   );
}
export default DiaryItem;