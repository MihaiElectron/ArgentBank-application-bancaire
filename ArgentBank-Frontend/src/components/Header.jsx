// Header.jsx
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

import argentBankLogo from "../assets/argentBankLogo.png";
import "./Header.css";

export default function Header() {
  const dispatch = useDispatch();

  // On récupère l'état utilisateur depuis Redux
  const { isLoggedIn, userName } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      {/* Logo + lien vers la page d'accueil */}
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {/* Zone de droite : dynamique selon l'état logué */}
      <div>
        {!isLoggedIn ? (
          // Si NON connecté → bouton Sign In
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        ) : (
          // Si connecté → prénom + Sign Out
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i> {userName}
            </Link>

            <Link className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
