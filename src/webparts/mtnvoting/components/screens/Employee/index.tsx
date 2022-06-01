import * as React from "react";
import { Input, Select, Modal, Spinner } from "../../containers";
import { sp } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import swal from "sweetalert";
import styles from "./styles.module.scss";

const EmployeeRegistration = ({ history }) => {
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [region, setRegion] = React.useState();
  const [regions, setRegions] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [cancel, setCancel] = React.useState(false);
  // const [open, setOpen] = React.useState(false);

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    pnp.sp.web.lists
      .getByTitle("Registration")
      .items.add({
        EmployeeName: employeeName,
        EmployeeEmail: employeeEmail,
        Region: region,
        Location: location,
      })
      .then((iar: ItemAddResult) => {
        console.log(iar);
        setLoading(false);
        swal("Success", "Registration Successful", "success");
        // history.push("/vote");
      });
  };

  // const approveHandler = () => {
  //   setOpen(true);
  // };

  const cancelHandler = () => {
    setCancel(cancel);
    history.push("/");
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
                title="Employee Name"
                required={true}
                readOnly={false}
                size="mtn_child"
              />
              <Select
                value={region}
                onChange={regionHandler}
                required={true}
                title="Region"
                options={regions}
                size="mtn_child"
                filter={true}
                filterOption="Title"
              />

              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                onClick={cancelHandler}
              >
                Cancel
              </button>
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
