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

const CandidateEdit = ({ history }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({} as any);

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
  const termsData = [{ value: "Yes" }, { value: "No" }];

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
      <div className="contentsRight_">
        <Header title="Registration" />
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <p>Employee Name</p>
            <Input
              title=""
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              type="text"
              readOnly={false}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Employee Email</p>
            <Input
              title=""
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              type="email"
              readOnly={false}
            />
          </div>
          <div className={styles.inputContainer}>
            <p>Date Employed</p>
            <Input
              title=""
              value={dateEmployed}
              onChange={(e) => setDateEmployed(e.target.value)}
              type="date"
              readOnly={false}
            />
          </div>
          <div className={styles.inputContainer}>
            <Select
              onChange={(e) => setJobLevel(e.target.value)}
              value={jobLevel}
              title="Job level"
              options={jobLevelData}
            />
          </div>



          <div className={styles.inputContainer}>
            {/* <p>Region</p> */}
            <Select
              value={region}
              onChange={regionHandler}
              required={false}
              title="Region"
              options={regions}
              filter={true}
              filterOption="Title"
            />
          </div>
          <div className={styles.inputContainer}>
            {/* <p>Location</p> */}
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required={false}
              title="Location"
              options={locations}
              filter={true}
              filterOption="Title"
            />
          </div>
          <div className={styles.inputContainer}>
            <Radio
              onChange={(e) => setService(e.target.value)}
              title="Have you served on the council before?"
              options={serviceData}
              value={service}
            />
          </div>
          <div className={styles.inputContainer}>
            <Radio
              onChange={(e) => setDisciplinary(e.target.value)}
              title="Do you have any disciplinary sanction?"
              options={disciplinaryData}
              value={disciplinary}
            />
          </div>
          <div className={styles.inputContainer}>
            <ImageUpload
              title="Upload your picture"
              value={""}
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
          </div>

          <div className={styles.inputContainer}>
            <p>State your five point agenda</p>
            <Textarea
              onChange={(e) => setAgenda(e.target.value)}
              title=""
              value={agenda}
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
                      kindly click on check box to confirm you have read the
                      terms and agreement
                    </p>
                    <Radio
                      onChange={(e) => setDisciplinary(e.target.value)}
                      title="Do you agree to the terms and condition?"
                      options={termsData}
                      value={disciplinary}
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

export default CandidateEdit;
