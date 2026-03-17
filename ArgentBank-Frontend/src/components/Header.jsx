// Header.jsx
import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png"; 
import "./Header.css";

export default function Header() {
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

      {/* Zone de droite : version user.html → User + Sign Out */}
      <div>
        <Link className="main-nav-item" to="/user">
          <i className="fa fa-user-circle"></i> Tony{" "}
        </Link>

        <Link className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i> Sign Out
        </Link>
      </div>
    </nav>
  );
}
