import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/sidebar";
import Rightbar from "./components/rightbar";
import HomePage from "./pages/homePage";
import TweetListProvider from "./store/tweets-store";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EnterPage from "./pages/enterPage";
import LogoutModal from "./components/logout";

function App() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <BrowserRouter>
      <TweetListProvider>
        <Routes>
          <Route exact path="/" element={<EnterPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <>
                <LogoutModal modal={modal} toggleModal={toggleModal} />
                <Sidebar toggleModal={toggleModal} />
                <HomePage />
                <Rightbar />
              </>
            }
          />
        </Routes>
      </TweetListProvider>
    </BrowserRouter>
  );
}

export default App;
