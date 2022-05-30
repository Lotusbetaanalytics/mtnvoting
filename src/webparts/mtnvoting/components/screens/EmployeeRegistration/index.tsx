import * as React from "react";
import { Input, Select, Modal, Spinner } from "../../containers";
import { sp } from "@pnp/sp";
import { default as pnp, ItemAddResult } from "sp-pnp-js";
import swal from "sweetalert";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import styles from "./styles.module.scss";

const EmployeeRegistration = ({ history }) => {
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [region, setRegion] = React.useState("");
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
      });
    setInterval(() => {
      history.push("/user/landingpage");
    }, 2000);
  };

  // const approveHandler = () => {
  //   setOpen(true);
  // };

  const cancelHandler = () => {
    history.push("/user/landingpage");
  };

  const optionRegion = [
    { value: "Western Region" },
    { value: "Northern region" },
    { value: "Easter region" },
    { value: "Southern region" },
  ];

  const optionLocation = [
    { value: "Edo" },
    { value: "Ogun" },
    { value: "Lagos" },
    { value: "Imo" },
    { value: "Kaduna" },
    { value: "Kano" },
    { value: "Delta" },
    { value: "Oyo" },
    { value: "Abia" },
    { value: "Bauchi" },
    { value: "Kastina" },
    { value: "Abuja" },
    { value: "Kogi" },
    { value: "Cross River" },
  ];

  return (
    <div>
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
              {/* <p>Employee Name</p> */}
              <Input
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                title="Employee Name"
                required={true}
                readOnly={false}
                size="mtn_child"
              />

              <p>Employee Email</p>
              <Input
                type="email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                title=""
                required={true}
                readOnly={false}
                size="mtn_child"
              />

              <p>Region</p>
              <Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required={false}
                title=""
                options={optionRegion}
                size="mtn_child"
              />

              <p>Location</p>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required={false}
                title=""
                options={optionLocation}
                size="mtn_child"
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
