// App.jsx
// Point central de l'application : déclaration des routes principales.
// React Router v7 utilise <Routes> et <Route> pour définir les chemins.
// Chaque route pointe vers un composant de page (Home, SignIn, User).

import { Routes, Route } from "react-router-dom";

// Import des pages
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import User from "./pages/User.jsx";

// Import des composants UI globaux
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      {/* Header affiché sur toutes les pages */}
      <Header />

      {/* 
        Routes = conteneur des différentes routes de l'application.
        Route = correspondance entre une URL et un composant React.
      */}
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Page de connexion */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Tableau de bord utilisateur */}
        <Route path="/user" element={<User />} />
      </Routes>

      {/* Footer affiché sur toutes les pages */}
      <Footer />
    </>
  );
}
