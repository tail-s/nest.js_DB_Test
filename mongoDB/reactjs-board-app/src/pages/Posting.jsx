import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtState } from '../states/jwtState';
import { useRecoilValue } from 'recoil';

export default function Posting() {

    const location = useLocation();
    const data = location.state?.data;

    const navigate = useNavigate();
    const [ title, setTitle ] = useState(data ? data.title : "");
    const [ description, setDescription ] = useState(data ? data.description : "");
    const [file, setFile] = useState(null);

    const token = useRecoilValue(jwtState);

    const onTitleHandler = (event) => {
        setTitle(event.target.value);
    }

    const onDescriptionHandler = (event) =>{
        setDescription(event.target.value);
    }

    const posting = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        // console.log(formData);

        try {
            await axios.post('http://localhost:4000/boards', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/board');
            } catch (error) {
            console.error(error);
            }
    };

    const modifying = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        try {
            await axios.patch(`http://localhost:4000/boards/${data._id}`, {
                title: title,
                description: description
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate('/board');
        } catch (error) {
            console.error(error);
        }
    };

    const list = (event) => {
        navigate('/board');
    }

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <div>
            <h1>게시글 {data ? '수정' : '작성'}</h1>
            제목 : <input type="text" value={title} onChange={onTitleHandler} />
            설명 : <input type="text" value={description} onChange={onDescriptionHandler} />
            {!data && <>
                파일 첨부: <input type="file" onChange={onFileChange} />
            </>}
            <button type="button" onClick={data ? modifying : posting}>{data ? '수정' : '작성'}</button>
            <button type="button" onClick={list}>목록</button>
        </div>
    );
}