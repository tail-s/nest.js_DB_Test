import { useEffect } from "react";
import { jwtState } from '../states/jwtState';
import { useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios';
import { boardState } from "../states/boardState";
import BoardComp from "../components/boardComp";

export default function Board() {

    const token = useRecoilValue(jwtState);
    const [ boards, setBoards ] = useRecoilState(boardState);

    const loading = async () => {
        setBoards([]);
        await axios.get(`http://localhost:4000/boards`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setBoards(res.data);
        });
    }

    useEffect(() => {
        loading();
    }, []);

    return (
        <div>
            <h1>Board</h1>
            <p>게시판 목록</p>
            <div>
                {boards.map((data) => (
                    <BoardComp key={data.id} data={data} />
                ))}
            </div>
        </div>
    );
}