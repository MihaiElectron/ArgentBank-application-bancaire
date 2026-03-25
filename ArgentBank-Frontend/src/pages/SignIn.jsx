import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, fetchUserProfile } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state pour les inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Récupération du loading + error depuis Redux
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Login → récupère le token
    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      const token = result.payload;

      // 2. Récupération du profil
      await dispatch(fetchUserProfile(token));

      // 3. Redirection vers /user
      navigate("/user");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Affichage de l'erreur si login échoue */}
          {error && <p className="error-message">{error}</p>}

          {/* Le bouton respecte ton design */}
          <button className="sign-in-button" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}
