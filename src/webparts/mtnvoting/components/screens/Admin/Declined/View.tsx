import * as React from 'react'
import { AdminNavigation, Text, Header, Spinner, Modal, Textarea } from '../../../containers'

import { sp, } from "@pnp/sp"
import swal from 'sweetalert'
import axios from 'axios'

const AdminViewDeclined = ({ history, match }) => {
    const id = match.params.id

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

    //     var instance = axios.create({
    //         baseURL: 'https://some-domain.com/api/',
    //         headers: {"X-Requested-With": "XMLHttpRequest"}
    //       });

    //       var xmlBodyStr = `<?xml version="1.0" encoding="UTF-8"?>
    //        <req:KnownTrackingRequest xmlns:req="http://www.example.com" 
    //                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    //                 xsi:schemaLocation="http://www.example.com
    //                 TrackingRequestKnown.xsd">
    //          <Request>
    //            <ServiceHeader>
    //               <MessageTime>2002-06-25T11:28:56-08:00</MessageTime>
    //               <MessageReference>1234567890123456789012345678</MessageReference>
    //               <SiteID>SiteID</SiteID>
    //               <Password>Password</Password>
    //            </ServiceHeader>
    //          </Request>
    //          <LanguageCode>en</LanguageCode>
    //          <AWBNumber>01234567890</AWBNumber>
    //          <LevelOfDetails>LAST_CHECK_POINT_ONLY</LevelOfDetails>`;

    // var config = {
    //      headers: {'Content-Type': 'text/xml'}
    // };

    // axios.post('https://POST_URL', xmlBodyStr, config); 


    const approveHandler = () => {
        sp.web.lists.getByTitle("Nominees").items.getById(id).update({
            Status: "Approved"
        }).then((res) => {
            swal("Success", "Nominee Approved Successfully", "success");
            setTimeout(function () {
                history.push("/admin/declined")

            }, 2000);
        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    }

    return (
        <div className='appContainer'>
            <AdminNavigation declined={`active`} />
            <div className='contentsRight'>
                <Header title='Pending Request' />
                <div className='textContainer'>
                    <div className='viewFlex'>
                        <div className='photo'>
                            {data.PassportPhotograph && <div>
                                <img src={data.PassportPhotograph} alt={data.EmployeeName} />
                            </div>}
                        </div>
                        {loading ? <Spinner /> : <div className='textContainerFlex'>
                            <Text title="Employee Name" value={data.EmployeeName} />
                            <Text title="Employee Email" value={data.EmployeeEmail} />
                            <Text title="Date employed" value={data.DateEmployed} />
                            <Text title="Job Level" value={data.JobLevel} />
                            <Text title="Region" value={data.Region} />
                            <Text title="Location" value={data.Location} />
                            <Text title="Have you served on the council before " value={data.ServedOnTheCouncil} />
                            <Text title="If yes, state the period you served " value={data.PeriodServed} />
                            <Text title="Do you have any disciplinary sanction" value={data.DisciplinarySanction} />
                            <Text title="State your five point agenda" value={data.Agenda} size="large" />
                            <div className='minimizeBtn'>
                                <button className='mtn__btn mtn__yellow' onClick={approveHandler}>Approve</button>
                            </div>
                        </div>
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminViewDeclined