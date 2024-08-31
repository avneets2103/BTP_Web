// components/ChatInterface.tsx
import React, { useState } from 'react';
// import 'chatinterface.css';
// import profilePic from '@\public\images\anita-dixit-potrait.png'
import profilePic from '@/public/images/anita-dixit-potrait.png';
import Image from 'next/image';

interface Props {
  name: string | any;
  img: string | any;
}

interface Message {
  text: string;
  sender: 'doctor' | 'user';
}

const ChatInterface = ({name, img}: Props) => {
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
    <div className="">
      <div className="sn-chat-header">
        <Image src={img} alt="Doctor's Profile" className="sn-doctor-profile" width={15} height={15} />
        <span className="sn-doctor-name">{name}</span>
        {/* <button className="sn-close-button  ml-auto mr-4 ">✖</button> */}
      </div>
      <div className="sn-chat-body">
        <p className='sn-convo-start-date m-auto font-bold ' >Today</p>
        {messages.map((message, index) => (
          <div key={index} className={`sn-chat-message sn-${message.sender}-message`}>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="sn-chat-footer flex-col ">
        <div className='sn-text-input w-[100%] p-1 flex flex-row' >
            <input
            type="text"
            placeholder="Type a message..."
            className="sn-chat-input w-[94%] text-black "
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button className="sn-send-button w-10 " onClick={handleSendMessage}>
            ➤
            </button>
        </div>
        <div className='sn-functionality-buttons self-end p-1 px-5 mt-4' >
            <button className="sn-action-button sn-remove-doctor">Remove Doctor</button>
            <button className="sn-action-button sn-book-appointment">Book appointment</button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
