import api from "./api";

/*
  GET ALL DONATIONS
*/
export const getDonations = async () => {
  const response = await api.get("/donations/");
  return response.data.data ?? response.data;
};

/*
  CREATE DONATION
*/
export const createDonation = async (formData) => {
  const response = await api.post("/donations/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  UPDATE DONATION
*/
export const updateDonation = async (id, formData) => {
  const response = await api.patch(`/donations/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  DELETE DONATION
*/
export const deleteDonation = async (id) => {
  await api.delete(`/donations/${id}/`);
};
