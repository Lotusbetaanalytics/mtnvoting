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
  CandidateNavigation
} from "../../../containers";
import styles from "./styles.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import FileUpload from "../../../containers/Forms/Input/FileUpload";
import { values } from "lodash";
import { Item } from "@pnp/sp/items";
import { useHistory } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";

const CandidateEdit = ({ context }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({} as any);
  const history = useHistory()

  console.log(data.EmployeeName);

  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [dateEmployed, setDateEmployed] = React.useState("");
  const [jobLevel, setJobLevel] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [regions, setRegions] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [locations, setLocations] = React.useState([]);
  const [service, setService] = React.useState("");
  const [disciplinary, setDisciplinary] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [agenda, setAgenda] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [agree, setAgree] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);
  const [list, setList] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState(null)
  const [upload, setUpload] = React.useState(false)
  const [serviceModal, setServiceModal] = React.useState(false)
  const [agendas, setAgendas] = React.useState([]);

  const agendaHandler = () => {
    setAgendas([...agendas, agenda])
  }

  const cancelButton = () => {
    setCancelModal(true);

  };

  const cancelHandler = () => {
    setDisciplinary("");
    setJobLevel("");
    setRegion("");
    setDisciplinary("");
    setService("");
    setLocation("");
    setDateEmployed("");
    setAgenda("");
    setPassport("")
    setConstituency("")
    setCancelModal(false)
  };
  const checkboxHandler = () => {
    setAgree(!agree);
  }

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties
      .get()

      .then((response) => {
        sp.web.lists
          .getByTitle(`Nominees`)
          .items.filter(`EmployeeEmail eq '${response.Email}'`)
          .get()
          .then((res) => {
            setData(res[0]);
            setLoading(false);
            setEmployeeName(res[0].EmployeeName)
            setEmployeeEmail(res[0].EmployeeEmail)
            setDateEmployed(res[0].DateEmployed)
            setJobLevel(res[0].JobLevel)
            setRegion(res[0].Region)
            setLocation(res[0].Location)
            setService(res[0].ServedOnTheCouncil)
            setDisciplinary(res[0].DisciplinarySanction)
            setPassport(res[0].PassportPhotograph)
            setAgenda(res[0].Agenda)
            setId(res[0].id)
            console.log(res);

          });
      });
    sp.web.lists.getByTitle(`Region`).items.get().then
      ((resp) => {
        setRegions(resp)
      })

  }, []);



  const jobLevelData = [{ value: "level 1" }, { value: "level 2" }];


  const serviceData = [{ value: "Yes" }, { value: "No" }];
  const disciplinaryData = [{ value: "Yes" }, { value: "No" }];



  const reader = new FileReader();

  const approveHandler = () => {
    setOpen(true);
  };
  const submitHandler = () => {
    const imagePassport = JSON.parse(localStorage.getItem("dp"));
    sp.web.lists.getByTitle("Nominees").items.getById(id).update({
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
  };

  const regionHandler = (e) => {
    setRegion(e.target.value)
    sp.web.lists.getByTitle(`Location`).items.filter(`Region eq '${e.target.value}'`).get().then
      ((res) => {
        setLocations(res)
      })
  }
  return (
    <div className="appContainer">
      <CandidateNavigation register={`active`} />
      <div className="contentsRight__">
        <Header title="Edit registration" />
        <div className="mtn__InputFlex">

          <Input
            title="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            type="text"
            readOnly={false}
          />
          <Input
            title="Employee Email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            type="email"
            readOnly={false}
          />

          <Input
            title="Date Employed"
            value={dateEmployed}
            onChange={(e) => setDateEmployed(e.target.value)}
            type="date"
            readOnly={false}
          />

          <Select
            onChange={(e) => setJobLevel(e.target.value)}
            value={jobLevel}
            title="Job level"
            options={jobLevelData}
          />

          <Select
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
            required={false}
            title="Constituency"
            options={constituencies}
            filter={true}
            filterOption="Title"
            size={"mtn__child"}
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
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            title="Location"
            options={locations}
            filter={true}
            filterOption="Title"
          />
          {/*  <div className={styles.space}>
            <ImageUpload
              title="Upload your picture"
              value={passport}
              onChange={photoHandler}
              loading={upload}
            />
            {photoUrl && <div className={styles.imageContainer}>
              <img src={photoUrl} alt={employeeName} />
            </div>}
          </div> */}

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


          {/* <Input
            title="State your five point agenda"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            type="text"
            size="mtn__child"
          />
          <div className="mtn__InputContainer mtn__child">
            <label style={{ visibility: "hidden" }}>Add</label>
            <button
              className="mtn__btn mtn__yellow"
              onClick={agendaHandler}
              disabled={agendas.length === 5}
            >
              Add
            </button>
          </div> */}


        </div>
        {/* <div className="mtn__InputContainer mtn__adult">
          <ul>
            {agendas.map((item, i) => (
              <li key={i} className="plane">{item} <div className="remove"><FaTrash onClick={() => removeHandler(item)} /></div></li>
            ))}
          </ul>
      </div>*/}


        <div className={styles.inputContainer}>
          <div className="radioContainer">
            <div className="minimizeBtn">

              <button onClick={cancelButton} className="mtn__btn mtn__white_blackColor" >
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
                <div className="terms">
                  <h5>MTN NIGERIA COMMUNICATIONS PLC</h5>
                  <h5>
                    ELECTION GUIDELINES FOR THE 2020 BIENNIAL EMPLOYEE COUNCIL
                    ELECTION
                  </h5>
                  <p>
                    Introduction In line with the provisions of the MTNN
                    Employee Council Constitution, election into the MTNN
                    Employee Council holds once in two (2) years. The last
                    election took place in October 2018 and based on the
                    constitution, the next election is planned to hold in
                    October 2020. As we prepare for another Employee Council
                    election scheduled to hold in October 30 2020, find below
                    the proposed plan for the forthcoming elections, including
                    general eligibility criteria for contesting elective
                    office etc. Eligibility Criteria Candidates that will
                    contest for available seats in each business region /
                    location will be required to meet the following criteria:{" "}
                  </p>
                  <ul>
                    <li>
                      Only confirmed national staff on job levels 1 & 2 are
                      eligible to contest for seats on the Employee Council.
                    </li>
                    <li>
                      ALL permanent national employees levels (both confirmed
                      and unconfirmed) on levels 1 & 2 are eligible to vote.
                    </li>
                    <li>
                      Employees who have an active disciplinary sanction are
                      not eligible to contest.
                    </li>
                    <li>
                      Incumbent representatives who have served two
                      consecutive terms (i.e. 4 years) are not eligible to
                      contest.
                    </li>
                    <li>
                      Incumbent representatives who have served only one term
                      (i.e. 2 years) are eligible to contest.
                    </li>
                    <li>
                      Staff can only contest for allocated seats within their
                      region/location.
                    </li>
                  </ul>
                  <div className={styles.checkBox}>
                    <input type="checkbox" id="agree" onChange={checkboxHandler} />
                  </div>
                  <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>

                  <div className="btnContainer">
                    <button
                      onClick={submitHandler}
                      type="button"
                      className="mtn__btn mtn__yellow"
                      disabled={!agree}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              }
              onClose={() => setOpen(false)}
              footer=""
            />
            <Modal
              isVisible={cancelModal}
              title="Are you sure you want to cancel edit proccess?"
              size="md"
              content={
                <div className="terms">
                  <div className="btnContainer">
                    <button
                      onClick={cancelHandler}
                      type="button"
                      className="mtn__btn mtn__yellow"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              }
              onClose={() => setCancelModal(false)}
              footer=""
            />
          </div>
        </div>
      </div>
<<<<<<< HEAD
    </div>
=======
    </div >
>>>>>>> origin
  );
};

export default CandidateEdit;