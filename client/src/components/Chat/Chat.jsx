import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { io } from "socket.io-client";
import "./Chat.css";
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

let socket;

function Chat() {
  const [name, setname] = useState("");
  const [room, setroom] = useState("");
  const [message, setmessage] = useState("");
  const [users, setusers] = useState("");

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

    socket.on("roomData", ({ users, room }) => {
      setusers(users);
    });

    return () => {
      socket.off("message");
      socket.off("roomData");
    };
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    if (message)
      socket.emit("sendMessage", message, () => {
        setmessage("");
      });
  }

  return (
    <div className="outer-container">
      <div className="container">
        <Infobar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setmessage={setmessage}
          sendMessage={sendMessage}
        />
        <TextContainer users={users} />
      </div>
    </div>
  );
}

export default Chat;
