// User.jsx
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { updateUserProfile } from "../features/userSlice";
import "./User.css";

export default function User() {
  const dispatch = useDispatch();

  // On récupère les infos du user depuis Redux
  const { isLoggedIn, firstName, lastName, userName, token } = useSelector(
    (state) => state.user
  );

  // Hooks AVANT tout return conditionnel
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(userName || "");

  // Protection de la route
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  const handleSave = async () => {
    await dispatch(updateUserProfile({ token, userName: newUserName }));
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {firstName} {lastName}!
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

      {/* FORMULAIRE ISOLÉ*/}
      {isEditing && (
        <div className="edit-user-card">
          <h2 className="edit-title">Edit user info</h2>

          <div className="edit-field">
            <label htmlFor="username">User name</label>
            <input
              id="username"
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </div>

          <div className="edit-field">
            <label>First name</label>
            <input type="text" value={firstName} disabled />
          </div>

          <div className="edit-field">
            <label>Last name</label>
            <input type="text" value={lastName} disabled />
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

      {/* Comptes bancaires */}
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
