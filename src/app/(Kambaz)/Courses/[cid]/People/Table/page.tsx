"use client";
import { Table, Button, FormControl, Modal } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../../../client";
import * as userClient from "../../../../Account/client";
import type { User } from "../../../../Account/reducer";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector((state: { accountReducer: { currentUser: User | null } }) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
    section: "",
    loginId: "",
  });

  const fetchUsers = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    try {
      const courseUsers = await client.findUsersForCourse(cid);
      console.log("Fetched users for course:", cid, courseUsers);
      setUsers(courseUsers || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Refresh when window gains focus (user might have enrolled from another tab)
  useEffect(() => {
    const handleFocus = () => {
      fetchUsers();
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchUsers]);

  // Refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchUsers();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await userClient.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  const handleCreateUser = async () => {
    if (!cid || Array.isArray(cid)) return;
    try {
      const createdUser = await userClient.createUser(newUser);
      // Enroll the new user in the current course
      await client.enrollUserInCourseByFaculty(cid, createdUser._id);
      
      // Refresh users list after enrollment
      await fetchUsers();
      
      setShowCreateModal(false);
      setNewUser({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "STUDENT",
        section: "",
        loginId: "",
      });
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const updatedUser = await userClient.updateUser(editingUser);
      setUsers(users.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
      setShowEditModal(false);
      setEditingUser(null);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleEditClick = (user: any) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

 return (
  <div id="wd-people-table">
      {currentUser?.role === "FACULTY" && (
        <div className="mb-3">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Create User
          </Button>
        </div>
      )}

   <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {currentUser?.role === "FACULTY" && <th>Actions</th>}
          </tr>
    </thead>
    <tbody>
          {users.map((user: any) => (
      <tr key={user._id}>
        <td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
          <span className="wd-last-name">{user.lastName}</span>
        </td>
              <td className="wd-login-id">{user.loginId || user.username}</td>
              <td className="wd-section">{user.section || "N/A"}</td>
        <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity || "N/A"}</td>
              <td className="wd-total-activity">{user.totalActivity || "N/A"}</td>
              {currentUser?.role === "FACULTY" && (
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              )}
      </tr>
    ))}
</tbody>
   </Table>

      {/* Create User Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            className="mb-2"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <FormControl
            className="mb-2"
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
          />
          <FormControl
            className="mb-2"
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Login ID"
            value={newUser.loginId}
            onChange={(e) => setNewUser({ ...newUser, loginId: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Section"
            value={newUser.section}
            onChange={(e) => setNewUser({ ...newUser, section: e.target.value })}
          />
          <FormControl
            as="select"
            className="mb-2"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="STUDENT">STUDENT</option>
            <option value="FACULTY">FACULTY</option>
            <option value="TA">TA</option>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <>
              <FormControl
                className="mb-2"
                placeholder="First Name"
                value={editingUser.firstName || ""}
                onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
              />
              <FormControl
                className="mb-2"
                placeholder="Last Name"
                value={editingUser.lastName || ""}
                onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
              />
              <FormControl
                className="mb-2"
                type="email"
                placeholder="Email"
                value={editingUser.email || ""}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              />
              <FormControl
                className="mb-2"
                placeholder="Login ID"
                value={editingUser.loginId || ""}
                onChange={(e) => setEditingUser({ ...editingUser, loginId: e.target.value })}
              />
              <FormControl
                className="mb-2"
                placeholder="Section"
                value={editingUser.section || ""}
                onChange={(e) => setEditingUser({ ...editingUser, section: e.target.value })}
              />
              <FormControl
                as="select"
                className="mb-2"
                value={editingUser.role || "STUDENT"}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              >
                <option value="STUDENT">STUDENT</option>
                <option value="FACULTY">FACULTY</option>
                <option value="TA">TA</option>
              </FormControl>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
