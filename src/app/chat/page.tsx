"use client"
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './sidebar/Page';
import { BiUser } from 'react-icons/bi';
import { CgArrowUpO } from 'react-icons/cg';

// Define interfaces for our types
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface ApiResponse {
    choices: Array<{
        message?: {
            content: string;
        };
    }>;
}

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            role: 'user',
            content: inputMessage
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: inputMessage }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: ApiResponse = await response.json();
            const assistantMessage: Message = {
                role: 'assistant',
                content: data.choices[0]?.message?.content || "Sorry, I couldn't process that."
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, there was an error processing your message.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex'>
            <Sidebar />
            <div className="bg-contentColor w-full flex flex-col h-screen">
                <div className="flex justify-end w-full py-2 px-4">
                    <div className="bg-blue-500 flex justify-center items-center w-10 h-10 rounded-full">
                        <BiUser />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`${
                                message.role === 'user' 
                                    ? 'ml-auto text-right bg-blue-500' 
                                    : 'bg-slate-500'
                            } w-fit max-w-[75%] rounded-md p-4 my-2`}
                        >
                            <h4 className="text-yellow-500 font-bold">
                                {message.role === 'user' ? 'User' : 'Assistant'}
                            </h4>
                            <p className="text-white">{message.content}</p>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-slate-500 w-fit rounded-md p-4 my-2">
                            <p className="text-white">Typing...</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form 
                    onSubmit={handleSubmit}
                    className="p-4 flex justify-center"
                >
                    <div className="relative w-2/4 flex items-center bg-inputColor rounded-2xl px-4">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Tanya apa ..."
                            className="w-full bg-transparent text-white p-4 rounded-2xl outline-none placeholder-gray-400"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 transition duration-300 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <CgArrowUpO size={25} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}