import api from "./api";

/*
  GET ALL EVENTS
*/
export const getEvents = async () => {
  const response = await api.get("/events/");
  return response.data.data ?? response.data;
};

/*
  CREATE EVENT
*/
export const createEvent = async (formData) => {
  const response = await api.post("/events/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  UPDATE EVENT
*/
export const updateEvent = async (id, formData) => {
  const response = await api.patch(`/events/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

/*
  DELETE EVENT
*/
export const deleteEvent = async (id) => {
  await api.delete(`/events/${id}/`);
};
