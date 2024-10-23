import onlineIcon from "../../icons/onlineIcon.png";
import "./TextContainer.css";

function TextContainer({ users }) {
  return (
    <>
      {users ? (
        <div>
          <p>People currently in the same room as yours</p>
          {users.map((user, index) => (
            <div key={index} className="active-item">
              <img
                src={onlineIcon}
                style={{ marginRight: "1rem", marginLeft: "1rem" }}
              />
              {user.name}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default TextContainer;
