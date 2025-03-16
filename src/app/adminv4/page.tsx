"use client";

import React, { useState, useEffect } from "react";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell, BarProps,
} from "recharts";
import { motion } from "framer-motion";

// Mock Data
const userGrowthDataInitial = [
    { date: "2023-01", users: 100 },
    { date: "2023-02", users: 150 },
    { date: "2023-03", users: 200 },
    { date: "2023-04", users: 180 },
    { date: "2023-05", users: 240 },
    { date: "2023-06", users: 300 },
];

const salesByRegion = [
    { region: "North", sales: 4000 },
    { region: "South", sales: 3000 },
    { region: "East", sales: 2000 },
    { region: "West", sales: 2780 },
];

const marketShare = [
    { category: "Electronics", value: 40 },
    { category: "Clothing", value: 30 },
    { category: "Home", value: 20 },
    { category: "Books", value: 10 },
];

const dailyActiveUsersInitial = [
    { day: "Mon", users: 1200 },
    { day: "Tue", users: 1320 },
    { day: "Wed", users: 1010 },
    { day: "Thu", users: 1340 },
    { day: "Fri", users: 900 },
    { day: "Sat", users: 800 },
    { day: "Sun", users: 790 },
];

const ageDemographics = [
    { ageGroup: "18-24", count: 500 },
    { ageGroup: "25-34", count: 700 },
    { ageGroup: "35-44", count: 300 },
    { ageGroup: "45-54", count: 200 },
    { ageGroup: "55+", count: 100 },
];

const trafficSources = [
    { source: "Direct", value: 40 },
    { source: "Search", value: 30 },
    { source: "Social", value: 20 },
    { source: "Referral", value: 10 },
];

const userSatisfaction = [
    { aspect: "Ease of Use", A: 120, B: 110, fullMark: 150 },
    { aspect: "Features", A: 98, B: 130, fullMark: 150 },
    { aspect: "Performance", A: 86, B: 130, fullMark: 150 },
    { aspect: "Support", A: 99, B: 100, fullMark: 150 },
    { aspect: "Value", A: 85, B: 90, fullMark: 150 },
];

const activityVsRevenue = [
    { activity: 100, revenue: 200 },
    { activity: 150, revenue: 300 },
    { activity: 200, revenue: 350 },
    { activity: 180, revenue: 280 },
    { activity: 240, revenue: 400 },
    { activity: 300, revenue: 500 },
];

const stackedSalesData = [
    { month: "Jan", Electronics: 400, Clothing: 240, Home: 240 },
    { month: "Feb", Electronics: 300, Clothing: 139, Home: 221 },
    { month: "Mar", Electronics: 200, Clothing: 980, Home: 229 },
    { month: "Apr", Electronics: 278, Clothing: 390, Home: 200 },
];

interface Order {
    id: number;
    customer: string;
    date: string;
    total: number;
    status: "Pending" | "Shipped" | "Delivered";
}

const ordersInitial: Order[] = [
    { id: 1, customer: "John Doe", date: "2023-01-01", total: 123.45, status: "Pending" },
    { id: 2, customer: "Jane Smith", date: "2023-01-02", total: 67.89, status: "Shipped" },
    { id: 3, customer: "Bob Johnson", date: "2023-01-03", total: 234.56, status: "Delivered" },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

// Main Dashboard Component
const AdvancedDashboard: React.FC = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [userGrowthData, setUserGrowthData] = useState(userGrowthDataInitial);
    const [dailyActiveUsers, setDailyActiveUsers] = useState(dailyActiveUsersInitial);
    const [orders, setOrders] = useState(ordersInitial);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: "asc" | "desc" } | null>(null);
    const [selectedCharts, setSelectedCharts] = useState([
        "User Growth",
        "Sales by Region",
        "Market Share",
        "Daily Active Users",
        "Age Demographics",
        "Traffic Sources",
        "User Satisfaction",
        "Activity vs Revenue",
        "Stacked Sales",
    ]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const openModal = (content: React.ReactNode) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    // Real-time updates for User Growth
    useEffect(() => {
        const interval = setInterval(() => {
            setUserGrowthData((prev) => {
                const lastDate = prev[prev.length - 1].date;
                const [year, month] = lastDate.split("-").map(Number);
                const newMonth = month === 12 ? 1 : month + 1;
                const newYear = month === 12 ? year + 1 : year;
                const newDate = `${newYear}-${String(newMonth).padStart(2, "0")}`;
                const newUsers = prev[prev.length - 1].users + Math.floor(Math.random() * 50);
                return [...prev.slice(-6), { date: newDate, users: newUsers }]; // Keep last 6 months
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Real-time updates for Daily Active Users
    useEffect(() => {
        const interval = setInterval(() => {
            setDailyActiveUsers((prev) =>
                prev.map((day) => ({
                    ...day,
                    users: day.users + Math.floor(Math.random() * 100 - 50), // Fluctuate by ±50
                }))
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const refreshData = () => {
        setUserGrowthData(userGrowthDataInitial);
        setDailyActiveUsers(dailyActiveUsersInitial);
    };

    const sortTable = (key: keyof Order) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        const sortedOrders = [...orders].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setOrders(sortedOrders);
    };

    return (
        <div className={`dashboard ${theme}`}>
            <GlobalStyle theme={theme} />
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                openModal={openModal}
                selectedCharts={selectedCharts}
                setSelectedCharts={setSelectedCharts}
                refreshData={refreshData}
            />
            <SummaryMetrics userGrowthData={userGrowthData} salesByRegion={salesByRegion} />
            <ChartsGrid
                selectedCharts={selectedCharts}
                openModal={openModal}
                userGrowthData={userGrowthData}
                dailyActiveUsers={dailyActiveUsers}
            />
            <DataTable openModal={openModal} sortTable={sortTable} orders={orders} />
            {modalOpen && <Modal content={modalContent} onClose={closeModal} />}
        </div>
    );
};

// Header Component
const Header: React.FC<{
    theme: "light" | "dark";
    toggleTheme: () => void;
    openModal: (content: React.ReactNode) => void;
    selectedCharts: string[];
    setSelectedCharts: React.Dispatch<React.SetStateAction<string[]>>;
    refreshData: () => void;
}> = ({ theme, toggleTheme, openModal, selectedCharts, setSelectedCharts, refreshData }) => (
    <header className="header">
        <h1>Advanced Admin Dashboard</h1>
        <div className="header-buttons">
            <button onClick={toggleTheme}>Toggle {theme === "light" ? "Dark" : "Light"} Mode</button>
            <button onClick={refreshData}>Refresh Data</button>
            <button
                onClick={() =>
                    openModal(
                        <div>
                            <h2>Chart Settings</h2>
                            {[
                                "User Growth",
                                "Sales by Region",
                                "Market Share",
                                "Daily Active Users",
                                "Age Demographics",
                                "Traffic Sources",
                                "User Satisfaction",
                                "Activity vs Revenue",
                                "Stacked Sales",
                            ].map((chart) => (
                                <label key={chart} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedCharts.includes(chart)}
                                        onChange={() =>
                                            setSelectedCharts((prev) => (prev.includes(chart) ? prev.filter((c) => c !== chart) : [...prev, chart]))
                                        }
                                    />
                                    {chart}
                                </label>
                            ))}
                        </div>
                    )
                }
            >
                Settings
            </button>
        </div>
    </header>
);

// Summary Metrics Component
const SummaryMetrics: React.FC<{
    userGrowthData: { date: string; users: number }[];
    salesByRegion: { region: string; sales: number }[];
}> = ({ userGrowthData, salesByRegion }) => {
    const totalUsers = userGrowthData[userGrowthData.length - 1].users;
    const totalSales = salesByRegion.reduce((sum, region) => sum + region.sales, 0);

    return (
        <div className="summary-metrics">
            <motion.div
                className="metric-card"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h3>Total Users</h3>
                <p>{totalUsers}</p>
            </motion.div>
            <motion.div
                className="metric-card"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h3>Total Sales</h3>
                <p>${totalSales.toLocaleString()}</p>
            </motion.div>
            <motion.div
                className="metric-card"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h3>Avg. Order Value</h3>
                <p>$141.63</p>
            </motion.div>
        </div>
    );
};

// Charts Grid Component
const ChartsGrid: React.FC<{
    selectedCharts: string[];
    openModal: (content: React.ReactNode) => void;
    userGrowthData: { date: string; users: number }[];
    dailyActiveUsers: { day: string; users: number }[];
}> = ({ selectedCharts, openModal, userGrowthData, dailyActiveUsers }) => (
    <div className="charts-grid">
        {selectedCharts.includes("User Growth") && <UserGrowthChart data={userGrowthData} />}
        {selectedCharts.includes("Sales by Region") && <SalesByRegionChart openModal={openModal} />}
        {selectedCharts.includes("Market Share") && <MarketShareChart />}
        {selectedCharts.includes("Daily Active Users") && <DailyActiveUsersChart data={dailyActiveUsers} />}
        {selectedCharts.includes("Age Demographics") && <AgeDemographicsChart />}
        {selectedCharts.includes("Traffic Sources") && <TrafficSourcesChart />}
        {selectedCharts.includes("User Satisfaction") && <UserSatisfactionChart />}
        {selectedCharts.includes("Activity vs Revenue") && <ActivityVsRevenueChart />}
        {selectedCharts.includes("Stacked Sales") && <StackedSalesChart />}
    </div>
);

// Individual Chart Components
const UserGrowthChart: React.FC<{ data: { date: string; users: number }[] }> = ({ data }) => (
    <div className="chart">
        <h2>User Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const SalesByRegionChart: React.FC<{ openModal: (content: React.ReactNode) => void }> = ({ openModal }) => (
    <div className="chart">
        <h2>Sales by Region</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                    dataKey="sales"
                    fill="#82ca9d"
                    onClick={(data) => openModal(<RegionDetails region={data.region} sales={data.sales} />)}
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const MarketShareChart: React.FC = () => (
    <div className="chart">
        <h2>Market Share</h2>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={marketShare} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                    {marketShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

const DailyActiveUsersChart: React.FC<{ data: { day: string; users: number }[] }> = ({ data }) => (
    <div className="chart">
        <h2>Daily Active Users</h2>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const AgeDemographicsChart: React.FC = () => (
    <div className="chart">
        <h2>Age Demographics (Heatmap-like)</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageDemographics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8">
                    {ageDemographics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const TrafficSourcesChart: React.FC = () => (
    <div className="chart">
        <h2>Traffic Sources (Donut)</h2>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
);

const UserSatisfactionChart: React.FC = () => (
    <div className="chart">
        <h2>User Satisfaction</h2>
        <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userSatisfaction}>
                <PolarGrid />
                <PolarAngleAxis dataKey="aspect" />
                <PolarRadiusAxis />
                <Radar name="Product A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Product B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
            </RadarChart>
        </ResponsiveContainer>
    </div>
);

const ActivityVsRevenueChart: React.FC = () => (
    <div className="chart">
        <h2>Activity vs Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="activity" name="Activity" unit="hrs" />
                <YAxis type="number" dataKey="revenue" name="Revenue" unit="$" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Data" data={activityVsRevenue} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    </div>
);

const StackedSalesChart: React.FC = () => (
    <div className="chart">
        <h2>Stacked Sales by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stackedSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Electronics" stackId="a" fill="#0088FE" />
                <Bar dataKey="Clothing" stackId="a" fill="#00C49F" />
                <Bar dataKey="Home" stackId="a" fill="#FFBB28" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);

// Data Table Component
const DataTable: React.FC<{
    openModal: (content: React.ReactNode) => void;
    sortTable: (key: keyof Order) => void;
    orders: Order[];
}> = ({ openModal, sortTable, orders }) => (
    <table className="data-table">
        <thead>
        <tr>
            <th onClick={() => sortTable("id")}>ID</th>
            <th onClick={() => sortTable("customer")}>Customer</th>
            <th onClick={() => sortTable("date")}>Date</th>
            <th onClick={() => sortTable("total")}>Total</th>
            <th onClick={() => sortTable("status")}>Status</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => (
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                    <button onClick={() => openModal(<OrderDetails order={order} />)}>View</button>
                    <button onClick={() => openModal(<EditOrderForm order={order} />)}>Edit</button>
                </td>
            </tr>
        ))}
        </tbody>
    </table>
);

// Modal Components
const OrderDetails: React.FC<{ order: Order }> = ({ order }) => (
    <div>
        <h2>Order #{order.id}</h2>
        <p>Customer: {order.customer}</p>
        <p>Date: {order.date}</p>
        <p>Total: ${order.total.toFixed(2)}</p>
        <p>Status: {order.status}</p>
    </div>
);

const EditOrderForm: React.FC<{ order: Order }> = ({ order }) => (
    <div>
        <h2>Edit Order #{order.id}</h2>
        <p>Customer: {order.customer}</p>
        {/* Placeholder for form fields */}
    </div>
);

const RegionDetails: React.FC<{ region: string; sales: number }> = ({ region, sales }) => (
    <div>
        <h2>Details for {region}</h2>
        <p>Sales: ${sales.toLocaleString()}</p>
    </div>
);

// Modal Component with Animation
const Modal: React.FC<{ content: React.ReactNode; onClose: () => void }> = ({ content, onClose }) => (
    <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
    >
        <motion.div
            className="modal-content"
            initial={{ scale: 0.8, y: -100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
        >
            <button className="modal-close-btn" onClick={onClose}>
                Close
            </button>
            {content}
        </motion.div>
    </motion.div>
);

// Global Styles
const GlobalStyle: React.FC<{ theme: "light" | "dark" }> = ({ theme }) => (
    <style>{`
    .dashboard {
      font-family: Arial, sans-serif;
      background-color: ${theme === "light" ? "#f5f5f5" : "#1a1a1a"};
      color: ${theme === "light" ? "#333" : "#ddd"};
      min-height: 100vh;
    }
    .header {
      background-color: ${theme === "light" ? "#333" : "#444"};
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .header-buttons {
      display: flex;
      gap: 10px;
    }
    .header-buttons button {
      padding: 8px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .header-buttons button:hover {
      background-color: #0056b3;
    }
    .summary-metrics {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin: 20px;
    }
    .metric-card {
      background-color: ${theme === "light" ? "#fff" : "#2a2a2a"};
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      flex: 1;
      min-width: 200px;
      text-align: center;
    }
    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin: 20px;
    }
    .chart {
      background-color: ${theme === "light" ? "#fff" : "#2a2a2a"};
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .chart h2 {
      margin-top: 0;
      font-size: 1.2em;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px;
      background-color: ${theme === "light" ? "#fff" : "#2a2a2a"};
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .data-table th, .data-table td {
      border: 1px solid ${theme === "light" ? "#ddd" : "#444"};
      padding: 10px;
      text-align: left;
    }
    .data-table th {
      background-color: ${theme === "light" ? "#f0f0f0" : "#333"};
      cursor: pointer;
    }
    .data-table td button {
      margin-right: 5px;
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .data-table td button:hover {
      background-color: #0056b3;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background-color: ${theme === "light" ? "#fff" : "#2a2a2a"};
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
      position: relative;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    .modal-close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #dc3545;
      padding: 5px 10px;
    }
    .modal-close-btn:hover {
      background-color: #c82333;
    }
    .checkbox-label {
      display: block;
      margin: 10px 0;
    }
    @media (max-width: 600px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
      .summary-metrics {
        flex-direction: column;
      }
    }
  `}</style>
);

export default AdvancedDashboard;