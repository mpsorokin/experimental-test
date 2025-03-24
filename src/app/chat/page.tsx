"use client"

import React, { useState } from 'react';
import { ArrowLeft, Video, Phone, Send, Smile, Camera } from 'lucide-react';

interface Message {
    id: number;
    text: string;
    time: string;
    isOutgoing: boolean;
    imageUrl?: string;
    linkUrl?: string;
    linkText?: string;
    read?: boolean;
}

const Chat: React.FC = () => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Hi, Jimmy! Any update today?',
            time: '09:32 PM',
            isOutgoing: false,
        },
        {
            id: 2,
            text: 'All good! we have some update',
            time: '09:34 PM',
            isOutgoing: true,
            read: true
        },
        {
            id: 3,
            text: 'Here\'s the new landing page design!',
            time: '09:34 PM',
            isOutgoing: true,
            imageUrl: '/api/placeholder/400/320',
            linkUrl: 'https://www.figma.com/file/EQJuT...',
            linkText: 'https://www.figma.com/file/EQJuT...',
            read: true
        },
        {
            id: 4,
            text: 'Cool! I have some feedbacks on the "How it work" section. but overall looks good now! 👍',
            time: '10:15 PM',
            isOutgoing: false,
        },
        {
            id: 5,
            text: 'Perfect! Will check it 👍',
            time: '09:34 PM',
            isOutgoing: true,
            read: true
        },
    ]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const newMsg: Message = {
                id: messages.length + 1,
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOutgoing: true,
                read: false
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100 shadow-lg">
            {/* Header */}
            <header className="px-4 py-3 bg-white flex items-center shadow-sm">
                <button className="mr-2">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex items-center flex-1">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="font-medium text-base">Sebastian Rudiger</h2>
                        <p className="text-sm text-green-500">Online</p>
                    </div>
                </div>
                <div className="flex">
                    <button className="ml-2">
                        <Video size={20} />
                    </button>
                    <button className="ml-4">
                        <Phone size={20} />
                    </button>
                </div>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-white">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`mb-4 flex ${message.isOutgoing ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                                message.isOutgoing
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-black'
                            }`}
                        >
                            {message.text}

                            {message.imageUrl && (
                                <div className="mt-2 rounded-lg overflow-hidden">
                                    <img src={message.imageUrl} alt="Shared content" className="w-full" />
                                </div>
                            )}

                            {message.linkUrl && (
                                <div className="mt-1 text-sm underline">
                                    <a href={message.linkUrl} target="_blank" rel="noopener noreferrer">
                                        {message.linkText}
                                    </a>
                                </div>
                            )}

                            <div className="text-xs mt-1 flex justify-end items-center">
                                {message.time}
                                {message.isOutgoing && message.read && (
                                    <span className="ml-1 text-xs">✓✓</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-2 bg-white border-t flex items-center">
                <button type="button" className="p-2">
                    <Smile size={24} color="#888" />
                </button>
                <input
                    type="text"
                    placeholder="Type here..."
                    className="flex-1 p-2 border-0 focus:outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="button" className="p-2">
                    <Camera size={24} color="#888" />
                </button>
                <button type="submit" className="p-2">
                    <Send size={24} color="#888" />
                </button>
            </form>
        </div>
    );
};

export default Chat;
