import "./Input.css";

function Input({ message, setmessage, sendMessage }) {
  return (
    <form action="" className="form">
      <input
        type="text"
        className="input"
        placeholder="Type your message!"
        value={message}
        onChange={({ target: { value } }) => setmessage(value)}
        onKeyDown={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="send-button" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
}

export default Input;
