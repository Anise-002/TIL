import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({ onEdit, onRemove, author, content, emotion, created_date, id }) => {

    useEffect(() => { console.log(`${id}ㅂㅓㄴㅉㅐㄹㅐㄴㄷㅓ `) })

    //수정 중인지 아닌지 상태를 불리언 값으로 보내준다.
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);
    const localContentInput = useRef();

    const handleRemove = () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습까?`)) {
            onRemove(id);
        }
    }

    const [localContent, setLocalContent] = useState(content);

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }



    const handleEdit = () => {

        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }

        if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit();
        }
    }

    return (
        <div className='DiaryItem'>
            <div className='info'>
                <span>
                    작성자 : {author} | 감정 점수 : {emotion}
                </span>
                <br />
                <span className="date">{new Date(created_date).toLocaleDateString()}</span>
            </div>
            <div className="content">
                {isEdit ? (
                    <>
                        <textarea
                            ref={localContentInput}
                            value={localContent}
                            onChange={(e) => { setLocalContent(e.target.value) }}
                        />
                    </>
                ) : (
                    <>{content}</>
                )}
            </div>
            {isEdit ? <>
                <button onClick={handleQuitEdit}>수정 취소</button>
                <button onClick={handleEdit} >수정 완료 </button>
            </> : <>
                <button onClick={handleRemove}>삭제하기</button>
                <button onClick={toggleIsEdit}>수정하기 </button>
            </>}
        </div>
    );
}
export default React.memo(DiaryItem);