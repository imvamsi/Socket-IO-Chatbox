// import ReactEmoji from "react-emoji";
// import "./SingleMessage.css";

// function SingleMessage({ message: { text, user }, name }) {
//   console.log("🚀 ~ SingleMessage:", props);

//   const trimmedName = name.trim().toLowerCase();
//   const isSentByCurrentUser = user === trimmedName;

//   return isSentByCurrentUser ? (
//     <div className="message-container justify-end">
//       <p className="sent-text pr-10">{trimmedName}</p>
//       <div className="message-box background-blue">
//         <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
//       </div>
//     </div>
//   ) : (
//     <div className="message-container justify-start">
//       <div className="message-box background-light">
//         <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
//       </div>
//       <p className="sent-text pl-10">{user}</p>
//     </div>
//   );
// }

// export default SingleMessage;

import React from "react";

import "./SingleMessage.css";

import ReactEmoji from "react-emoji";

const SingleMessage = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default SingleMessage;
