import * as React from 'react'
import {  Text, Header, Spinner, Textarea, Modal } from '../../../containers'
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert'
import CandidateNavigation from '../../../containers/candidateNavigation1'
import styles from "./styles.module.scss";

const ViewRequest = ({ history}) => {

    

    const [data, setData] = React.useState({} as any)
    const [loading, setLoading] = React.useState(false)
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
          console.log(res);
        });
      });
    }, [])

    const editHandler = ()=> {
        history.push(`/candidate/edit`)
    }

    return (
        <div className='appContainer'>
            <CandidateNavigation viewRequest={`active`} />
            <div className='contentsRight'>
                <Header title='My Request' />
                <div className='textContainer'>
                <div className='viewFlex'>
                      <div className='photo'>
                        {data.PassportPhotograph && <div>
                                <img src={data.PassportPhotograph} alt={data.EmployeeName} />
                            </div>}
                          </div>
                  </div>

                    {loading ? <Spinner /> :
                    
                     <div className='textContainerFlex'>
                        
                        <Text title="Employee Name" value={data.EmployeeName} size="small" />
                        <Text title="Employee Email" value={data.EmployeeEmail} size="small" />
                        <Text title="Status" value={data.Status} size="small" />
                        <Text title="Date employed" value={data.DateEmployed} size="small" />
                        <Text title="Region" value={data.Region} size="small" />
                        <Text title="Location" value={data.Location} size="small" />
                        <Text title="Have you served on the council before " value={data.ServedOnTheCouncil} size="small"/>
                        <Text title="Do you have any disciplinary sanction" value={data.DisciplinarySanction} size="small" />
                        <Text title="State your five point agenda" value={data.Agenda} size="medium" />
                       
                        <div className="minimizeBtn_">
                <button onClick={editHandler}
                  className="mtn__btn mtn__yellow bg"
                >
                  Edit
                </button>
              </div>


                    </div>}

                </div>

            </div>
        </div>
    )
}

export default ViewRequest
