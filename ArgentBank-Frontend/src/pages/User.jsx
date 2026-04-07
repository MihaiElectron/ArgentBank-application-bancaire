// User.jsx
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateUserProfile, validateToken } from "../features/userSlice";
import "./User.css";

export default function User() {
  const dispatch = useDispatch();

  /* ------------------------------------------
     RÉCUPÉRATION DES DONNÉES USER DEPUIS REDUX
  ------------------------------------------- */
  const { isLoggedIn, firstName, lastName, userName, token } = useSelector(
    (state) => state.user
  );

  /* ------------------------------------------
     HOOKS LOCAUX (AVANT TOUT RETURN CONDITIONNEL)
  ------------------------------------------- */
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(userName || "");

  /* ------------------------------------------
     VALIDATION AUTOMATIQUE DU TOKEN AU MONTAGE
     → Si token invalide → Redux met isLoggedIn = false
     → PrivateRoute ou Navigate redirige automatiquement
  ------------------------------------------- */
  useEffect(() => {
    if (token) {
      dispatch(validateToken(token));
    }
  }, [token, dispatch]);

  /* ------------------------------------------
     PROTECTION DE LA ROUTE
     (Sécurité supplémentaire côté front)
  ------------------------------------------- */
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  /* ------------------------------------------
     SAUVEGARDE DU NOUVEAU USERNAME
  ------------------------------------------- */
  const handleSave = async () => {
    await dispatch(updateUserProfile({ token, userName: newUserName }));
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {userName} !
        </h1>

        {!isEditing && (
          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Name
          </button>
        )}
      </div>

      {/* ------------------------------------------
          FORMULAIRE D'ÉDITION DU USERNAME
      ------------------------------------------- */}
      {isEditing && (
        <div className="edit-user-card">
          <h2 className="edit-title">Edit user info</h2>

          <div className="edit-field">
            <label htmlFor="username">User name</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>

          <div className="edit-field">
            <label htmlFor="firstname">First name</label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="given-name"
              value={firstName}
              disabled
            />
          </div>

          <div className="edit-field">
            <label htmlFor="lastname">Last name</label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              value={lastName}
              disabled
            />
          </div>

          <div className="edit-buttons-row">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------
          COMPTES BANCAIRES (CONTENU STATIQUE)
      ------------------------------------------- */}
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
