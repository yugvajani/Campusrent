import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/NewLendPage.css";

const NewLendPage = () => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    name: "",
    cost: "",
    rentalStartDate: "",
    rentalEndDate: "",
    location: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, name, cost, rentalStartDate, rentalEndDate, location } = formData;

    if (!category || !name || !cost || !rentalStartDate || !rentalEndDate || !location) {
        alert("Please fill in all fields before posting.");
        return;
    }
    // If all fields are filled, submit the form (or handle further logic)
    alert("Form submitted successfully!");
  };

  const addImages = (e) => {

  }

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="new-lend-page">
      <div className="header-container">
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <h1 className="page-title">CampusRent</h1>
      </div>

      <form className="form-container" onSubmit={addImages}>
        {/* Left Section - Image with Navigation */}
        <div className="image-section">
          <button className="nav-button">&lt;</button>
          <div className="image-uploader">
            <button className="image-button">+</button>
          </div>
          <button className="nav-button">&gt;</button>
        </div>

        {/* Right Section - Form Fields */}
        <div className="fields-section">
          <div className="row-group">
            <div className="input-group">
              <label>Pick Category</label>
              <select
                className="input-field"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Choose One</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            <div className="input-group">
              <label>Name of Item</label>
              <input
                type="text"
                className="input-field"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item Name"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Cost ($ per day)</label>
            <input
              type="number"
              className="input-field"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="$ Amount"
            />
          </div>

          <div className="row-group">
            <div className="input-group">
              <label>Rental Initial Date</label>
              <input
                type="date"
                className="input-field"
                name="rentalStartDate"
                value={formData.rentalStartDate}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Rental Last Date</label>
              <input
                type="date"
                className="input-field"
                name="rentalEndDate"
                value={formData.rentalEndDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Location</label>
            <input
              type="text"
              className="input-field"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </div>

          {/* Submit Button */}
          <div className="submit-container">
            <button type="submit" className="submit-button">
              Post Online
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewLendPage;