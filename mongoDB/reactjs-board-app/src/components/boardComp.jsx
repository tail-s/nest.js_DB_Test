import axios from 'axios';
import { jwtState } from '../states/jwtState';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardState } from "../states/boardState";
import { useNavigate } from 'react-router-dom';
import './boardComp.css';

export default function BoardComp({ data }) {

    const token = useRecoilValue(jwtState);
    const setBoards = useSetRecoilState(boardState);
    // const filePath = data.attachment ? data.attachment.replace(/\\/g, '/') : null;
    const download = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:4000/boards/${data._id}/file`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob'  // add this line
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', data.originalFilename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
    }

    const navigate = useNavigate();

    const mod = (event) => {
        event.preventDefault();
        navigate("/posting", { state: { data: data }});
    }

    const del = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:4000/boards/${data._id}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(() => {
            alert("삭제되었습니다.");
            axios.get(`http://localhost:4000/boards`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                setBoards(res.data);
            })
        }).catch((error) => {
            alert("삭제 권한이 없습니다.");
        })
    }

    return (
        <div className="board-item">
            <div className="title">제목 : {data.title}</div>
            <div className="writer">작성자 : {data.writer}</div>
            <div className="description">내용 : {data.description}</div>
            {data.attachment && (
                <div className="download" onClick={download}>{data.originalFilename}</div>
            )}
            <div className="buttons">
                <button type="button" className="mod-btn" onClick={mod}>수정하기</button>
                <button type="button" className="del-btn" onClick={del}>삭제하기</button>
            </div>
        </div>
    );
}