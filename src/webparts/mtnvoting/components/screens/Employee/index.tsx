import * as React from "react";
import { Input, Select, Modal, Spinner } from "../../containers";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
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

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();

    sp.web.lists
      .getByTitle(`Constituency`)
      .items.filter(`Region eq '${region}' and Location eq '${location}'`)
      .get()
      .then((item) => {
        const maxVoters = item[0].NomineeCount;
        sp.web.lists
          .getByTitle(`Registration`)
          .items.filter(`Region eq '${region}' and Location eq '${location}'`)
          .get()
          .then((res) => {
            if (res.length <= maxVoters) {
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
            } else {
              setLoading(false);
              swal("Warning!", "Max Voters Reached", "error");
              return;
            }
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
    history.push("/registration");
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
        <div className={styles.employee__image}>
          <img src={require("../../assets/logo.png")} alt="logo" />
        </div>
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
            <div className={styles.btnContainer}>
              <button
                type="button"
                className={styles.btnCancel}
                onClick={modalHandler}
              >
                Cancel
              </button>
              <Modal
                isVisible={open}
                title="Are you sure you want to Cancel"
                size="md"
                content={
                  <div className={styles.modal__Btn}>
                    <button
                      type="button"
                      className={styles.btnCancel1}
                      onClick={prevHandler}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className={styles.btnCancel2}
                      onClick={cancelHandler}
                    >
                      Yes
                    </button>
                  </div>
                }
                onClose={() => setOpen(false)}
                footer=""
              />
              <button
                type="submit"
                className={styles.btnSubmit}
                // onClick={approveHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeRegistration;
