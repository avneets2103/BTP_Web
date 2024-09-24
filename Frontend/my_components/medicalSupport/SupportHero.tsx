import React, { useEffect, useRef, useState } from "react";
import { Message } from "@/Interfaces";
import { Button } from "@nextui-org/react";

/**
 * The SupportHero component is a self-contained component that displays a chat interface with the user and the AI.
 * It handles user input, sending messages, and displaying the conversation.
 *
 * @returns {JSX.Element} The SupportHero component.
 */
function SupportHero() {
  /**
   * The conversation state is an array of messages.
   * Each message is an object with a text and a sender.
   */
  const [conversation, setConversation] = useState<Message[]>([
    { text: "Hey, how are you?", sender: "not_user" },
    { text: "I am feeling a pain near my stomach", sender: "user" },
    { text: "Is the pain sharp or dispersed? ", sender: "not_user" },
    {
      text: "Also tell, what region exactly around the stomach ? ",
      sender: "not_user",
    },
    { text: "Its disprered pain, near the navel", sender: "user" },
    {
      text: "Did you take the prescribed antacid by Dr. House in the last visit? ",
      sender: "not_user",
    },
    { text: "Noo... I forgot!", sender: "user" },
    {
      text: "Okay, No problem. when you take that, you won't feel any pain near your stomach :) ",
      sender: "not_user",
    },
  ]);

  /**
   * The chatBodyRef is a reference to the chat body element.
   * It is used to scroll the chat body to the bottom when a new message is added.
   */
  const chatBodyRef = useRef<HTMLDivElement>(null);

  /**
   * The inputText state is the text that the user has typed in the input field.
   */
  const [inputText, setInputText] = useState<string>("");

  /**
   * The handleSendMessage function is called when the user clicks the send button or presses enter.
   * It adds a new message to the conversation state and scrolls the chat body to the bottom.
   */
  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage: Message = { text: inputText.trim(), sender: "user" };
    setConversation([...conversation, newMessage]);
    setInputText("");
  };

  /**
   * The handleEnter function is called when the user presses enter.
   * It calls the handleSendMessage function.
   */
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  /**
   * The useEffect hook is used to scroll the chat body to the bottom when a new message is added.
   */
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="flex max-h-[80vh] flex-col bg-color1">
      <p className="my-3 flex items-center justify-center font-medium">
        AI Powered HealthChat
      </p>
      <div
        ref={chatBodyRef}
        className="flex max-h-[60vh] flex-col overflow-y-scroll p-[15px] text-textColorDark"
      >
        {conversation.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "user"
                ? "mb-[10px] flex self-end rounded-[10px] bg-color2 p-[10px] max-w-[70%]"
                : "bg-lowContrastColor mb-[10px] flex self-start rounded-[10px] p-[10px] max-w-[70%]"
            }
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center p-[10px] pr-0">
        <div className="w-[100%] p-1">
          <input
            type="text"
            placeholder="Type a message..."
            className="bg-lowContrastColor @onFocus:border-primaryColor mr-[10px] w-[94%] rounded-[20px] border-[1px] border-[#ccc] p-[10px] text-black text-textColorDark"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button
            className="sn-send-button h-10 w-10"
            onClick={handleSendMessage}
          >
            ➤
          </button>
        </div>
        <div className="flex gap-2 self-end p-2 px-5">
          <Button className="bg-primaryColor text-[whitesmoke]">
            Call Ambulance
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SupportHero;
