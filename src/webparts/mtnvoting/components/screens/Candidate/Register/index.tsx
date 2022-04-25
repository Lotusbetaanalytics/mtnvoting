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
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import CandidateNavigation from "../../../containers/candidateNavigation";
import FileUpload from "../../../containers/Forms/Input/FileUpload";

const CandidateRegister = ({ history }) => {

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
  const [terms,setTerms] = React.useState("") 
  const [open, setOpen] = React.useState(false);

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
  React.useEffect(()=> {
    sp.profiles.myProperties.get()

            .then((response) => {

                setEmployeeName(response.DisplayName)
                setEmployeeEmail(response.Email)
              });
  },[])

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
      <div className="contentsRight_ mtn_gray">
        <Header title="Registration" />
        <div className="mtn__InputFlex">
            <Input
              title="Employee Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              type="text"
              readOnly={true}
            />
          
            <Input
              title="Employee Email"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              type="email"
              readOnly={true}
            />
          

            <Input
              title="Date Employed"
              value={dateEmployed}
              onChange={(e) => setDateEmployed(e.target.value)}
              type="date"
              
            />
            <Select
              onChange={(e) => setJobLevel(e.target.value)}
              value={jobLevel}
              title="Job level"
              options={jobLevelData}
            />
        
            <Select
              onChange={(e) => setRegion(e.target.value)}
              value={region}
              title="Region"
              options={regionData}
            />

            <Select
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              title="Location"
              options={locationData}
            />
            <Radio
              onChange={(e) => setService(e.target.value)}
              title="Have you served on the council before?"
              options={serviceData}
              value={service}
            />
            <Radio
              onChange={(e) => setDisciplinary(e.target.value)}
              title="Do you have any disciplinary sanction?"
              options={disciplinaryData}
              value={disciplinary}
            />
  
            <ImageUpload
            title="Upload your picture"
            value={passport}
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
          
          
            <Textarea
              onChange={(e) => setAgenda(e.target.value)}
              title="State your five point agenda"
              value={agenda}
            />
        
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
                      value={terms}
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

export default CandidateRegister;
