import Header from "./components/Header";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useSocket } from "./store/useSocket";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { userName } = useSocket();

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={
          !userName 
          ? <HomePage /> 
          : <Navigate to="/chat" />
        } />
        <Route path="/chat" element={
          userName 
          ? <ChatPage /> 
          : <Navigate to="/" />
        } />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
