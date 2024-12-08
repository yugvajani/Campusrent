import React, { useState, useEffect } from "react";
import "../CSS/ProfilePage.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    location: "",
    dateJoined: "",
    rating: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setUserData({
            name: result.data.name,
            username: result.data.username,
            email: result.data.email,
            location: result.data.location || "N/A",
            dateJoined: new Date(result.data.date_joined).toLocaleDateString(),
            rating: result.data.rating || 0,
          });
          setEditableData({
            name: result.data.name,
            email: result.data.email,
            location: result.data.location || "",
          });
        } else {
          alert(`Failed to fetch user info: ${result.msg}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditableData({
      name: userData.name,
      email: userData.email,
      location: userData.location,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editableData),
      });
      const result = await response.json();

      if (response.ok) {
        alert("User updated successfully!");
        setUserData((prev) => ({ ...prev, ...editableData }));
        setIsEditing(false);
      } else {
        alert(`Failed to update user: ${result.msg}`);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("An error occurred while saving changes.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.removeItem("authToken");
        window.location.href = "./";
      } else {
        alert(`Failed to delete account: ${result.msg}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account.");
    }
  };

  return (
    <div className="profile-page-container">
      {/* Navbar */}
      <header className="navbar" style={{width: '1500px',marginTop:'-12%'}}>
        <div className="navbar-brand">Campus Rent</div>
        <div className="navbar-search">
          <input type="text" placeholder="Search for products, brands and more" />
          <button>🔍</button>
        </div>
        <div className="navbar-links">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
        </div>
      </header>

      <div className="profile-container" style={{width:'60%',marginTop: '5.5%'}}>
        <div className="profile-main">
          <div className="profile-left">
            <img
              src="https://via.placeholder.com/100" // Placeholder for user image
              alt="User"
              className="profile-image"
            />
            <h2 className="profile-name">{userData.name}</h2>
            <p className="profile-role">Engineer</p>
            <p className="profile-rating">⭐ {userData.rating}</p>
            <button className="delete-account-btn" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
          <div className="profile-right">
            <div className="profile-details">
              <label>User Name</label>
              <input type="text" value={userData.username} readOnly />
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={editableData.email}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={editableData.location}
                readOnly={!isEditing}
                onChange={handleInputChange}
              />
              <label>Date Joined</label>
              <input type="text" value={userData.dateJoined} readOnly />
            </div>
            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="save-btn">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={handleEdit} className="edit-btn">
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;