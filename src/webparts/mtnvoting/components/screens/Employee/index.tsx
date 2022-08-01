import * as React from "react";
import { Input, Select, Modal, Spinner } from "../../containers";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "./styles.module.scss";

const EmployeeRegistration = ({ history }) => {
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [regions, setRegions] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  // const [title, setTitle] = React.useState("");
  const [constituency, setConstituency] = React.useState("");
  const [constituencies, setConstituencies] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const [cancel, setCancel] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSubmitModal, setOPenSubmitModal] = React.useState(false);

  const approveHandler = () => {
    setOPenSubmitModal(true);
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();

    sp.web.lists
      .getByTitle(`Constituency`)
      .items.filter(`Region eq '${region}' and Location eq '${location}'`)
      .get()
      .then((item) => {
        // const maxVoters = item[0].NomineeCount;
        sp.web.lists
          .getByTitle(`Registration`)
          .items.filter(`Region eq '${region}' and Location eq '${location}'`)
          .get()
          .then((res) => {
            // if (res.length <= maxVoters) {
            sp.web.lists
              .getByTitle("Registration")
              .items.add({
                EmployeeName: employeeName,
                EmployeeEmail: employeeEmail,
                Region: region,
                Location: location,
                Constituency: constituency,
              })
              .then((res) => {
                setLoading(false);
                swal({
                  title: "Success",
                  text: "You have successfully registered!",
                  icon: "success",
                }).then((ok) => {
                  if (ok) {
                    history.push("/vote");
                  }
                });
              })
              .catch((err) => {
                setLoading(false);
                swal(
                  "Error",
                  "An error occurred while registering! Try again",
                  "error"
                );
                console.log(err);
              });
            // } else {
            //   setLoading(false);
            //   swal("Warning!", "Max Voters Reached", "error");
            //   return;
            // }
          });
      });
  };

  // const approveHandler = () => {
  //   setOpen(true);
  // };

  const modalHandler = () => {
    setOpen(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setEmployeeName("");
    setEmployeeEmail("");
    setRegion("");
    setLocation("");
    setConstituency("");
    setOpen(false);
  };

  const prevHandler = () => {
    history.push("/");
    setOpen(false);
  };

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeName(response.DisplayName);
      setEmployeeEmail(response.Email);
      sp.web.lists
        .getByTitle(`Region`)
        .items.get()
        .then((resp) => {
          setRegions(resp);
        });
      sp.web.lists
        .getByTitle(`Constituency`)
        .items.get()
        .then((res) => {
          setConstituencies(res);
        });
      sp.web.lists
        .getByTitle(`Registration`)
        .items.filter(`EmployeeEmail eq '${response.Email}'`)
        .get()
        .then((res) => {
          if (res.length > 0) {
            // history.push("/vote")
          }
        });
    });
  }, [history]);

  const regionHandler = (e) => {
    setRegion(e.target.value);
    sp.web.lists
      .getByTitle(`Location`)
      .items.filter(`Region eq '${e.target.value}'`)
      .get()
      .then((res) => {
        setLocations(res);
      });
  };

  const locationHandler = (e) => {
    setLocation(e.target.value);
    // sp.web.lists
    //   .getByTitle(`Constituency`)
    //   .items.filter(`Location eq '${e.target.value}'`)
    //   .get()
    //   .then((res) => {
    //     setConstituencies(res);
    //   });
  };

  return (
    <div className={styles.employee__Container}>
      <div className={styles.employee__Header}>
        <div className={styles.employee__Title}>
          <h1>Pre Voting Form</h1>
        </div>
        <div className={styles.employee__Title}>
          <h3 onClick={prevHandler}>Go Back</h3>
        </div>
        {/* <div className={styles.employee__image}>
          <img src={require("../../assets/logo.png")} alt="logo" />
        </div> */}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.employee__FormContainer}>
          <form onSubmit={submitHandler}>
            <div className={styles.employee__Form}>
              <Input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                title="Employee Name"
                required={true}
                readOnly={false}
                size="mtn_child"
              />
              <Input
                type="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                title="Employee Email"
                required={true}
                readOnly={false}
                size="mtn_child"
              />

              <Select
                value={constituency}
                onChange={(e) => setConstituency(e.target.value)}
                required={true}
                title="Constituency"
                options={constituencies}
                size="mtn_child"
                filter={true}
                filterOption="Title"
              />

              <Select
                onChange={regionHandler}
                value={region}
                required={true}
                title="Region"
                options={regions}
                size="mtn_child"
                filter={true}
                filterOption="Title"
              />
              <Select
                value={location}
                onChange={locationHandler}
                required={true}
                title="Location"
                options={locations}
                size="mtn_child"
                filter={true}
                filterOption="Title"
              />
            </div>
            </form>
            <div className={styles.btnContainer}>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={modalHandler}
              >
                Cancel
              </button>
              <button className={styles.btnSubmit} onClick={approveHandler}>
                Submit
              </button>
              <Modal
                isVisible={openSubmitModal}
                title="Terms and Condition"
                size="md"
                content={
                  <div className="terms">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div>
                        <h5>MTN NIGERIA COMMUNICATIONS PLC</h5>
                        <h5>
                          ELECTION GUIDELINES FOR THE 2020 BIENNIAL EMPLOYEE
                          COUNCIL ELECTION
                        </h5>
                        <h5>Introduction</h5>
                        <p>
                          In line with the provisions of the MTNN Employee
                          Council Constitution, election into the MTNN Employee
                          Council holds once in two (2) years. The last election
                          took place in October 2018 and based on the
                          constitution, the next election is planned to hold in
                          October 2020. As we prepare for another Employee
                          Council election scheduled to hold in October 30 2020,
                          find below the proposed plan for the forthcoming
                          elections, including general eligibility criteria for
                          contesting elective office etc.
                        </p>
                        <h5>Eligibility Criteria</h5>
                        <p>
                          <b>
                          Candidates that will contest for available seats in
                          each business region / location will be required to
                          meet the following criteria:
                          </b>
                          
                        </p>
                        <ol>
                          <li>
                            Only confirmed national staff on job levels 1 & 2
                            are eligible to contest for seats on the Employee
                            Council.
                          </li>
                          <li>
                            ALL permanent national employees levels (both
                            confirmed and unconfirmed) on levels 1 & 2 are
                            eligible to vote.
                          </li>
                          <li>
                            Employees who have an active disciplinary sanction
                            are not eligible to contest.
                          </li>
                          <li>
                            Incumbent representatives who have served two
                            consecutive terms (i.e. 4 years) are not eligible to
                            contest.
                          </li>
                          <li>
                            Incumbent representatives who have served only one
                            term (i.e. 2 years) are eligible to contest.
                          </li>
                          <li>
                            Incumbent representatives who have served only one
                            term (i.e. 2 years) are eligible to contest.
                          </li>
                          <li>
                            Staff can only contest for allocated seats within
                            their region/location.
                          </li>
                        </ol>
                        <p>
                          <b>
                          Nomination and Election
                          </b>
                          </p>
                        <ol>
                          <li>
                            Election shall be through secret ballot
                            (electronically), and will be coordinated by the
                            Employee Relations Team with the Fraud Management
                            unit.
                          </li>
                          <li>
                            Nominations shall be made for each of the allocated
                            seats in each region. There is a nomination form to
                            be filled by interested eligible employees
                          </li>
                          <li>
                            At the close of nominations, votes shall be cast and
                            the candidates that obtain a simple majority shall
                            be declared elected.
                          </li>
                          <li>
                            Where there is a tie, a run-off election shall be
                            conducted to determine the winner.
                          </li>
                        </ol>
                        <form onSubmit={submitHandler}>
                          <Input
                            title="I agree to terms and conditions"
                            value={employeeEmail}
                            onChange={(e) => setEmployeeEmail(e.target.value)}
                            type="checkbox"
                            required={true}
                          />
                          <div className="btnContainer">
                            <button
                              type="submit"
                              className="mtn__btn mtn__yellow"
                            >
                              Proceed
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                }
                onClose={() => setOPenSubmitModal(false)}
                footer=""
              />
              <Modal
                isVisible={open}
                title="Are you sure you want to Cancel"
                size="md"
                content={
                  <div className={styles.modal__Btn}>
                    <button
                      type="button"
                      className={styles.btnCancel1}
                      onClick={cancelHandler}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className={styles.btnCancel2}
                      onClick={prevHandler}
                    >
                      Yes
                    </button>
                  </div>
                }
                onClose={() => setOpen(false)}
                footer=""
              />
              
            </div>
          
         
        </div>
      )}
    </div>
  );
};

export default EmployeeRegistration;
