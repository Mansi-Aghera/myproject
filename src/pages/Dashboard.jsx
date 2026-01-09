// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaList, FaCalendarAlt, FaEnvelope, FaRupeeSign } from "react-icons/fa";
// import { getDashboardStats } from "../services/dashboard.service";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const data = await getDashboardStats();
//       setStats(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-4">Loading dashboard...</div>;
//   }

//   const Card = ({ title, value, icon, onClick, gradient }) => (
//     <div className="col-md-3 mb-4">
//       <div
//         className="dashboard-card"
//         style={{
//           cursor: "pointer",
//           background: gradient,
//           color: "#fff",
//         }}
//         onClick={onClick}
//       >
//         {React.cloneElement(icon, { color: "#fff", opacity: 0.2 })}
//         <p className="card-title" style={{ color: "rgba(255,255,255,0.7)" }}>
//           {title}
//         </p>
//         <p className="card-value" style={{ color: "#fff" }}>
//           {value}
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-4">
//       <h2 className="mb-4 dashboard-title category-header">Welcome Admin 👋</h2>

//       <div className="row">
//         <Card
//           title="Categories"
//           value={stats.categories}
//           icon={<FaList className="card-icon" />}
//           gradient="linear-gradient(135deg, #6366F1, #4338CA)"
//           onClick={() => navigate("/categories")}
//         />

//         <Card
//           title="Events"
//           value={stats.events}
//           icon={<FaCalendarAlt className="card-icon" />}
//           gradient="linear-gradient(135deg, #F59E0B, #B45309)"
//           onClick={() => navigate("/events")}
//         />

//         <Card
//           title="Contacts"
//           value={stats.contacts}
//           icon={<FaEnvelope className="card-icon" />}
//           gradient="linear-gradient(135deg, #06B6D4, #0EA5E9)"
//           onClick={() => navigate("/contact")}
//         />

//         <Card
//           title="Donations Count"
//           value={stats.donationsCount}
//           icon={<FaRupeeSign className="card-icon" />}
//           gradient="linear-gradient(135deg, #22C55E, #16A34A)"
//           onClick={() => navigate("/donations")}
//         />

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaList, FaCalendarAlt, FaEnvelope, FaRupeeSign } from "react-icons/fa";
import { getDashboardStats } from "../services/dashboard.service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getDashboardStats();
    setData(res);
  };

  if (!data) return <div className="p-4">Loading dashboard...</div>;

  const Card = ({ title, value, icon, onClick, gradient }) => (
  <div className="col-md-3 mb-4">
    <div
      className="dashboard-card"
      style={{
        cursor: "pointer",
        background: gradient,
        color: "#fff",
        minHeight: "130px",
      }}
      onClick={onClick}
    >
      {React.cloneElement(icon, {
        color: "rgba(255,255,255,0.9)",
        size: 28,
      })}

      <p
        className="card-title"
        style={{ color: "rgba(255,255,255,0.75)" }}
      >
        {title}
      </p>

      <p
        className="card-value"
        style={{ color: "#fff" }}
      >
        {value}
      </p>
    </div>
  </div>
);


  const pieData = [
    { name: "Categories", value: data.categories.length },
    { name: "Events", value: data.events.length },
    { name: "Contacts", value: data.contacts.length },
    { name: "Donations", value: data.donations.length },
  ];

  return (
    <div className="p-4">
      <h2 className="mb-4 dashboard-title">Welcome Admin 👋</h2>

      {/* CARDS */}
      <div className="row">
        <Card
          title="Categories"
          value={data.categories.length}
          icon={<FaList className="card-icon" />}
          gradient="linear-gradient(135deg,#6366F1,#4338CA)"
          onClick={() => navigate("/categories")}
        />

        <Card
          title="Events"
          value={data.events.length}
          icon={<FaCalendarAlt className="card-icon" />}
          gradient="linear-gradient(135deg,#F59E0B,#B45309)"
          onClick={() => navigate("/events")}
        />

        <Card
          title="Contacts"
          value={data.contacts.length}
          icon={<FaEnvelope className="card-icon" />}
          gradient="linear-gradient(135deg,#06B6D4,#0EA5E9)"
          onClick={() => navigate("/contact")}
        />

        <Card
          title="Donations"
          value={data.donations.length}
          icon={<FaRupeeSign className="card-icon" />}
          gradient="linear-gradient(135deg,#22C55E,#16A34A)"
          onClick={() => navigate("/donations")}
        />
      </div>

      {/* CHARTS */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Overall Activity</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90}>
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={["#6366F1", "#F59E0B", "#06B6D4", "#22C55E"][i]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Donations Trend</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.donations}>
                <XAxis dataKey="created_at" hide />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="id" stroke="#4F46E5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT PANELS */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Recent Contacts</h5>
            {data.contacts.slice(0, 5).map((c) => (
              <p key={c.id} className="recent-text">
                <b>{c.name}</b> - {c.email}
              </p>
            ))}
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="dashboard-card">
            <h5>Recent Events</h5>
            {data.events.slice(0, 5).map((e) => (
              <p key={e.id}>
                <b>{e.title}</b> - {e.location}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
