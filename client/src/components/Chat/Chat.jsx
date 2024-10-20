import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";

function Chat() {
  const location = useLocation();
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
  });

  return <h1>Chat</h1>;
}

export default Chat;
