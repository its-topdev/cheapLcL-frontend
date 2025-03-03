import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import WindowSizeContext from "./contexts/WindowSizeContext";
import { userRoles } from "./constants/userRoles";
import Auth from "./components/Auth";
import Home from "./components/_pages/Home";
import Login from "./components/_pages/Login";
import ForgotPassword from "./components/_pages/Login/ForgotPassword";
import ResetPassword from "./components/_pages/Login/ResetPassword";
import Registration from "./components/_pages/Registration";
import Verification from "./components/_pages/Registration/Verification";
import BookConfirmation from "./components/_pages/BookConfirmation";
import Management from "./components/Management";
import NotFound from "./components/_pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [currentUser, setCurrentUser] = useState(user);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <WindowSizeContext.Provider value={{ windowHeight }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route
                element={
                  <Auth allowedRoles={[userRoles.ADMIN, userRoles.USER]} />
                }
              >
                <Route path="/" element={<Home />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/verification" element={<Verification />} />
              <Route
                element={
                  <Auth allowedRoles={[userRoles.ADMIN, userRoles.USER]} />
                }
              >
                <Route
                  path="/book-confirmation"
                  element={<BookConfirmation />}
                />
              </Route>
              <Route element={<Auth allowedRoles={[userRoles.ADMIN]} />}>
                <Route path="/management/*" element={<Management />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </WindowSizeContext.Provider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
