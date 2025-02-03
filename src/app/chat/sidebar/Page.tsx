"use client"
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { TbSquareToggle } from "react-icons/tb";
import ChatSection from "../ChatSection";

export default function Sidebar() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  return (
    <div className="md:w-64 lg:w-80 hidden md:flex flex-col h-screen bg-gray-900 text-white border-r border-gray-700">
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <TbSquareToggle size={25} className="text-gray-400 cursor-pointer" />
        <FiEdit size={25} className="text-gray-400 cursor-pointer hover:text-gray-300" />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <ChatSection
          title="Hari Ini"
          chats={["Belajar React.js", "Mengerjakan tugas"]}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatSection
          title="7 Hari Sebelumnya"
          chats={["Review Redux", "Membuat UI"]}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatSection
          title="30 Hari Sebelumnya"
          chats={[
            "Membaca dokumentasi",
            "Belajar API",
            "Membaca dokumentasi",
            "Belajar API",
          ]}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
      </div>
    </div>
  );
}
