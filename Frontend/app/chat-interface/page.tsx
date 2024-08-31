"use client";
import ChatInterface from "@/my_components/chat-interface/ChatInterface";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    // Router.push("/notification");
  })
  return (
    <>
    <ChatInterface></ChatInterface>
    </>
  );
}
