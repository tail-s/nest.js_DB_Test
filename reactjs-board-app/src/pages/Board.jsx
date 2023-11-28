import { useEffect } from "react";
import { jwtState } from '../states/jwtState';
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import { boardState } from "../states/boardState";
import BoardComp from "../components/boardComp";
import { useNavigate } from 'react-router-dom';

export default function Board() {

    const navigate = useNavigate();

    const [ token, setToken ] = useRecoilState(jwtState);
    const [ boards, setBoards ] = useRecoilState(boardState);

    const loading = async () => {
        setBoards([]);
        await axios.get(`http://localhost:4000/boards`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setBoards(res.data);
        });
    }

    const logout = (event) => {
        event.preventDefault();
        setToken("");
        setBoards([]);
        alert("로그아웃 되었습니다!");
        navigate("/");
    }

    const posting = (event) => {
        event.preventDefault();
        navigate("/posting");
    }

    useEffect(() => {
        loading();
    }, []);

    return (
        <div>
            <h1>Board</h1>
            <button type="button" onClick={logout}>로그아웃</button>
            <button type="button" onClick={posting}>작성하기</button>
            <p>게시판 목록</p>
            <div>
                {boards.map((data) => (
                    <BoardComp key={data.id} data={data} />
                ))}
            </div>
        </div>
    );
}