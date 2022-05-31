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
  const [locations, setLocations] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [service, setService] = React.useState("");
  const [disciplinary, setDisciplinary] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [agenda, setAgenda] = React.useState("");
  const [terms, setTerms] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [termsMsg, setTermsMsg] = React.useState(false);

  const jobLevelData = [{ value: "level 1" }, { value: "level 2" }];


  
  const serviceData = [{ value: "Yes" }, { value: "No" }];
  const disciplinaryData = [{ value: "Yes" }, { value: "No" }];
  const termsData = [{ value: "Yes" }, { value: "No" }];

  const reader = new FileReader();

  
  React.useEffect(() => {
    sp.profiles.myProperties
      .get()

      .then((response) => {
        setEmployeeName(response.DisplayName);
        setEmployeeEmail(response.Email);

        sp.web.lists
              .getByTitle(`Region`)
              .items.get()
              .then((resp) => {
                setRegions(resp);
              });
      });
  }, []);
  const imagePassport = JSON.parse(localStorage.getItem("dp"));

  const approveHandler = () => {
    if (!jobLevel || 
      !dateEmployed ||
      !region ||
      !location||
      !service ||
      !disciplinary ||
      !imagePassport 
      ){
        swal("Warning!", "All Fields are required", "error");
      } else {
    setOpen(true);
    
      }
  };
  const cancelHandler = () =>{
    setDisciplinary("");
    setJobLevel("");
    setRegion("");
    setDisciplinary("")
    setService("");
    setLocation("");
    setDateEmployed("");
    setAgenda("")

  }
  const submitHandler = () => {
    if ( terms && terms == "No") 
      {
        swal("Warning!", "you have to agree with terms and condition", "error");
      } else
        {
          sp.web.lists
          .getByTitle("Nominees")
          .items.add({
            EmployeeName: employeeName,
            EmployeeEmail: employeeEmail,
            DateEmployed: dateEmployed,
            JobLevel: jobLevel,
            Region: region,
            Location: location,
            ServedOnTheCouncil: service,
            DisciplinarySanction: disciplinary,
            PassportPhotograph: imagePassport,
            Agenda: agenda,  
          })
          .then((res) => {
            setOpen(false);
            swal("Success", "You have Successfully Registered", "success");
            setTimeout(function () {
              localStorage.removeItem("dp");
              history.push(`/candidate`);
            }, 2000);
          })
          .catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
          });
        }
        
  };
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
    <div className="appContainer">
      <CandidateNavigation register={`active`} />
      <div className="contentsRight__">
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
            onChange={regionHandler}
            value={region}
            title="Region"
            options={regions}
            filter={true}
            filterOption="Title"
          />

          <Select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required={false}
          title="Location"
          options={locations}
          filter={true}
          filterOption="Title"
          size={"mtn__child"}
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
              };
            }}
          />
          <div></div>
          <div className={styles.imageContainer}><img src={imagePassport} alt={employeeName} /></div>
          <Textarea
            onChange={(e) => setAgenda(e.target.value)}
            title="State your five point agenda"
            value={agenda}
          />

          <div className="minimizeBtn">
            <button className="mtn__btn mtn__white_blackColor" onClick={cancelHandler}>Cancel</button>
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
              <div className="terms">
                <h5>MTN NIGERIA COMMUNICATIONS PLC</h5>
                <h5>
                  ELECTION GUIDELINES FOR THE 2020 BIENNIAL EMPLOYEE COUNCIL
                  ELECTION
                </h5>
                <p>
                  Introduction In line with the provisions of the MTNN Employee
                  Council Constitution, election into the MTNN Employee Council
                  holds once in two (2) years. The last election took place in
                  October 2018 and based on the constitution, the next election is
                  planned to hold in October 2020. As we prepare for another
                  Employee Council election scheduled to hold in October 30 2020,
                  find below the proposed plan for the forthcoming elections,
                  including general eligibility criteria for contesting elective
                  office etc. Eligibility Criteria Candidates that will contest
                  for available seats in each business region / location will be
                  required to meet the following criteria:{" "}
                </p>
                <ul>
                  <li>
                    Only confirmed national staff on job levels 1 & 2 are eligible
                    to contest for seats on the Employee Council.
                  </li>
                  <li>
                    ALL permanent national employees levels (both confirmed and
                    unconfirmed) on levels 1 & 2 are eligible to vote.
                  </li>
                  <li>
                    Employees who have an active disciplinary sanction are not
                    eligible to contest.
                  </li>
                  <li>
                    Incumbent representatives who have served two consecutive
                    terms (i.e. 4 years) are not eligible to contest.
                  </li>
                  <li>
                    Incumbent representatives who have served only one term (i.e.
                    2 years) are eligible to contest.
                  </li>
                  <li>
                    Staff can only contest for allocated seats within their
                    region/location.
                  </li>
                </ul>
  
                <Radio
                  onChange={(e) => setDisciplinary(e.target.value)}
                  title="I have read and agreed on the terms and conditions"
                  options={termsData}
                  value={terms}
                />
                <div className="btnContainer">
                    <button
                    onClick={submitHandler}
                    type="button"
                    className="mtn__btn mtn__yellow"
                  >
                    Proceed
                  </button>

                </div>
              </div>
            }
            onClose={() => setOpen(false)}
            footer=""
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateRegister;
