import api from "./api";

/*
  GET ALL CONTACTS
*/
export const getContacts = async () => {
  const response = await api.get("/contact/");
  return response.data.data ?? response.data;
};

/*
  CREATE CONTACT
*/
export const createContact = async (payload) => {
  const response = await api.post("/contact/", payload);
  return response.data;
};

/*
  UPDATE CONTACT
*/
export const updateContact = async (id, payload) => {
  const response = await api.patch(`/contact/${id}/`, payload);
  return response.data;
};

/*
  DELETE CONTACT
*/
export const deleteContact = async (id) => {
  await api.delete(`/contact/${id}/`);
};
