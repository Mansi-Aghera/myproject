import api from "./api";

/*
  GET ALL CATEGORIES
*/
export const getCategories = async () => {
  const response = await api.get("/categories/");
  return response.data.data ?? response.data;
};

/*
  CREATE CATEGORY
*/
export const createCategory = async (formData) => {
  const response = await api.post("/categories/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  UPDATE CATEGORY
*/
export const updateCategory = async (id, formData) => {
  const response = await api.patch(`/categories/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  DELETE CATEGORY
*/
export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}/`);
};
