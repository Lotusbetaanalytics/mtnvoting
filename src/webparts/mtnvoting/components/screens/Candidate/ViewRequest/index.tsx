import * as React from "react";
import {
  Text,
  Header,
  Spinner,
  Textarea,
  Modal,
  CandidateNavigation,
} from "../../../containers";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import styles from "../Register/styles.module.scss";


const ViewRequest = ({ history }) => {
  const [data, setData] = React.useState({} as any);
  const [loading, setLoading] = React.useState(false);
  const [agenda, setAgenda] = React.useState("");
  const [list, setList] = React.useState([]);
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
            if (res.length >= 0){
              setData(res[0]);
            setLoading(false);
            console.log(res);
            setAgenda(res[0].Agenda);

            console.log(res[0].Agenda, "this is it");
            setList(res[0].Agenda.split("\n"));
<<<<<<< HEAD
           } else {
            "this user has not regiistered"
           }
            
          });
          sp.web.lists
          .getByTitle("Registration")
          .items.filter(`EmployeeEmail eq '${response.Email}'`)
          .get()
            .then((items) => {
                 console.log(items.length )
=======
          });
        sp.web.lists
          .getByTitle("Registration")
          .items.filter(`EmployeeEmail eq '${response.Email}'`)
          .get()
          .then((items) => {
            console.log(items.length)
>>>>>>> 7d56b80bdc1298112ef51e7119eb5e1119c1f4a3
            //  if (items.length <= 0) {
            //    swal("Error", "You are have not registered", "error");
            //    history.push("/");
            //    return;
            //  }
<<<<<<< HEAD
           })
      });
     
=======
          })
      });

>>>>>>> 7d56b80bdc1298112ef51e7119eb5e1119c1f4a3
  }, []);

  const editHandler = () => {
    history.push(`/candidate/edit`);
  };
  console.log(list);
  return (
    <div className="appContainer">
      <CandidateNavigation viewRequest={`active`} />
      <div className="contentsRight">
        <Header title="My Request" />
        <div className="textContainer">
          <div className="viewFlex">
            <div className="photo">
              {data.PassportPhotograph ? (
                <div>
                  <img src={data.PassportPhotograph} alt={data.EmployeeName} />
                </div>
              ) : "No image found"}
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="textContainerFlex">
              <Text
                title="Employee Name"
                value={data.EmployeeName}
                size="small"
              />
              <Text
                title="Employee Email"
                value={data.EmployeeEmail}
                size="small"
              />
              <Text title="Status" value={data.Status} size="small" />
              <Text
                title="Date employed"
                value={data.DateEmployed}
                size="small"
              />
              <Text title="Region" value={data.Region} size="small" />
              <Text title="Location" value={data.Location} size="small" />
              <Text
                title="Constituency"
                value={data.Constituency}
                size="small"
              />
              <Text
                title="Have you served on the council before "
                value={data.ServedOnTheCouncil}
                size="small"
              />
              <Text
                title="Do you have any disciplinary sanction"
                value={data.DisciplinarySanction}
                size="small"
              />
              <div className={styles.agenda}>
                <p>Five point agenda</p>
<<<<<<< HEAD
                <ul> 
=======
                <ul>
>>>>>>> 7d56b80bdc1298112ef51e7119eb5e1119c1f4a3
                  {list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
<<<<<<< HEAD
             
=======

>>>>>>> 7d56b80bdc1298112ef51e7119eb5e1119c1f4a3

              <div className="minimizeBtn_">
                <button
                  onClick={editHandler}
                  className="mtn__btn mtn__yellow bg"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;