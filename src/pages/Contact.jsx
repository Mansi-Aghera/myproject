import { useEffect, useState } from "react";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contact.service";
import { Plus, ArrowLeft } from "lucide-react";
import "../App.css";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mode, setMode] = useState("list"); // list | form | view
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const EMPTY_FORM = {
    name: "",
    email: "",
    number: "",
    message: "",
  };

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data || []);
    } catch {
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setFormData(EMPTY_FORM);
    setEditingItem(null);
    setMode("form");
  };

  const openEditForm = (item) => {
    setFormData({
      name: item.name || "",
      email: item.email || "",
      number: item.number || "",
      message: item.message || "",
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

  if (name === "number") {
    if (!/^\d*$/.test(value)) return; // only digits
  }

  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  // 10-digit validation
  if (!/^\d{10}$/.test(formData.number)) {
    alert("Contact number must be exactly 10 digits");
    return;
  }

  try {
    setLoading(true);
    if (editingItem) {
      await updateContact(editingItem.id, formData);
    } else {
      await createContact(formData);
    }
    goBack();
    loadContacts();
  } catch (err) {
    alert(JSON.stringify(err.response?.data, null, 2));
    setError("Save failed");
  } finally {
    setLoading(false);
  }
};

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await deleteContact(id);
    loadContacts();
  };

  return (
    <div className="category-wrapper">
      {/* HEADER */}
      <div className="category-header">
        <h2 className="dashboard-title">📨Contact Management</h2>

        {mode === "list" && (
          <button onClick={openAddForm} className="primary-btn">
            <Plus size={16} /> Add Contact
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
              <label>Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group full">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group full">
              <label>Number</label>
              <input
  name="number"
  value={formData.number}
  onChange={handleChange}
  required
  maxLength={10}
  pattern="[0-9]{10}"
  title="Please enter exactly 10 digits"
/>

            </div>

            <div className="form-group full">
              <label>Message</label>
              <textarea name="message" rows="3" cols="70" value={formData.message} onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="submit" className="success-btn">
                {editingItem ? "Update Contact" : "Save Contact"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= VIEW ================= */}
      {mode === "view" && viewItem && (
        <div className="view-card">
          <p><strong>Name:</strong> {viewItem.name}</p>
          <p><strong>Email:</strong> {viewItem.email}</p>
          <p><strong>Number:</strong> {viewItem.number}</p>
          <p><strong>Message:</strong> {viewItem.message}</p>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.number}</td>
                    <td>
                      <div className="action-btns">
                        <button className="icon-btn view-btn" onClick={() => openView(item)}>👁️</button>
                        <button className="icon-btn edit-btn" onClick={() => openEditForm(item)}>✏️</button>
                        <button className="icon-btn delete-btn" onClick={() => deleteItem(item.id)}>🗑️</button>
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
