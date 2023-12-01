import axios from 'axios';
import { jwtState } from '../states/jwtState';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardState } from "../states/boardState";
import { useNavigate } from 'react-router-dom';

export default function BoardComp({ data }) {

    const token = useRecoilValue(jwtState);
    const setBoards = useSetRecoilState(boardState);
    const filePath = data.attachment ? data.attachment.replace(/\\/g, '/') : null;

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
        <div>
            <div>제목 : {data.title}</div>
            <div>작성자 : {data.writer}</div>
            <div>내용 : {data.description}</div>
            {data.attachment && (
                <a href={`http://localhost:4000/${filePath}`}>첨부파일 다운로드</a>
            )}
            <button type="button" onClick={mod}>수정하기</button>
            <button type="button" onClick={del}>삭제하기</button>
        </div>
    );
}