import * as React from 'react'
import {  Text, Header, Spinner, Textarea, Modal } from '../../../containers'

import { sp, } from "@pnp/sp"
import swal from 'sweetalert'
import CandidateNavigation from '../../../containers/candidateNavigation'

const ViewRequest = ({ history}) => {

    const id = 2;

    const [data, setData] = React.useState({} as any)
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        setLoading(true)
        sp.web.lists.getByTitle(`Nominees`).items.filter(`ID eq '${id}'`).get().then
            ((res) => {
                setData(res[0])
                setLoading(false)
            })
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
                    {loading ? <Spinner /> : <div className='textContainerFlex'>
                        <Text title="Employee Name" value={data.EmployeeName} size="small" />
                        <Text title="Employee Email" value={data.EmployeeEmail} size="small" />
                        <Text title="Status" value={data.Status} size="small" />
                        <Text title="Date employed" value={data.DateEmployed} size="small" />
                        <Text title="Job Level" value={data.JobLevel}/>
                        <Text title="Region" value={data.Region} size="small" />
                        <Text title="Location" value={data.Location}  />
                        <Text title="Have you served on the council before " value={data.ServedOnTheCouncil} size="small"/>
                        <Text title="Do you have any disciplinary sanction" value={data.DisciplinarySanction} />
                        <Text title="Passport photograph" value={data.PassportPhotograph} size="small"/>
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