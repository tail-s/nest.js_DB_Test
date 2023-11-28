import axios from 'axios';
import { jwtState } from '../states/jwtState';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardState } from "../states/boardState";

export default function BoardComp({ data }) {

    const token = useRecoilValue(jwtState);
    const setBoards = useSetRecoilState(boardState);

    const del = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:4000/boards/${data.id}`, {
            headers: { Authorization: `Bearer ${token}`}
        }).then(() => {
            console.log(`게시물 ID - ${data.id} 삭제 완료`);
            axios.get(`http://localhost:4000/boards`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                setBoards(res.data);
            })
        }).catch((error) => {
            console.log("삭제 권한이 없습니다.");
        })
    }

    return (
        <div>
            <div>제목 : {data.title}</div>
            <div>작성자 : {data.writer}</div>
            <div>내용 : {data.description}</div>
            <button type="button" onClick={del}>삭제하기</button>
        </div>
    );
}