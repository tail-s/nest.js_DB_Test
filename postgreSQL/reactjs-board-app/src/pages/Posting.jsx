import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtState } from '../states/jwtState';
import { useRecoilValue } from 'recoil';

export default function Posting() {

    const navigate = useNavigate();
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const token = useRecoilValue(jwtState);

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onDescriptionHandler = (event) =>{
        setDescription(event.currentTarget.value);
    }

    const posting = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:4000/boards`, {
            title: title,
            description: description,
        },{
            headers: { Authorization: `Bearer ${token}`},
        }).then(() => {
            navigate('/board');
        })
    }

    const list = (event) => {
        navigate('/board');
    }

    return (
        <div>
            <h1>게시글 작성</h1>
            제목 : <input type="text" onChange={onTitleHandler}></input>
            내용 : <input type="text" onChange={onDescriptionHandler}></input>
            <button type="button" onClick={posting}>작성</button>
            <button type="button" onClick={list}>목록</button>
        </div>
    );
}