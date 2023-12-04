import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtState } from '../states/jwtState';
import { useRecoilValue } from 'recoil';
import './Posting.css';

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
        <div className="posting-container">
            <h1 className="posting-title">게시글 {data ? '수정' : '작성'}</h1>
            <div className="form-group">
                <label>제목:</label>
                <input className="input-field" type="text" value={title} onChange={onTitleHandler} />
            </div>
            <div className="form-group">
                <label>내용:</label>
                <input className="input-field" type="text" value={description} onChange={onDescriptionHandler} />
            </div>
            {!data && (
                <div className="form-group">
                    <label>파일 첨부:</label>
                    <input className="input-field" type="file" onChange={onFileChange} />
                </div>
            )}
            <div className="buttons">
                <button className="primary-btn" type="button" onClick={data ? modifying : posting}>{data ? '수정' : '작성'}</button>
                <button className="secondary-btn" type="button" onClick={list}>목록</button>
            </div>
        </div>
    );
}