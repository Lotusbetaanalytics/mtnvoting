import { Tooltip } from "@material-ui/core";
import * as React from "react";
import "./nomineecard.scss";

const NomineeCard = ({ checked, image, name, lastName, onClick, disabled }) => {
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
            <Tooltip title="You already voted">
              <div className="btnSelected">Selected</div>
            </Tooltip>
          ) : disabled ? (
            <Tooltip title="You already voted">
              <div className="btnDisabled">Select</div>
            </Tooltip>
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
