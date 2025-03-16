"use client"

import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';

const CyberpunkDashboard = () => {
    // State management
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [animatedValues, setAnimatedValues] = useState({ cpu: 0, memory: 0, network: 0, users: 0 });
    const [hoverCard, setHoverCard] = useState(null);
    const [notificationCount, setNotificationCount] = useState(4);
    const [glitchEffect, setGlitchEffect] = useState(false);
    const [currentTime, setCurrentTime] = useState(''); // State for current time

    // Sample data (VERIFY THESE DATA STRUCTURES IN BROWSER CONSOLE IF CHARTS DON'T RENDER)
    const performanceData = [
        { name: 'Jan', value: 65, avg: 58 },
        { name: 'Feb', value: 59, avg: 62 },
        { name: 'Mar', value: 80, avg: 65 },
        { name: 'Apr', value: 81, avg: 68 },
        { name: 'May', value: 56, avg: 59 },
        { name: 'Jun', value: 55, avg: 61 },
        { name: 'Jul', value: 40, avg: 50 },
        { name: 'Aug', value: 75, avg: 65 },
        { name: 'Sep', value: 65, avg: 60 },
        { name: 'Oct', value: 90, avg: 75 },
    ];

    const userActivityData = [
        { name: 'Mon', users: 2400, sessions: 4000 },
        { name: 'Tue', users: 1398, sessions: 3000 },
        { name: 'Wed', users: 9800, sessions: 2000 },
        { name: 'Thu', users: 3908, sessions: 2780 },
        { name: 'Fri', users: 4800, sessions: 1890 },
        { name: 'Sat', users: 3800, sessions: 2390 },
        { name: 'Sun', users: 4300, sessions: 3490 },
    ];

    const storageData = [
        { name: 'System', value: 28, color: '#22d3ee' },
        { name: 'Apps', value: 40, color: '#ec4899' },
        { name: 'Media', value: 20, color: '#6366f1' },
        { name: 'Free', value: 12, color: '#10b981' },
    ];

    const securityMetrics = [
        { subject: 'Threats', value: 120, fullMark: 150 },
        { subject: 'Vulnerabilities', value: 98, fullMark: 150 },
        { subject: 'Risk Score', value: 86, fullMark: 150 },
        { subject: 'Compliance', value: 99, fullMark: 150 },
        { subject: 'Response Time', value: 85, fullMark: 150 },
        { subject: 'Security Index', value: 92, fullMark: 150 },
    ];

    const networkTrafficData = [
        { name: '00:00', traffic: 2400, bandwidth: 4000 },
        { name: '04:00', traffic: 1398, bandwidth: 3000 },
        { name: '08:00', traffic: 9800, bandwidth: 2000 },
        { name: '12:00', traffic: 3908, bandwidth: 2780 },
        { name: '16:00', traffic: 4800, bandwidth: 1890 },
        { name: '20:00', traffic: 3800, bandwidth: 2390 },
        { name: '23:59', traffic: 4300, bandwidth: 3490 },
    ];

    const realtimeData = [
        { name: '1', value: Math.floor(Math.random() * 100) },
        { name: '2', value: Math.floor(Math.random() * 100) },
        { name: '3', value: Math.floor(Math.random() * 100) },
        { name: '4', value: Math.floor(Math.random() * 100) },
        { name: '5', value: Math.floor(Math.random() * 100) },
    ];

    const [liveData, setLiveData] = useState(realtimeData);

    // Animated counter effect
    useEffect(() => {
        const targetValues = { cpu: 78, memory: 42, network: 91, users: 1342 };
        const duration = 2000; // Animation duration in ms
        const interval = 20; // Update interval in ms
        let startTime = null;

        const animate = timestamp => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setAnimatedValues({
                cpu: Math.floor(progress * targetValues.cpu),
                memory: Math.floor(progress * targetValues.memory),
                network: Math.floor(progress * targetValues.network),
                users: Math.floor(progress * targetValues.users)
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, []);

    // Real-time data simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveData(prevData => {
                const newData = [...prevData.slice(1), { name: '5', value: Math.floor(Math.random() * 100) }];
                newData.forEach((item, i) => {
                    item.name = String(i + 1);
                });
                return newData;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Glitch effect simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setGlitchEffect(true);
            setTimeout(() => setGlitchEffect(false), 200);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    // Real-time clock using useEffect for client-side rendering
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000); // Update time every second

        return () => clearInterval(timer); // Clear interval on component unmount
    }, []); // Empty dependency array ensures this runs only once after mount

    // Modal handlers
    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    const securityAlerts = [
        { level: 'critical', message: 'Critical Breach Attempt', time: '2m ago', details: 'Attempted intrusion detected from IP 192.168.1.42. Firewall blocked 3 unauthorized access attempts to the primary database.' },
        { level: 'warning', message: 'Unusual Login Pattern', time: '17m ago', details: 'User admin_johnson logged in from an unrecognized location. Geographical anomaly detected.' },
        { level: 'warning', message: 'Multiple Failed Logins', time: '25m ago', details: 'User account marketing_lead has had 5 failed login attempts in the past 10 minutes. Account temporarily locked.' },
        { level: 'info', message: 'System Update Available', time: '1h ago', details: 'Security patch KB-29471 is available for installation. Recommended to apply during next maintenance window.' },
    ];

    return (
        <div className={`min-h-screen bg-gray-900 text-cyan-400 font-mono p-4 ${glitchEffect ? 'opacity-90' : ''}`}>
            {/* Background effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-pink-900/10 to-cyan-900/10 pointer-events-none"></div>
            <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHJlc3VsdD0ibm9pc2UiPjwvZmVUdXJidWxlbmNlPjxmZURpc3BsYWNlbWVudE1hcCBpbj0ibm9pc2UiIHNjYWxlPSIxMCI+PC9mZURpc3BsYWNlbWVudE1hcD48L2ZpbHRlcj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSI+PC9yZWN0Pjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>

            {/* Header with animated counter */}
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 border-b border-cyan-700/50 pb-4 relative overflow-hidden">
                <div className="relative">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 mb-2">NEXUS-9 // QUANTUM INTERFACE</h1>
                    <p className="text-cyan-300/70 text-sm tracking-widest">SECURE SYSTEM ACCESS • {currentTime}</p>

                    {/* Animated badge */}
                    <div className="absolute -top-2 -right-16 bg-pink-600/20 text-pink-400 text-xs px-2 py-1 rounded-sm border border-pink-500/50 transform rotate-12 animate-pulse">
                        QUANTUM SECURED
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                    <div onClick={() => openModal({ type: 'system', data: { cpu: animatedValues.cpu, memory: animatedValues.memory, network: animatedValues.network } })} className="group bg-cyan-900/30 backdrop-blur-sm p-3 rounded-md border border-cyan-700/50 hover:border-cyan-500 cursor-pointer transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                        <span className="text-pink-400 block text-xs">CPU LOAD</span>
                        <span className="text-2xl font-bold">{animatedValues.cpu}%</span>
                    </div>

                    <div onClick={() => openModal({ type: 'memory', data: { memory: animatedValues.memory } })} className="group bg-cyan-900/30 backdrop-blur-sm p-3 rounded-md border border-cyan-700/50 hover:border-cyan-500 cursor-pointer transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                        <span className="text-pink-400 block text-xs">MEMORY</span>
                        <span className="text-2xl font-bold">{animatedValues.memory}%</span>
                    </div>

                    <div onClick={() => openModal({ type: 'network', data: { network: animatedValues.network } })} className="group bg-cyan-900/30 backdrop-blur-sm p-3 rounded-md border border-cyan-700/50 hover:border-cyan-500 cursor-pointer transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                        <span className="text-pink-400 block text-xs">NETWORK</span>
                        <span className="text-2xl font-bold">{animatedValues.network}%</span>
                    </div>

                    <div className="group bg-cyan-900/30 backdrop-blur-sm p-3 rounded-md border border-cyan-700/50 hover:border-cyan-500 cursor-pointer transition-all duration-300 relative overflow-hidden" onClick={() => setNotificationCount(0)}>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                        <span className="text-pink-400 block text-xs">ALERTS</span>
                        <div className="flex items-center">
                            <span className="text-2xl font-bold">{notificationCount}</span>
                            {notificationCount > 0 && (
                                <span className="ml-2 h-2 w-2 bg-pink-500 rounded-full animate-ping absolute"></span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation tabs with animation effects */}
            <nav className="flex flex-wrap gap-2 mb-6">
                {['overview', 'security', 'users', 'network', 'performance', 'resources', 'settings'].map(tab => (
                    <button
                        key={tab}
                        className={`px-4 py-2 uppercase tracking-wider border relative overflow-hidden transition-all duration-300 ${
                            activeTab === tab
                                ? 'border-pink-500 text-pink-400 bg-pink-900/20'
                                : 'border-cyan-800/50 hover:border-cyan-600 bg-cyan-900/10 hover:bg-cyan-900/20'
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {activeTab === tab && (
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 animate-pulse pointer-events-none"></div>
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                ))}
            </nav>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Status overview */}
                <div
                    className={`col-span-1 lg:col-span-2 border border-cyan-800/50 bg-gradient-to-br from-gray-900 to-gray-900/90 backdrop-blur-sm p-4 rounded-md relative ${hoverCard === 'status' ? 'border-cyan-500 shadow-lg shadow-cyan-900/20' : 'hover:border-cyan-700'} transition-all duration-300`}
                    onMouseEnter={() => setHoverCard('status')}
                    onMouseLeave={() => setHoverCard(null)}
                >
                    <div className="absolute top-0 right-0 border-l border-b border-cyan-800/50 px-2 py-1 text-xs text-cyan-500">REAL-TIME</div>
                    <h2 className="text-xl mb-4 border-b border-cyan-800/50 pb-2 flex items-center">
                        <span className="mr-2 text-cyan-300">SYSTEM STATUS</span>
                        <span className="text-xs bg-green-900/30 border border-green-800/50 text-green-400 px-2 py-0.5 rounded-sm">OPERATIONAL</span>
                    </h2>

                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={liveData}>
                                <XAxis dataKey="name" tick={{ fill: "#67e8f9" }} />
                                <YAxis tick={{ fill: "#67e8f9" }} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#ec4899"
                                    strokeWidth={2}
                                    dot={{ fill: "#ec4899", r: 4 }}
                                    activeDot={{ r: 6, fill: "#f472b6" }}
                                    isAnimationActive={true}
                                    animationDuration={500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="border border-cyan-800/50 bg-cyan-900/10 p-2 rounded text-center">
                            <div className="text-xs text-cyan-300">UPTIME</div>
                            <div className="text-pink-400">99.97%</div>
                        </div>
                        <div className="border border-cyan-800/50 bg-cyan-900/10 p-2 rounded text-center">
                            <div className="text-xs text-cyan-300">RESPONSE</div>
                            <div className="text-pink-400">18ms</div>
                        </div>
                        <div className="border border-cyan-800/50 bg-cyan-900/10 p-2 rounded text-center">
                            <div className="text-xs text-cyan-300">PROCESSES</div>
                            <div className="text-pink-400">314</div>
                        </div>
                    </div>
                </div>

                {/* Active Users with pulsing effect */}
                <div
                    className={`border border-cyan-800/50 bg-gradient-to-br from-gray-900 to-gray-900/90 backdrop-blur-sm p-4 rounded-md relative ${hoverCard === 'users' ? 'border-cyan-500 shadow-lg shadow-cyan-900/20' : 'hover:border-cyan-700'} transition-all duration-300`}
                    onMouseEnter={() => setHoverCard('users')}
                    onMouseLeave={() => setHoverCard(null)}
                    onClick={() => openModal({ type: 'users', data: userActivityData })}
                >
                    <div className="absolute top-0 right-0 border-l border-b border-cyan-800/50 px-2 py-1 text-xs text-cyan-500 cursor-pointer">DETAILS</div>
                    <h2 className="text-xl mb-2 border-b border-cyan-800/50 pb-2 text-cyan-300">ACTIVE USERS</h2>

                    <div className="relative flex justify-center items-center my-4">
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="h-32 w-32 rounded-full border-2 border-pink-500/30 animate-ping"></div>
                        </div>
                        <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-400 to-purple-400">
                            {animatedValues.users}
                        </div>
                    </div>

                    <div className="text-center text-cyan-300 text-sm">+18% from last period</div>
                    <div className="flex justify-between mt-4 text-xs">
                        <div>PEAK: 1,987</div>
                        <div>AVG: 1,253</div>
                    </div>
                </div>

                {/* Security Alerts with hover effects */}
                <div
                    className={`border border-cyan-800/50 bg-gradient-to-br from-gray-900 to-gray-900/90 backdrop-blur-sm p-4 rounded-md relative ${hoverCard === 'security' ? 'border-cyan-500 shadow-lg shadow-cyan-900/20' : 'hover:border-cyan-700'} transition-all duration-300`}
                    onMouseEnter={() => setHoverCard('security')}
                    onMouseLeave={() => setHoverCard(null)}
                >
                    <div className="absolute top-0 right-0 border-l border-b border-cyan-800/50 px-2 py-1 text-xs text-pink-500">{notificationCount} ALERTS</div>
                    <h2 className="text-xl mb-2 border-b border-cyan-800/50 pb-2 text-cyan-300">SECURITY ALERTS</h2>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {securityAlerts.map((alert, index) => (
                            <div
                                key={index}
                                className={`group flex justify-between ${
                                    alert.level === 'critical' ? 'bg-red-900/20 border border-red-800/50' :
                                        alert.level === 'warning' ? 'bg-yellow-900/20 border border-yellow-800/50' :
                                            'bg-blue-900/20 border border-blue-800/50'
                                } p-2 cursor-pointer hover:bg-opacity-40 transition-all duration-200`}
                                onClick={() => openModal({ type: 'alert', data: alert })}
                            >
                                <span>{alert.message}</span>
                                <span className={
                                    alert.level === 'critical' ? 'text-red-400' :
                                        alert.level === 'warning' ? 'text-yellow-400' :
                                            'text-blue-400'
                                }>{alert.time}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-3 border border-cyan-800/50 hover:border-cyan-600 bg-cyan-900/10 hover:bg-cyan-900/30 p-1 text-sm transition-all duration-200" onClick={() => openModal({ type: 'alerts', data: securityAlerts })}>
                        VIEW ALL ALERTS
                    </button>
                </div>
            </div>

            {/* Second row with more detailed charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Performance Chart with gradient */}
                <div
                    className={`lg:col-span-2 border border-cyan-800/50 bg-gradient-to-br from-gray-900 to-gray-900/90 backdrop-blur-sm p-4 rounded-md relative ${hoverCard === 'performance' ? 'border-cyan-500 shadow-lg shadow-cyan-900/20' : 'hover:border-cyan-700'} transition-all duration-300`}
                    onMouseEnter={() => setHoverCard('performance')}
                    onMouseLeave={() => setHoverCard(null)}
                    onClick={() => openModal({ type: 'performance', data: performanceData })}
                >
                    <div className="absolute top-0 right-0 border-l border-b border-cyan-800/50 px-2 py-1 text-xs text-cyan-500">QUARTERLY</div>
                    <h2 className="text-xl mb-4 border-b border-cyan-800/50 pb-2 flex items-center text-cyan-300">
                        PERFORMANCE METRICS
                        <span className="ml-2 text-xs text-pink-400">+15.2%</span>
                    </h2>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#67e8f9" />
                                <YAxis stroke="#67e8f9" />
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                <Area type="monotone" dataKey="value" stroke="#ec4899" fillOpacity={1} fill="url(#colorValue)" />
                                <Area type="monotone" dataKey="avg" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAvg)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-end gap-4 mt-2 text-xs">
                        <div className="flex items-center">
                            <div className="h-3 w-3 bg-pink-500 mr-1"></div>
                            <span>Current</span>
                        </div>
                        <div className="flex items-center">
                            <div className="h-3 w-3 bg-cyan-500 mr-1"></div>
                            <span>Average</span>
                        </div>
                    </div>
                </div>

                {/* Security radar chart */}
                <div
                    className={`border border-cyan-800/50 bg-gradient-to-br from-gray-900 to-gray-900/90 backdrop-blur-sm p-4 rounded-md relative ${hoverCard === 'radar' ? 'border-cyan-500 shadow-lg shadow-cyan-900/20' : 'hover:border-cyan-700'} transition-all duration-300`}
                    onMouseEnter={() => setHoverCard('radar')}
                    onMouseLeave={() => setHoverCard(null)}
                    onClick={() => openModal({ type: 'securityMetrics', data: securityMetrics })}
                >
                    <div className="absolute top-0 right-0 border-l border-b border-cyan-800/50 px-2 py-1 text-xs text-cyan-500 cursor-pointer">ANALYZE</div>
                    <h2 className="text-xl mb-2 border-b border-cyan-800/50 pb-2 text-cyan-300">SECURITY METRICS</h2>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius="80%" data={securityMetrics}>
                                <PolarGrid stroke="#0e7490" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: "#67e8f9" }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "#67e8f9" }} />
                                <Radar name="Value" dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.5} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-center items-center text-sm mt-2">
            <span className="px-2 py-1 bg-pink-900/20 text-pink-400 border border-pink-800/50 rounded">
              Security Score: 92/100
            </span>
                    </div>
                </div>
            </div>

            {/* Third row with more interactive components */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Network traffic */}
                <div
                    className={`col-span-1 md:col-span-2 border border-cyan-800/50 bg-gradient-to-br from-gray-900 to-gray-900/90 backdrop-blur-sm p-4 rounded-md relative ${hoverCard === 'network' ? 'border-cyan-500 shadow-lg shadow-cyan-900/20' : 'hover:border-cyan-700'} transition-all duration-300`}
                    onMouseEnter={() => setHoverCard('network')}
                    onMouseLeave={() => setHoverCard(null)}
                    onClick={() => openModal({ type: 'networkTraffic', data: networkTrafficData })}
                >
                    <div className="absolute top-0 right-0 border-l border-b border-cyan-800/50 px-2 py-1 text-xs text-cyan-500">24H</div>
                    <h2 className="text-xl mb-2 border-b border-cyan-800/50 pb-2 text-cyan-300">NETWORK TRAFFIC</h2>

                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={networkTrafficData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#67e8f9" />
                                <YAxis stroke="#67e8f9" />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                <Legend wrapperStyle={{ color: '#67e8f9' }} />
                                <Bar dataKey="traffic" fill="#06b6d4" />
                                <Bar dataKey="bandwidth" fill="#ec4899" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="border border-cyan-800/50 bg-cyan-900/10 p-2 rounded text-center">
                            <div className="text-xs text-cyan-300">TOTAL TRAFFIC</div>
                            <div className="text-pink-400">8.72 TB</div>
                        </div>
                        <div className="border border-cyan-800/50 bg-cyan-900/10 p-2 rounded text-center">
                            <div className="text-xs text-cyan-300">PEAK BANDWIDTH</div>
                            <div className="text-pink-400">24.6 Gbps</div>
                        </div>
                    </div>
                </div>

                {/* Storage Usage pie chart */}
                <div
                    className={`border border-cyan-800/50 bg-gradient-to-br from-gray-900 to-gray-900/90 backdrop-blur-sm p-4 rounded-md relative ${hoverCard === 'storage' ? 'border-cyan-500 shadow-lg shadow-cyan-900/20' : 'hover:border-cyan-700'} transition-all duration-300`}
                    onMouseEnter={() => setHoverCard('storage')}
                    onMouseLeave={() => setHoverCard(null)}
                    onClick={() => openModal({ type: 'storage', data: storageData })}
                >
                    <div className="absolute top-0 right-0 border-l border-b border-cyan-800/50 px-2 py-1 text-xs text-cyan-500 cursor-pointer">DETAILS</div>
                    <h2 className="text-xl mb-2 border-b border-cyan-800/50 pb-2 text-cyan-300">STORAGE USAGE</h2>

                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={storageData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    label
                                >
                                    {storageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend wrapperStyle={{ color: '#67e8f9' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col gap-2 mt-4 text-xs">
                        {storageData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                    <span>{item.name}</span>
                                </div>
                                <span className="text-pink-400">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content Areas - Placeholder */}
            {activeTab === 'security' && (
                <div className="p-4 border border-cyan-800/50 rounded-md bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-xl mb-4 text-cyan-300">Security Dashboard</h2>
                    <p>Detailed security information and tools would be placed here.</p>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="p-4 border border-cyan-800/50 rounded-md bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-xl mb-4 text-cyan-300">User Management</h2>
                    <p>User account management, activity monitoring, etc.</p>
                </div>
            )}

            {activeTab === 'network' && (
                <div className="p-4 border border-cyan-800/50 rounded-md bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-xl mb-4 text-cyan-300">Network Monitoring</h2>
                    <p>Detailed network traffic analysis, firewall rules, etc.</p>
                </div>
            )}

            {activeTab === 'performance' && (
                <div className="p-4 border border-cyan-800/50 rounded-md bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-xl mb-4 text-cyan-300">Performance Tuning</h2>
                    <p>System performance metrics, optimization tools, etc.</p>
                </div>
            )}

            {activeTab === 'resources' && (
                <div className="p-4 border border-cyan-800/50 rounded-md bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-xl mb-4 text-cyan-300">Resource Management</h2>
                    <p>Resource allocation, monitoring, and scaling.</p>
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="p-4 border border-cyan-800/50 rounded-md bg-gray-900/50 backdrop-blur-sm">
                    <h2 className="text-xl mb-4 text-cyan-300">System Settings</h2>
                    <p>Dashboard and system configuration settings.</p>
                </div>
            )}

            {/* Modal Component */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex justify-center items-center">
                    <div className="bg-gray-800 border border-cyan-700 rounded-md p-6 relative max-w-lg w-full mx-4">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-300">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                        {modalContent && modalContent.type === 'system' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">System Details</h3>
                                <p className="mb-2">CPU Load: <span className="text-pink-400">{modalContent.data.cpu}%</span></p>
                                <p className="mb-2">Memory Usage: <span className="text-pink-400">{modalContent.data.memory}%</span></p>
                                <p className="mb-2">Network Usage: <span className="text-pink-400">{modalContent.data.network}%</span></p>
                                {/* Add more system details here */}
                            </div>
                        )}
                        {modalContent && modalContent.type === 'memory' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">Memory Details</h3>
                                <p className="mb-2">Memory Usage: <span className="text-pink-400">{modalContent.data.memory}%</span></p>
                                {/* Add more memory details here */}
                            </div>
                        )}
                        {modalContent && modalContent.type === 'network' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">Network Details</h3>
                                <p className="mb-2">Network Usage: <span className="text-pink-400">{modalContent.data.network}%</span></p>
                                {/* Add more network details here */}
                            </div>
                        )}
                        {modalContent && modalContent.type === 'users' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">User Activity Details</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={modalContent.data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="name" stroke="#67e8f9" />
                                        <YAxis stroke="#67e8f9" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                        <Legend wrapperStyle={{ color: '#67e8f9' }} />
                                        <Bar dataKey="users" fill="#06b6d4" />
                                        <Bar dataKey="sessions" fill="#ec4899" />
                                    </BarChart>
                                </ResponsiveContainer>
                                {/* Add more user details here */}
                            </div>
                        )}
                        {modalContent && modalContent.type === 'alert' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">{modalContent.data.message}</h3>
                                <p className={`mb-2 ${modalContent.data.level === 'critical' ? 'text-red-400' : modalContent.data.level === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`}>Level: {modalContent.data.level.toUpperCase()}</p>
                                <p className="mb-2">Time: {modalContent.data.time}</p>
                                <p className="mb-2">Details: {modalContent.data.details}</p>
                                {/* Add more alert details here */}
                            </div>
                        )}
                        {modalContent && modalContent.type === 'alerts' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">All Security Alerts</h3>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {modalContent.data.map((alert, index) => (
                                        <div key={index} className="p-2 border border-cyan-700 rounded-md">
                                            <p className="font-bold text-pink-400">{alert.message}</p>
                                            <p className={`text-sm ${alert.level === 'critical' ? 'text-red-400' : alert.level === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`}>Level: {alert.level.toUpperCase()} - {alert.time}</p>
                                            <p className="text-sm">{alert.details}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {modalContent && modalContent.type === 'performance' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">Performance Metrics Details</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={modalContent.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorValueModal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorAvgModal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" stroke="#67e8f9" />
                                        <YAxis stroke="#67e8f9" />
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                        <Area type="monotone" dataKey="value" stroke="#ec4899" fillOpacity={1} fill="url(#colorValueModal)" />
                                        <Area type="monotone" dataKey="avg" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAvgModal)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        {modalContent && modalContent.type === 'securityMetrics' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">Detailed Security Metrics</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart outerRadius="90%" data={modalContent.data}>
                                        <PolarGrid stroke="#0e7490" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: "#67e8f9" }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "#67e8f9" }} />
                                        <Radar name="Value" dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.5} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        {modalContent && modalContent.type === 'networkTraffic' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">Network Traffic Details</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={modalContent.data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                        <XAxis dataKey="name" stroke="#67e8f9" />
                                        <YAxis stroke="#67e8f9" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                        <Legend wrapperStyle={{ color: '#67e8f9' }} />
                                        <Bar dataKey="traffic" fill="#06b6d4" />
                                        <Bar dataKey="bandwidth" fill="#ec4899" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                        {modalContent && modalContent.type === 'storage' && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-cyan-300">Storage Usage Breakdown</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#155e75' }} />
                                        <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={modalContent.data}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            fill="#8884d8"
                                            label
                                        >
                                            {modalContent.data.map((entry, index) => (
                                                <Cell key={`cell-modal-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Legend wrapperStyle={{ color: '#67e8f9' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex flex-col gap-2 mt-4 text-sm">
                                    {storageData.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                                <span>{item.name}</span>
                                            </div>
                                            <span className="text-pink-400">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CyberpunkDashboard;