// Header.jsx
// Reproduction fidèle du header HTML fourni dans ArgentBank-Frontend-Ref.
// Contient : logo, lien vers la home, lien Sign In avec icône FontAwesome.
// Le CSS utilisé est celui de main.css (déjà présent dans le dossier de référence).

import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png"; 
// IMPORTANT : l'image doit être copiée depuis ArgentBank-Frontend-Ref/img vers src/assets/

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

      {/* Zone de droite : Sign In (ou User + Logout plus tard via Redux) */}
      <div>
        <Link className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
}
