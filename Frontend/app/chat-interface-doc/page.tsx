"use client";
import ChatInterfaceDoc from "@/my_components/chat-interface-doc/ChatInterfaceDoc";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
  })
  return (
    <>
    <ChatInterfaceDoc></ChatInterfaceDoc>
    </>
  );
}
