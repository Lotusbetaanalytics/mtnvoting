import * as React from 'react'
import { AdminNavigation, Text, AdminHeader, Spinner, Textarea, Modal, Select } from '../../../containers'

import { sp, } from "@pnp/sp"
import swal from 'sweetalert'

const AdminViewApproved = ({ history, match }) => {
    const id = match.params.id

    const [data, setData] = React.useState({} as any)
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [comments, setComments] = React.useState("")
    const [datas, setDatas] = React.useState([])
    const [reason, setReason] = React.useState("")
    React.useEffect(() => {
        setLoading(true)
        sp.web.lists.getByTitle(`Nominees`).items.filter(`ID eq '${id}'`).get().then
            ((res) => {
                setData(res[0])
                setLoading(false)
            })
        sp.web.lists.getByTitle(`Reason`).items.get().then
            ((resp) => {
                setDatas(resp)
            })

    }, [])


    const approveHandler = () => {
        setOpen(true)
    }

    const revokeHandler = () => {
        sp.web.lists.getByTitle("Nominees").items.getById(id).update({
            Status: "Revoked",
            Comments: comments,
            Reason: reason,
        }).then((res) => {
            setOpen(false)
            swal("Success", "Nominee Revoked Successfully", "success");
            setTimeout(function () {

                history.push("/admin/approved")

            }, 2000);
        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    }
    return (
        <div className='appContainer'>
            <AdminNavigation approved={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Approved Request' />
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
                                <button className='mtn__btn mtn__yellow' onClick={approveHandler}>Revoke</button>
                            </div>
                        </div>}

                    </div>
                    {/* Modal */}
                    <Modal
                        isVisible={open}
                        title="Revoke Nominee"
                        size="md"
                        content={
                            <form onSubmit={revokeHandler}>
                                <div className="mtn__InputFlex">
                                    <Select
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required={true}
                                        title="Reason"
                                        options={datas}
                                        filter={true}
                                        filterOption="Title"
                                        size='mtn__adult'
                                    />
                                    <Textarea
                                        title="Comments"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        required={true}

                                    />
                                    <button

                                        type="submit"
                                        className='mtn__btn mtn__yellow'
                                    >Revoke</button>

                                </div>
                            </form>

                        }
                        onClose={() => setOpen(false)}

                        footer=""

                    />
                </div>

            </div>
        </div>
    )
}

export default AdminViewApproved