// import api from "./api";

// const safeArray = (res) => res.data?.data ?? res.data ?? [];

// export const getDashboardStats = async () => {
//   const [categories, donations, events, contacts] = await Promise.all([
//     api.get("/categories/"),
//     api.get("/donations/"),
//     api.get("/events/"),
//     api.get("/contact/"),
//   ]);

//   const donationList = safeArray(donations);

//   const totalDonationAmount = donationList.reduce(
//     (sum, d) => sum + Number(d.amount || 0),
//     0
//   );

//   return {
//     categories: safeArray(categories).length,
//     events: safeArray(events).length,
//     contacts: safeArray(contacts).length,
//     donationsCount: donationList.length,
//     donationsAmount: totalDonationAmount,
//   };
// };


import api from "./api";

const safeArr = (res) => res.data?.data || res.data || [];

export const getDashboardStats = async () => {
  const [categories, donations, events, contacts] = await Promise.all([
    api.get("/categories/"),
    api.get("/donations/"),
    api.get("/events/"),
    api.get("/contact/"),
  ]);

  return {
    categories: safeArr(categories),
    donations: safeArr(donations),
    events: safeArr(events),
    contacts: safeArr(contacts),
  };
};
