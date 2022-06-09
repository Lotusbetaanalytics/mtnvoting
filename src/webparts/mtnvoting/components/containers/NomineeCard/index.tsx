import { Tooltip } from "@material-ui/core";
import * as React from "react";
import { BsCheck, BsFileEarmarkCheck } from "react-icons/bs";
import swal from "sweetalert";
import "./nomineecard.scss";

const NomineeCard = ({
  checked,
  image,
  name,
  lastName,
  onClick,
  disabled,
  setTest,
  test,
  index,
  voteCount,
  selectedNominees,
  setSelectedNominees,
  id,
}) => {
  const [change, setChange] = React.useState(test[index].checked);
  const [reachedMax, setReachedMax] = React.useState(false);
  const voteNow = () => {
    onClick();
    setChange(!change);

    if (change) {
      setSelectedNominees((prev) => {
        return prev.filter((item) => item !== id);
      });
      setTest((prev) => {
        prev[index].checked = false;
        return prev;
      });
    } else {
      selectedNominees.push(id);
      setTest((prev) => {
        prev[index].checked = true;
        return prev;
      });
    }
  };

  React.useEffect(() => {
    if (selectedNominees.length >= voteCount) {
      swal("", `You can only select ${voteCount} Nominees`, "error");
    }
  }, [selectedNominees.length]);

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
          {change ? (
            <div className="btnSelected" onClick={voteNow}>
              <span>Selected</span>
              <BsCheck />
            </div>
          ) : disabled ? (
            <div className="btnDisabled">Select</div>
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
