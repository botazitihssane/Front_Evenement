import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUserModal = ({ onClose, onAdd, showAddModal }) => {
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    username: "",
    email: "",
    roleName: "",
    telephone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(newUser);

    fetch("http://localhost:8080/gestion_events/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          onAdd();
          onClose();
        } else {
          console.error("Error adding user:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: showAddModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add User</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="addNom" className="form-label">
                  Nom:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addNom"
                  name="nom"
                  value={newUser.nom}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addPrenom" className="form-label">
                  Prenom:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addPrenom"
                  name="prenom"
                  value={newUser.prenom}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addUsername" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addUsername"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addEmail" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="addEmail"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addRole" className="form-label">
                  Role:
                </label>
                <select
                  id="addRole"
                  className="form-select"
                  name="roleName"
                  value={newUser.roleName}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="etudiant">Étudiant</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="addTelephone" className="form-label">
                  Telephone:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="addTelephone"
                  name="telephone"
                  value={newUser.telephone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addPassword" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="addPassword"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Add User
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
