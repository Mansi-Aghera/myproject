import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categories.service";
import { Plus, Pencil, Trash2, Eye, ArrowLeft } from "lucide-react";
import "../App.css";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [mode, setMode] = useState("list"); // list | form | view
  const [editingItem, setEditingItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const EMPTY_FORM = {
    title: "",
    image: null,
  };

  const IMAGE_BASE_URL = "https://ngowork.pythonanywhere.com";

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data || []);
    } catch {
      setError("Failed to load categories");
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
      title: item.title || "",
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
        await updateCategory(editingItem.id, payload);
      } else {
        await createCategory(payload);
      }
      goBack();
      loadCategories();
    } catch (err) {
      alert(JSON.stringify(err.response?.data, null, 2));
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <div className="category-wrapper">
      {/* HEADER */}
      <div className="category-header">
        <h2 className="dashboard-title">Category Management</h2>

        {mode === "list" && (
          <button onClick={openAddForm} className="primary-btn">
            <Plus size={16} /> Add Category
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
                {editingItem ? "Update Category" : "Save Category"}
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
            <strong>Created At:</strong>{" "}
            {new Date(viewItem.created_at).toLocaleString()}
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
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
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
                          title="View"
                        >
                          👁️
                        </button>
                        <button
                          className="icon-btn edit-btn"
                          onClick={() => openEditForm(item)}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-btn delete-btn"
                          onClick={() => deleteItem(item.id)}
                          title="Delete"
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
