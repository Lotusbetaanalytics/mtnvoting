import * as React from "react";
import { Header, Modal, NomineeCard } from "../../../containers";
import { sp } from "@pnp/sp";
import styles from "./voting.module.scss";
import Carousel from "react-elastic-carousel";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

const Voting = () => {
  const [nominees, setNominees] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [indexFrom, setIndexFrom] = React.useState(0);
  const [indexTo, setIndexTo] = React.useState(4);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const [userEmail, setUserEmail] = React.useState();
  const [userID, setUserID] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [region, setRegion] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [test, setTest] = React.useState([]);
  const [index, setIndex] = React.useState(null);
  const [name, setName] = React.useState("");
  const [constituency, setConstituency] = React.useState("");
  const [cannotVote, setCannotVote] = React.useState(true);
  const [checking, setChecking] = React.useState(false);
  const [voteCount, setVoteCount] = React.useState(0);
  const [selectedNominees, setSelectedNominees] = React.useState([]);
  const [numberOfTimesVoted, setNumberOfTimesVoted] = React.useState(0);
  const [message, setMessage] = React.useState("");

  const history = useHistory();

  //Get all Nominees
  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`Nominees`)
      .items.filter(`Status eq 'Approved'`)
      .get()
      .then((res) => {
        // setNominees(res);
        setNominees(res.filter((item) => item.Region === region));
        setLoading(false);
      });
  }, [region]);

  //find the logged in user and check if the user already voted
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((res) => {
      setUserEmail(res.Email);
      sp.web.lists
        .getByTitle("Registration")
        .items.filter(`EmployeeEmail eq '${res.Email}'`)
        .get()
        .then((items) => {
          if (items.length > 0) {
            setUserID(items[0].ID);
            setRegion(items[0].Region);
            setConstituency(items[0].Constituency);
            sp.web.lists
              .getByTitle(`Votes`)
              .items.filter(`EmployeeID eq '${items[0].ID}' `)
              .get()
              .then((data) => {
                if (data.length > 0) {
                  swal({
                    title: "Error",
                    text: "You already voted!",
                    icon: "error",
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                  }).then((ok) => {
                    if (ok) {
                      history.push("/");
                    }
                  });
                }
              });
          } else {
            swal({
              title: "",
              text: "You are not registered for this voting exercise",
              icon: "error",
              closeOnClickOutside: false,
              closeOnEsc: false,
            }).then((ok) => {
              if (ok) {
                history.push("/");
              }
            });
          }
        });
    });
  }, []);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("Constituency")
      .items.filter(`Title eq '${constituency}'`)
      .get()
      .then((res) => {
        if (res.length > 0) {
          setVoteCount(res[0].NomineeCount);
          const today = new Date(Date.now()).toLocaleDateString();
          const votingDate = new Date(res[0].Date).toLocaleDateString();

          if (today === votingDate) {
            setChecking(false);
            setCannotVote(false);
          }

          // today === votingDate && setCannotVote(false);
        }
      })
      .catch((err) => {});
  }, [constituency]);

  React.useEffect(() => {
    //create a value for each item in the list
    for (let i = 0; i < nominees.length; i++) {
      test.push({ [i]: nominees[i].ID, checked: false, disabled: false });
    }
  }, [nominees]);

  const votedNominee = (id, index, name) => {
    setName(name);
    setId(id);
  };

  const yesHandler = () => {
    setSubmitting(true);
    for (let i = 0; i < selectedNominees.length; i++) {
      sp.web.lists
        .getByTitle(`Votes`)
        .items.add({
          EmployeeID: String(userID),
          Nominee: String(selectedNominees[i]),
        })
        .then((res) => {
          setSubmitting(false);
          setOpen(false);
          swal({
            title: "",
            text: "Your vote has been submitted!",
            icon: "success",
            // buttons: ["Ok"],
          }).then((ok) => {
            if (ok) {
              history.push("/");
            }
          });
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
        });
    }
  };

  const noHandler = () => {
    setOpen(false);
  };

  const votePermissions = () => {
    return (
      <div className={styles.modalContent}>
        <span>Are you sure you want to vote for the selected candidates?</span>
        <div className={styles.modalContentButton}>
          <button disabled={submitting} onClick={noHandler}>
            No
          </button>
          {submitting ? (
            <button disabled>Adding...</button>
          ) : (
            <button onClick={yesHandler}>Yes</button>
          )}
        </div>
      </div>
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4, itemsToScroll: 4 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <>
      <div className={styles.votingPageContainer}>
        <Header title="Nominees" />
        {cannotVote &&
          (checking ? (
            <div className={styles.votingPrompt}>
              You cannot vote yet because the voting exercise is yet to commence
              or has ended.
            </div>
          ) : (
            <div></div>
          ))}
        <div className={styles.nomineeContainerScreen}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <Carousel
                breakPoints={breakPoints}
                isRTL={false}
                initialActiveIndex={0}
                pagination={false}
                className={styles.carousel}
              >
                {nominees.map((nominee, index) => {
                  return (
                    <>
                      <NomineeCard
                        checked={test.length > 0 && test[index]["checked"]}
                        image={nominee.PassportPhotograph}
                        name={nominee.EmployeeName}
                        lastName={nominee.lastName}
                        EmployeeID={userID}
                        disabled={
                          (test.length > 0 && test[index]["disabled"]) ||
                          selectedNominees.length >= voteCount ||
                          cannotVote
                        }
                        onClick={() => {
                          votedNominee(nominee.ID, index, nominee.EmployeeName);
                        }}
                        setTest={setTest}
                        test={test}
                        index={index}
                        voteCount={voteCount}
                        selectedNominees={selectedNominees}
                        setSelectedNominees={setSelectedNominees}
                        id={nominee.ID}
                      />
                    </div>
                  );
                })}
              </Carousel>
              {nominees.length === 0 && <div>No nominees</div>}
            </div>
          )}
        </div>
        <div className={styles.backButtonContainer}>
          <button
            className={styles.backButton}
            onClick={() => {
              history.push("/");
            }}
          >
            Go Back
          </button>
          <button
            className={styles.backButton}
            disabled={
              cannotVote ||
              selectedNominees.length === 0 ||
              !voteCount ||
              selectedNominees.length > voteCount
            }
            onClick={() => {
              setOpen(true);
            }}
          >
            Submit
          </button>
        </div>
        <Modal
          content={votePermissions()}
          onClose={handleClose}
          isVisible={open}
          size="sm"
          footer=""
          title=""
        />
      </div>
    </>
  );
};

export default Voting;
