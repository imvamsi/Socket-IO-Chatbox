import ReactEmoji from "react-emoji";
import "./SingleMessage.css";

function SingleMessage({ message: { text, user } }, name) {
  let isSentByCurrentUser = false;

  const name = name.trim().toLowerCase();
  if (user === name) isSentByCurrentUser = true;

  return isSentByCurrentUser ? (
    <div className="message-container justify-end">
      <p className="sent-text pr-10">{name}</p>
      <div className="message-box background-blue">
        <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="message-container justify-start">
      <div className="message-box background-light">
        <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sent-text pl-10"></p>
    </div>
  );
}

export default SingleMessage;
