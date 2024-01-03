import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateUserModal = ({ user, onClose, onUpdate, showUpdateModal }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(updatedUser);
    fetch(`http://localhost:8080/gestion_events/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          onClose();
          onUpdate();
        } else {
          console.error("Error updating user:", response.statusText);
        }
      })
      .catch((error) => console.error("Error updating user:", error));
    onUpdate();
  };

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: showUpdateModal ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update User</h5>
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
                <label htmlFor="updateNom" className="form-label">
                  Nom:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updateNom"
                  name="nom"
                  value={updatedUser.nom}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updatePrenom" className="form-label">
                  Prenom:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updatePrenom"
                  name="prenom"
                  value={updatedUser.prenom}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updateUsername" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updateUsername"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updateEmail" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="updateEmail"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updateRole" className="form-label">
                  Role:
                </label>
                <select
                  id="updateRole"
                  className="form-select"
                  name="roleName"
                  value={updatedUser.roleName}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="etudiant">Étudiant</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="updateTelephone" className="form-label">
                  Telephone:
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="updateTelephone"
                  name="telephone"
                  value={updatedUser.telephone}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Update User
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

export default UpdateUserModal;
