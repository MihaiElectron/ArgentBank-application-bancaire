// User.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "./User.css";

export default function User() {
  // On récupère les infos du user depuis Redux
  const { isLoggedIn, firstName, lastName } = useSelector((state) => state.user);

  // Protection de la route : si pas connecté → redirection
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {firstName} {lastName}!
        </h1>

        {/* Bouton Edit Name (fonctionnel à l'étape 3) */}
        <button className="edit-button">Edit Name</button>
      </div>

      {/* Les comptes bancaires (HTML fourni par OC) */}
      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
