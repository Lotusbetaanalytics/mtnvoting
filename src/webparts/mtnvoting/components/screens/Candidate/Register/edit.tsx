import * as React from "react";
import {
  Text,
  Header,
  Spinner,
  Textarea,
  Modal,
  Input,
  Select,
  Radio,
  ImageUpload,
} from "../../../containers";
import styles from "./styles.module.scss";

import { sp } from "@pnp/sp";
import swal from "sweetalert";
import CandidateNavigation from "../../../containers/candidateNavigation";
import FileUpload from "../../../containers/Forms/Input/FileUpload";

const CandidateEdit
 = ({ history }) => {

  

  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [dateEmployed, setDateEmployed] = React.useState("");
  const [jobLevel, setJobLevel] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [service, setService] = React.useState("");
  const [disciplinary, setDisciplinary] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [agenda, setAgenda] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({} as any)


  const id = 2;

  React.useEffect(() => {
    setLoading(true)
    sp.web.lists.getByTitle(`Nominees`).items.filter(`ID eq '${id}'`).get().then
        ((res) => {
            setData(res[0])
            setLoading(false)
        })
}, []);

  const jobLevelData = [{ value: "level 1" }, { value: "level 2" }];

  const regionData = [
    { value: "western Region" },
    { value: "northern region" },
    { value: "easter region" },
    { value: "southern region" },
  ];

  const locationData = [
    { value: "lagos" },
    { value: "Abuja" },
    { value: "kano" },
    { value: "jigawa" },
  ];
  const serviceData = [{ value: "Yes" }, { value: "No" }];
  const disciplinaryData = [{ value: "Yes" }, { value: "No" }];
  const termsData = [{ value: "Yes" }, { value: "No" }];

  const reader = new FileReader();

  const approveHandler = () => {
    setOpen(true);
  };
  const submitHandler = () => {
    const imagePassport = JSON.parse(localStorage.getItem("dp"))
    sp.web.lists.getByTitle("Nominees").items.add({
      EmployeeName: employeeName,
      EmployeeEmail: employeeEmail,
      DateEmployed: dateEmployed,
      JobLevel: jobLevel,
      Region: region,
      Location: location,
      ServedOnTheCouncil: service,
      DisciplinarySanction: disciplinary,
      PassportPhotograph: imagePassport,
      Agenda: agenda
    }).then((res) => {
      setOpen(false)
      swal("Success", "You have Successfully Registered", "success");
      setTimeout(function () {
        localStorage.removeItem("dp")
        history.push(`/candidate`);

      }, 2000);
    }).catch((e) => {
      swal("Warning!", "An Error Occured, Try Again!", "error");
      console.error(e);
    });

  }

  return (
    <div className="appContainer">
      <CandidateNavigation register={`active`} />
      <div className="contentsRight_">
        <Header title="Registration" />
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <p>Employee Name</p>
            <Input
              title=""
              value={data.EmployeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              type="text"
              readOnly={false}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Employee Email</p>
            <Input
              title=""
              value={data.EmployeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              type="email"
              readOnly={false}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Date Employed</p>
            <Input
              title=""
              value={data.DateEmployed}
              onChange={(e) => setDateEmployed(e.target.value)}
              type="date"
              readOnly={false}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Job level</p>
            <Select
              onChange={(e) => setJobLevel(e.target.value)}
              value={data.JobLevel}
              title=""
              options={jobLevelData}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Region</p>
            <Select
              onChange={(e) => setRegion(e.target.value)}
              value={data.Region}
              title=""
              options={regionData}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Location</p>
            <Select
              onChange={(e) => setLocation(e.target.value)}
              value={data.Location}
              title=""
              options={locationData}
            />
          </div>
          <div className={styles.inputContainer}>
            <Radio
              onChange={(e) => setService(e.target.value)}
              title="Have you served on the council before?"
              options={serviceData}
              
            />
          </div>
          <div className={styles.inputContainer}>
            <Radio
              onChange={(e) => setDisciplinary(e.target.value)}
              title="Do you have any disciplinary sanction?"
              options={disciplinaryData}
            />
          </div>
          <div className={styles.inputContainer}>
            <ImageUpload
            title="Upload your picture"
              onChange={(e) => {
                reader.readAsDataURL(e.target.files[0]);

                reader.onload = function () {
                  console.log(reader.result); //base64encoded string
                  localStorage.setItem("dp", JSON.stringify(reader.result));
                };
                reader.onerror = function (error) {
                  console.log("Error: ", error);
                }
                
              }}

            />
          </div>

          <div className={styles.inputContainer}>
            <p>State your five point agenda</p>
            <Textarea
              onChange={(e) => setAgenda(e.target.value)}
              title=""
              value={data.Agenda}
            />
          </div>
          <div className={styles.inputContainer}></div>
          <div className={styles.inputContainer}>
            <div className="radioContainer">
              <div className="minimizeBtn">
                <button className="mtn__btn mtn__white_blackColor">
                  Cancel
                </button>
                <button
                  className="mtn__btn mtn__yellow bg"
                  onClick={approveHandler}
                >
                  Submit
                </button>
              </div>
              <Modal
                isVisible={open}
                title="Terms and Condition"
                size="md"
                content={
                  <div className="mtn__InputFlex">
                    <p>
                      kindly click on check box to confirm you have read the terms
                      and agreement
                    </p>
                    <Radio
                      onChange={(e) => setDisciplinary(e.target.value)}
                      title="Do you agree to the terms and condition?"
                      options={termsData}
                    />

                    <button
                      onClick={submitHandler}
                      type="button"
                      className="mtn__btn mtn__yellow"
                    >
                      Update
                    </button>
                  </div>
                }
                onClose={() => setOpen(false)}
                footer=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateEdit
;
