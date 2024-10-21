import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { io } from "socket.io-client";
import "./Chat.css";
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input";

let socket;

function Chat() {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const location = useLocation();
  const ENDPOINT = "http://localhost:4000";

  useEffect(() => {
    socket = io(ENDPOINT);
    const { name, room } = queryString.parse(location.search);
    setname(name);
    setroom(room);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setmessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (message)
      socket.emit("sendMessage", message, () => {
        setmessage("");
      });
  }

  console.log("m", message);
  console.log("ms", messages);
  return (
    <div className="outer-container">
      <div className="container">
        <Infobar room={room} />

        <Input
          message={message}
          setmessage={setmessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
