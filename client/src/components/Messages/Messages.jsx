/* eslint-disable react/prop-types */
import ScrollToBottom from "react-scroll-to-bottom";
import SingleMessage from "../Messages/SingleMessage/SingleMessage";
import "./Messages.css";

function Messages({ messages, name }) {
  console.log("🚀 ~ Messages ~ messages:", messages);
  return (
    <ScrollToBottom className="messages">
      <>
        {messages.map((message, i) => {
          return <SingleMessage key={i} message={message} name={name} />;
        })}
      </>
    </ScrollToBottom>
  );
}

export default Messages;
