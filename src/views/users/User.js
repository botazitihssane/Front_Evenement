import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateUserModal from "./updateUser";
import AddUserModal from "./addUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadUsers = () => {
    fetch("http://localhost:8080/gestion_events/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role.name === selectedRole);

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setSelectedUser(null);
  };

  const handleUpdate = () => {
    loadUsers();
    handleUpdateClose();
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleAddClose = () => {
    setShowAddModal(false);
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:8080/gestion_events/user/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          loadUsers();
        } else {
          console.error("Error deleting user:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Utilisateurs Page</h1>

      <div className="mb-3">
        <label htmlFor="roleFilter" className="form-label">
          Filter by Role:
        </label>
        <select
          id="roleFilter"
          className="form-select"
          onChange={(e) => handleRoleChange(e.target.value)}
          value={selectedRole}
        >
          <option value="all">All Roles</option>
          <option value="ROLE_ETUDIANT">Étudiant</option>
          <option value="ROLE_MANAGER">Manager</option>
        </select>
      </div>
      <button className="btn btn-success" onClick={handleAddClick}>
        Add User
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Numero</th>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Email</th>
              <th scope="col">Telephone</th>
              <th scope="col">Role</th>
              <th scope="col">Username</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.email}</td>
                <td>{user.telephone}</td>
                <td>
                  {user.role.name === "ROLE_ETUDIANT"
                    ? "Étudiant"
                    : user.role.name === "ROLE_MANAGER"
                    ? "Manager"
                    : " - "}
                </td>
                <td>{user.username}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleUpdateClick(user)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdateModal && (
          <UpdateUserModal
            user={selectedUser}
            onClose={handleUpdateClose}
            onUpdate={handleUpdate}
            showUpdateModal={showUpdateModal}
          />
        )}
        {showAddModal && (
          <AddUserModal
            onClose={handleAddClose}
            onAdd={loadUsers}
            showAddModal={showAddModal}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
