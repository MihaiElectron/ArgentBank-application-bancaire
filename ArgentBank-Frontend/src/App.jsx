// App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./features/userSlice";

// Import des pages
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import User from "./pages/User.jsx";

// Import des composants UI globaux
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  // Si un token existe (localStorage), on recharge le profil automatiquement
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>

      <Footer />
    </>
  );
}
