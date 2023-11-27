export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <p>로그인 화면 : </p>
            <input
                type="text"
                id="id"
                placeholder="아이디를 입력해주세요."
            />
            <input
                type="text"
                id="pw"
                placeholder="비밀번호를 입력해주세요."
            />
        </div>
    );
}