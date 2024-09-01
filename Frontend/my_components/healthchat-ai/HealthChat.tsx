// components/HealthChat.tsx
import React, { useEffect, useRef, useState } from 'react';
// import 'HealthChat.css';
// import {profilePic} from 'Frontend\public\images\anita-dixit-potrait.png'

interface Message {
  text: string;
  sender: 'doctor' | 'user';
}

const HealthChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {text: 'Hey, how are you?', sender:'doctor'},
    {text: 'I am feeling a pain near my stomach', sender:'user'},
    {text: 'Is the pain sharp or dispersed? ', sender:'doctor'},
    {text:'Also tell, what region exactly around the stomach ? ', sender:'doctor'},
    {text: 'Its disprered pain, near the navel', sender:'user'},
    {text: 'Did you take the prescribed antacid by Dr. House in the last visit? ', sender:'doctor'},
    {text: 'Noo... I forgot!', sender:'user'},
    {text: "Okay, No problem. when you take that, you won't feel any pain near your stomach :) " , sender: 'doctor'},
    
  ]);

  // Create a reference for the chat body div
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { text: input.trim(), sender: 'user' };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]); // Runs whenever messages change

  return (
    <div className="sn-chat-container max-h-[80vh] flex flex-col">
      <p className='sn-convo-start-date font-medium flex items-center justify-center my-3' >HealthChat AI Powered</p>
      <div ref={chatBodyRef} className="sn-chat-body max-h-[60vh] overflow-y-scroll">
        {messages.map((message, index) => (
          <div key={index} className={`sn-chat-message sn-${message.sender}-message`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="sn-chat-footer flex-col ">
        <div className='sn-text-input w-[100%] p-1 ' >
            <input
            type="text"
            placeholder="Type a message..."
            className="sn-chat-input w-[94%] text-black "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            />
            <button className="sn-send-button w-10 " onClick={handleSendMessage}>
            ➤
            </button>
        </div>
        <div className='sn-functionality-buttons self-end p-1 px-5 ' >
            <button className="sn-action-button sn-remove-doctor">Call Ambulance</button>
            <button className="sn-action-button sn-book-appointment">Book appointment</button>
        </div>
      </div>
    </div>
  );
};

export default HealthChat;
