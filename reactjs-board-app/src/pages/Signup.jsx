import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate = useNavigate();
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    
    const onUsernameHandler = (event) => {
        setUsername(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const signup = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:4000/auth/signup`, {
            username: username,
            password: password
        }).then(() => {
            alert("회원가입이 완료되었습니다.");
            navigate('/');
        }).catch((error) => {
            console.log(error.response);
            alert(error.response.data.message);
        })
    }

    return (
        <div>
            <h1>회원가입 화면</h1>
            <form onSubmit={signup}>
                <input 
                    type="text"
                    placeholder="사용할 아이디를 입력해주세요."
                    onChange={onUsernameHandler}
                />
                <input 
                    type="text"
                    placeholder="사용할 비밀번호를 입력해주세요."
                    onChange={onPasswordHandler}
                />
                <button type="submit">가입하기</button>
            </form>
        </div>
    );
}