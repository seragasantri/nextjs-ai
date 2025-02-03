import React, { Dispatch, SetStateAction } from 'react';

type ChatSectionProps = {
  title: string;
  chats: string[];
  activeChat: string | null; // Allow null as a valid value
  setActiveChat: Dispatch<SetStateAction<string | null>>; // setActiveChat should also accept string | null
};

const ChatSection: React.FC<ChatSectionProps> = ({ title, chats, activeChat, setActiveChat }) => {
  return (
    <div>
      <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
      {chats.map((chat, index) => (
        <div
          key={index}
          className={`p-2 px-3 rounded-md text-sm cursor-pointer transition my-2 ${
            activeChat === chat ? 'bg-blue-600' : 'hover:bg-gray-700'
          }`}
          onClick={() => setActiveChat(chat)} // Setting active chat to a string
        >
          {chat}
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
