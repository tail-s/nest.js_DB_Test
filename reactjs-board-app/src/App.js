import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Auth from "./pages/Auth.jsx";
import Board from "./pages/Board.jsx";
import { RecoilRoot } from "recoil";


function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
