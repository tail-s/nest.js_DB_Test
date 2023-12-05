import { useEffect } from "react";
import { jwtState } from '../states/jwtState';
import { useRecoilState } from "recoil";
import axios from 'axios';
import { boardState } from "../states/boardState";
import BoardComp from "../components/boardComp";
import { useNavigate } from 'react-router-dom';
import './Board.css';

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
        const fetchData = async() => {
            await loading();
        }
        fetchData();
    }, [token]);

    return (
        <div className="board-container">
            <div className="header">
                <h1>Wooam 게시판</h1>
                <div className="buttons">
                    <button type="button" className="logout-btn" onClick={logout}>로그아웃</button>
                    <button type="button" className="post-btn" onClick={posting}>작성하기</button>
                </div>
            </div>
            <p className="board-list-title">게시글</p>
            <div className="board-list">
                {boards.map((data) => (
                    <BoardComp key={data._id} data={data} />
                ))}
            </div>
        </div>
    );
}