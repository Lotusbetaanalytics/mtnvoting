import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, MenuBar, Input, Modal, Spinner, DateInput, Select, Helpers } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';


const AdminResult = ({ history, match }) => {

    const params = match.params.title

    type IType =
        | "string"
        | "boolean"
        | "numeric"
        | "date"
        | "datetime"
        | "time"
        | "currency";
    const string: IType = "string";


    const [columns, setColumns] = React.useState([
        { title: "Candidate", field: "EmployeeName", type: "string" as const },
        { title: "Votes", field: "Date", type: "string" as const },
    ]);

    const [data, setData] = React.useState([])
    const [locations, setLocations] = React.useState([])
    const [location, setLocation] = React.useState("")
    const [regions, setRegions] = React.useState([])
    const [region, setRegion] = React.useState("")
    const [Title, setTitle] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [NomineeCount, setNomineeCount] = React.useState(null)

    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)
    const today = new Date().toJSON().slice(0, 10)


    React.useEffect(() => {
        setLoading(true)
        sp.web.lists.getByTitle(`Nominees`).items.filter(`Status eq 'Approved' and Constituency eq '${params}'`).get().then
            ((res) => {
                setData(res)
                setLoading(false)

            })
    }, [])

    return (
        <div className='appContainer'>
            <AdminNavigation report={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Results' />

                {loading ? <Spinner /> : <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                    options={{
                        exportButton: true,
                        actionsCellStyle: {
                            backgroundColor: "none",
                            color: "#FF00dd",
                        },
                        actionsColumnIndex: -1,

                        headerStyle: {
                            backgroundColor: "#FFCC00",
                            color: "black",
                        },

                    }}
                    style={{
                        boxShadow: "none",
                        width: "100%",
                        background: "none",
                        fontSize: "13px",
                    }}
                // icons={{Add: () => 'Add Row'}}

                />
                }
            </div>
        </div>
    )
}

export default AdminResult