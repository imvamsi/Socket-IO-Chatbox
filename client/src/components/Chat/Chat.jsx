import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { io } from "socket.io-client";
import "./Chat.css";

let socket;

function Chat() {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const location = useLocation();
  const ENDPOINT = "http://localhost:4000";
  socket = io(ENDPOINT);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setname(name);
    setroom(room);

    socket.emit("join", { name, room });
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
}

export default Chat;
