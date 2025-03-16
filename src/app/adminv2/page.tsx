"use client"

import React, { useState } from 'react';
import {
    ArrowUpRight,
    CreditCard,
    DollarSign,
    HelpCircle,
    Menu,
    MoreVertical,
    Search,
    Send,
    Settings,
    Bell,
    Plus,
    Activity,
    Gift
} from 'lucide-react';

const WalletAdmin = () => {
    const [selectedCard, setSelectedCard] = useState('PT. Bank Central Asia');
    const [isDashboardActive, setIsDashboardActive] = useState(true);
    const [isFinanceActive, setIsFinanceActive] = useState(false);
    const [isSendRequestActive, setIsSendRequestActive] = useState(false);
    const [isRewardsActive, setIsRewardsActive] = useState(false);
    const [isWalletActive, setIsWalletActive] = useState(true); // Wallet should be active initially
    const [isActivityActive, setIsActivityActive] = useState(false);

    const cards = [
        { id: 1, name: 'PT. Bank Central Asia', number: '**** 8392', balance: 87000, preferred: true },
        { id: 2, name: 'PT. Bank Central Asia', number: '**** 4182', balance: 58102, preferred: false },
        { id: 3, name: 'PT. Bank Central Asia', number: '**** 1004', balance: 52011, preferred: false }
    ];

    const transactions = [
        { id: 1, name: 'From James', type: 'income', amount: 102.99, date: 'Jul 01, 2024 12:32' },
        { id: 2, name: 'Play Station Plus', type: 'expense', amount: 9.48, date: 'Jul 01, 2024 12:32' },
        { id: 3, name: 'Netflix', type: 'expense', amount: 15.99, date: 'Jul 02, 2024 09:15' },
        { id: 4, name: 'Salary', type: 'income', amount: 2500.00, date: 'Jul 03, 2024 15:00' },
        { id: 5, name: 'Online Store Purchase', type: 'expense', amount: 75.50, date: 'Jul 04, 2024 18:45' },
    ];

    const activeCard = cards.find(card => card.name === selectedCard);


    const handleSidebarItemClick = (itemName: unknown) => {
        setIsDashboardActive(itemName === 'Dashboard');
        setIsFinanceActive(itemName === 'Finance');
        setIsSendRequestActive(itemName === 'Send and Request');
        setIsRewardsActive(itemName === 'Rewards');
        setIsWalletActive(itemName === 'Wallet');
        setIsActivityActive(itemName === 'Activity');

        console.log(`Clicked on ${itemName}`); // Basic interaction log
    };

    const handleLinkBank = () => {
        alert('Link Bank functionality would be implemented here.'); // Placeholder functionality
    };

    const handleLinkCard = () => {
        alert('Link Card functionality would be implemented here.'); // Placeholder functionality
    };

    const handleTransfer = () => {
        alert('Transfer functionality would be implemented here.'); // Placeholder functionality
    };

    const handleUpdateCard = () => {
        alert('Update Card functionality would be implemented here.'); // Placeholder functionality
    };

    const handleChangePreferred = () => {
        alert('Change Preferred functionality would be implemented here.'); // Placeholder functionality
    };

    const handleReport = () => {
        alert('Report functionality would be implemented here.'); // Placeholder functionality
    };


    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <span>D</span>
                        </div>
                        <span className="ml-2 font-bold text-blue-500">DOPAY</span>
                    </div>
                </div>

                <div className="p-4">
                    <div
                        className={`flex items-center p-2 ${isDashboardActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'} rounded cursor-pointer`}
                        onClick={() => handleSidebarItemClick('Dashboard')}
                    >
                        <div className="mr-3">
                            <Menu size={18} />
                        </div>
                        <span className="font-medium">Dashboard</span>
                    </div>

                    <div className="mt-4 space-y-2">
                        <div
                            className={`flex items-center p-2 ${isFinanceActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'} rounded cursor-pointer`}
                            onClick={() => handleSidebarItemClick('Finance')}
                        >
                            <div className="mr-3">
                                <DollarSign size={18} />
                            </div>
                            <span>Finance</span>
                        </div>

                        <div
                            className={`flex items-center p-2 ${isSendRequestActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'} rounded cursor-pointer`}
                            onClick={() => handleSidebarItemClick('Send and Request')}
                        >
                            <div className="mr-3">
                                <Send size={18} />
                            </div>
                            <span>Send and Request</span>
                        </div>

                        <div
                            className={`flex items-center p-2 ${isRewardsActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'} rounded cursor-pointer`}
                            onClick={() => handleSidebarItemClick('Rewards')}
                        >
                            <div className="mr-3">
                                <Gift size={18} />
                            </div>
                            <span>Rewards</span>
                        </div>

                        <div
                            className={`flex items-center p-2 ${isWalletActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'} rounded cursor-pointer`}
                            onClick={() => handleSidebarItemClick('Wallet')}
                        >
                            <div className="mr-3">
                                <CreditCard size={18} />
                            </div>
                            <span>Wallet</span>
                        </div>

                        <div
                            className={`flex items-center p-2 ${isActivityActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700'} rounded cursor-pointer`}
                            onClick={() => handleSidebarItemClick('Activity')}
                        >
                            <div className="mr-3">
                                <Activity size={18} />
                            </div>
                            <span>Activity</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-4 border-t border-gray-200">
                    <div className="flex items-center p-2 text-gray-700 cursor-pointer" onClick={() => handleSidebarItemClick('Help Center')}>
                        <div className="mr-3">
                            <HelpCircle size={18} />
                        </div>
                        <span>Help Center</span>
                    </div>

                    <div className="flex items-center p-2 text-gray-700 cursor-pointer" onClick={() => handleSidebarItemClick('Settings')}>
                        <div className="mr-3">
                            <Settings size={18} />
                        </div>
                        <span>Settings</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>

                        <div className="flex items-center space-x-4">
                            <Bell size={20} className="text-gray-600 cursor-pointer" onClick={() => alert('Notifications!')} />
                            <div className="flex items-center cursor-pointer" onClick={() => alert('Profile settings!')}>
                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                <span className="ml-2 text-sm">Antonio Griceman</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    <div className="flex space-x-4">
                        {/* Left Column */}
                        <div className="w-1/2">
                            <h1 className="text-2xl font-semibold mb-4">Wallet</h1>

                            <div className="flex space-x-2 mb-4">
                                <button onClick={handleLinkBank} className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm">
                                    <Plus size={16} className="mr-1" />
                                    Link Bank
                                </button>
                                <button onClick={handleLinkCard} className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm">
                                    <Plus size={16} className="mr-1" />
                                    Link Card
                                </button>
                            </div>

                            {/* Card List */}
                            <div className="space-y-3">
                                {cards.map(card => (
                                    <div
                                        key={card.id}
                                        onClick={() => setSelectedCard(card.name)}
                                        className={`flex items-center justify-between p-3 bg-white border ${selectedCard === card.name ? 'border-blue-500' : 'border-gray-200'} rounded-md cursor-pointer`}
                                    >
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                checked={selectedCard === card.name}
                                                onChange={() => setSelectedCard(card.name)}
                                                className="mr-3 cursor-pointer"
                                            />
                                            <div>
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">{card.name}</span>
                                                    <span className="ml-2 text-xs text-gray-500">{card.number}</span>
                                                    {card.preferred && (
                                                        <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Preferred</span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500">${card.balance.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="w-12 h-8 bg-blue-500 rounded"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Payment Preferences */}
                            <div className="mt-6 bg-white border border-gray-200 rounded-md p-4">
                                <h2 className="text-lg font-medium mb-2">Payment Preferences</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                    We will use your available balance when you shop online or send payment for goods and services. If you do not have enough funds in your balance, we will ask you to choose another payment method during checkout.
                                </p>
                                <a href="#" className="text-sm text-blue-600" onClick={(e) => { e.preventDefault(); alert('More about payment preferences'); }}>More about payment preferences</a>

                                <div className="mt-4 flex justify-center">
                                    <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center">
                                        <CreditCard size={32} className="text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-1/2">
                            <div className="bg-white border border-gray-200 rounded-md p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium">{activeCard?.name || 'No Card Selected'}</h2>
                                    {activeCard?.preferred && <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Preferred</span>}
                                </div>

                                <div className="text-sm text-gray-600 mb-4">Cards Details</div>

                                <div className="mb-4">
                                    <div className="text-sm text-gray-600">Balance</div>
                                    <div className="flex items-center">
                                        <span className="text-2xl font-bold">${activeCard?.balance.toFixed(2) || '0.00'}</span>
                                        <span className="ml-2 text-xs text-green-500">+ 10%</span> {/* Placeholder percentage */}
                                    </div>
                                </div>

                                {/* Chart */}
                                <div className="h-32 bg-white mb-4 flex items-center justify-center">
                                    <div className="w-full h-16 bg-gray-100 rounded-md relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full h-px bg-blue-500 relative">
                                                <div className="absolute h-1 w-1 bg-blue-500 rounded-full" style={{ left: '10%', top: '-2px' }}></div>
                                                <div className="absolute h-1 w-1 bg-blue-500 rounded-full" style={{ left: '30%', top: '-2px' }}></div>
                                                <div className="absolute h-1 w-1 bg-blue-500 rounded-full" style={{ left: '50%', top: '-2px' }}></div>
                                                <div className="absolute h-1 w-1 bg-blue-500 rounded-full" style={{ left: '70%', top: '-2px' }}></div>
                                                <div className="absolute h-1 w-1 bg-blue-500 rounded-full" style={{ left: '90%', top: '-2px' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs text-gray-500 mb-4">
                                    <span>Mon 21</span>
                                    <span>Tue 22</span>
                                    <span>Wed 23</span>
                                    <span>Thu 24</span>
                                    <span>Fri 25</span>
                                    <span>Sat 26</span>
                                    <span>Sun 27</span>
                                </div>

                                <div className="flex space-x-2 mb-6">
                                    <button onClick={handleTransfer} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">Transfer</button>
                                    <button onClick={handleUpdateCard} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">Update Card</button>
                                    <button onClick={handleChangePreferred} className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm">Change Preferred</button>
                                    <button className="p-2 border border-gray-300 rounded-md cursor-pointer" onClick={() => alert('More actions')}>
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between mb-2">
                                        <div className="text-sm">Account holder</div>
                                        <div className="text-sm font-medium">Malik Pisimbudi Sugiono</div>
                                    </div>

                                    <div className="flex justify-between mb-2">
                                        <div className="text-sm">Bank Name</div>
                                        <div className="text-sm font-medium">{activeCard?.name || 'N/A'}</div>
                                    </div>

                                    <div className="flex justify-between mb-4">
                                        <div className="text-sm">Bank Code</div>
                                        <div className="text-sm font-medium flex items-center">
                                            1246720490838
                                            <button className="ml-1 p-1 rounded-full bg-gray-100 cursor-pointer" onClick={() => alert('Copy Bank Code')}>
                                                <ArrowUpRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="text-sm font-medium mb-4">Recent transaction from this card</div>

                                    {transactions.map(transaction => (
                                        <div key={transaction.id} className="flex justify-between items-center py-2">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 mr-3">
                                                    {transaction.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium">{transaction.name}</div>
                                                    <div className="text-xs text-gray-500">{transaction.date}</div>
                                                </div>
                                            </div>
                                            <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="mt-4">
                                        <button onClick={handleReport} className="w-full py-2 bg-white border border-gray-300 rounded-md text-sm text-center">
                                            Report
                                        </button>
                                    </div>

                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <div className="text-xs text-gray-500">Income</div>
                                            <div className="text-sm font-medium">$98,471.95</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Expenses</div>
                                            <div className="text-sm font-medium">$43,803.14</div>
                                        </div>
                                    </div>

                                    <div className="mt-2 bg-gray-100 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default WalletAdmin;