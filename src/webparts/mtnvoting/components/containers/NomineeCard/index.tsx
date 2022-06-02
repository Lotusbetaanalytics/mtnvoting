import * as React from "react";
import "./nomineecard.scss";

const NomineeCard = ({ checked, image, name, lastName, onClick }) => {
  const voteNow = () => {
    onClick();
  };

  return (
    <div className="nomineeCardContainer">
      <div className="cardImage">
        <img src={image} alt="nominee" />
      </div>
      <div className="cardContent">
        <div className="cardContentText">
          <p>{lastName}</p>
          <h1>{name}</h1>
        </div>
        <div className="cardContentButton">
          {checked ? (
            <div className="btnSelected">
              <span>Selected</span>
            </div>
          ) : (
            <div className="btnUnSelected" onClick={voteNow}>
              Select
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NomineeCard;
