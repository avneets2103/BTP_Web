// components/ChatInterface.tsx
import React, { useState } from 'react';

interface Message {
  text: string;
  sender: 'doctor' | 'user';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Good afternoon, Naren', sender: 'doctor' },
    { text: 'I wanted to know if you are allergic to paracetamol?', sender: 'doctor' },
    { text: 'It can be causing your rashes', sender: 'doctor' },
    { text: 'If yes, then replace it with Advil', sender: 'doctor' },
  ]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { text: input.trim(), sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        {/* <img src="/doctor-profile.png" alt="Doctor's Profile" className="doctor-profile" /> */}
        <span className="doctor-name">Dr. Anita Dixit</span>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}-message`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          ➤
        </button>
        <button className="action-button remove-doctor">Remove Doctor</button>
        <button className="action-button book-appointment">Book appointment</button>
      </div>
    </div>
  );
};

export default ChatInterface;
