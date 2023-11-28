import axios from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { jwtState } from '../states/jwtState';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const setToken = useSetRecoilState(jwtState);

    const onUsernameHandler = (event) => {
        setUsername(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const login = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:4000/auth/signin`, {
            username: username,
            password: password
        }).then((res) => {
            setToken(res.data.accessToken);
            // console.log(res.data.accessToken);
            navigate('/board')
        }).catch((error) => {
            console.log(error.response);

            alert(error.response.data.message);
        })
    }

    const signup = (event) => {
        event.preventDefault();
        navigate('/signup');
    }

    return (
        <div>
            <h1>Login</h1>
            <p>로그인 화면</p>
            <form onSubmit={login}>
                <input
                    type="text"
                    placeholder="아이디를 입력해주세요."
                    onChange={onUsernameHandler}
                />
                <input
                    type="text"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={onPasswordHandler}
                />
                <button type="submit">로그인</button>
            </form>
            <form onSubmit={signup}>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}