// Header.jsx
// Composant d'en-tête du site ArgentBank.
// Contient le logo + navigation (Sign In / User / Logout).
// Le HTML/CSS final sera intégré depuis ArgentBank-Frontend-Ref/index.html.
// Ce composant sera affiché sur toutes les pages via App.jsx.

import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png"; 
// NOTE : place l'image dans src/assets/ (optimisation + cohérence Vite)

export default function Header() {
  return (
    <header>
      {/* Logo + lien vers la page d'accueil */}
      <Link to="/" className="main-nav-logo">
        <img
          src={argentBankLogo}
          alt="Argent Bank Logo"
          className="main-nav-logo-image"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      {/* Navigation principale */}
      <nav className="main-nav">
        <ul>
          {/* TODO : afficher le nom de l'utilisateur si connecté (Redux) */}
          <li>
            <Link to="/sign-in" className="main-nav-item">
              Sign In
            </Link>
          </li>

          {/* TODO : si utilisateur connecté → afficher bouton Logout */}
        </ul>
      </nav>
    </header>
  );
}
