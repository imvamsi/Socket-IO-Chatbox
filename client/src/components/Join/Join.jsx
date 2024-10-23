import { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h1 className="heading">Join the Chatroom🎃</h1>
        <div>
          <input
            type="text"
            placeholder="Enter your Name"
            className="join-input"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Room"
            className="join-input mt-20"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room) ?? e.preventDefault()}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Sign in
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Join;
