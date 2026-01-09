import { useEffect, useState } from "react";
import {
  getDonations,
  createDonation,
  updateDonation,
  deleteDonation,
} from "../services/donations.service";
import { getCategories } from "../services/categories.service";
import { Plus, ArrowLeft } from "lucide-react";
import "../App.css";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mode, setMode] = useState("list"); // list | form | view
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const EMPTY_FORM = {
    title: "",
    description: "",
    donation_goal: "",
    category: "",
    image: null,
  };

  const IMAGE_BASE_URL = "https://ngowork.pythonanywhere.com";

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    loadDonations();
    loadCategories();
  }, []);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const data = await getDonations();
      setDonations(data || []);
    } catch {
      setError("Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data || []);
  };

  const openAddForm = () => {
    setFormData(EMPTY_FORM);
    setEditingItem(null);
    setMode("form");
  };

  const openEditForm = (item) => {
    setFormData({
      title: item.title || "",
      description: item.description || "",
      donation_goal: item.donation_goal || "",
      category: item.category_id || "", // 👈 backend wants "category"
      image: null,
    });
    setEditingItem(item);
    setMode("form");
  };

  const openView = (item) => {
    setViewItem(item);
    setMode("view");
  };

  const goBack = () => {
    setMode("list");
    setEditingItem(null);
    setViewItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    try {
      setLoading(true);
      if (editingItem) {
        await updateDonation(editingItem.id, payload);
      } else {
        await createDonation(payload);
      }
      goBack();
      loadDonations();
    } catch (err) {
      alert(JSON.stringify(err.response?.data, null, 2));
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this donation?")) return;
    await deleteDonation(id);
    loadDonations();
  };

  return (
    <div className="category-wrapper">
      {/* HEADER */}
      <div className="category-header">
        <h2 className="dashboard-title">💝Donation Management</h2>

        {mode === "list" && (
          <button onClick={openAddForm} className="primary-btn">
            <Plus size={16} /> Add Donation
          </button>
        )}

        {mode !== "list" && (
          <button onClick={goBack} className="primary-btn">
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* ================= FORM ================= */}
      {mode === "form" && (
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group full">
              <label>Category</label>
              <select
                name="category" // 👈 change here
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label>Donation Goal</label>
              <input
                type="number"
                name="donation_goal"
                value={formData.donation_goal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label>Image</label>

              {editingItem && editingItem.image && !formData.image && (
                <div style={{ marginBottom: "10px" }}>
                  <small>Current Image:</small>
                  <br />
                  <img
                    src={`${IMAGE_BASE_URL}${editingItem.image}`}
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                </div>
              )}

              {formData.image && (
                <div style={{ marginBottom: "10px" }}>
                  <small>New Image:</small>
                  <br />
                  <img
                    src={URL.createObjectURL(formData.image)}
                    style={{ width: "100px", borderRadius: "8px" }}
                  />
                </div>
              )}

              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="form-actions">
              <button type="submit" className="success-btn">
                {editingItem ? "Update Donation" : "Save Donation"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= VIEW ================= */}
      {mode === "view" && viewItem && (
        <div className="view-card">
          <p>
            <strong>Title:</strong> {viewItem.title}
          </p>
          <p>
            <strong>Category:</strong> {viewItem.category_title}
          </p>
          <p>
            <strong>Description:</strong> {viewItem.description}
          </p>
          <p>
            <strong>Goal:</strong> {viewItem.donation_goal}
          </p>

          {viewItem.image && (
            <img
              src={`${IMAGE_BASE_URL}${viewItem.image}`}
              className="preview-img"
            />
          )}
        </div>
      )}

      {/* ================= TABLE ================= */}
      {mode === "list" && (
        <div className="table-card">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Goal</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category_title}</td>
                    <td>{item.donation_goal}</td>
                    <td>
                      {item.image ? (
                        <img
                          src={`${IMAGE_BASE_URL}${item.image}`}
                          className="table-img"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="icon-btn view-btn"
                          onClick={() => openView(item)}
                        >
                          👁️
                        </button>
                        <button
                          className="icon-btn edit-btn"
                          onClick={() => openEditForm(item)}
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-btn delete-btn"
                          onClick={() => deleteItem(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
