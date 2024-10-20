import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" exact element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
