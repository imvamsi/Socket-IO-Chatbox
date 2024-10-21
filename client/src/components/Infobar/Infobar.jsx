import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

import "./Infobar.css";

function Infobar({ room }) {
  return (
    <div className="infobar">
      <div className="left-inner-container">
        <img src={onlineIcon} className="online-icon" />
        <h3>{room}</h3>
      </div>
      <div className="right-inner-container">
        <a href="/">
          <img src={closeIcon} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Infobar;
