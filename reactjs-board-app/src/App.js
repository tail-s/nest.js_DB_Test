import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Auth from "./pages/Auth.jsx";
import Board from "./pages/Board.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
}

export default App;
