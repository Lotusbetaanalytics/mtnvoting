import * as React from 'react'
import { AdminNavigation, Card, AdminHeader, MenuBar, Input, Modal, Spinner, DateInput, Select, Helpers } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';


const AdminReport = ({ history }) => {



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
        { title: "Constituency", field: "Title", type: "string" as const },
        { title: "Date of Voting Exercise", field: "Date", type: "string" as const },
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
        sp.web.lists.getByTitle(`Constituency`).items.filter(`Status eq 'Open'`).get().then
            ((res) => {
                setData(res)
                setLoading(false)
            })
    }, [])



    const submitHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Constituency").items.add({
            Title: Title,
            NomineeCount: NomineeCount,
            Date: Date,
            Region: region,
            Location: location,
            Country: country,
            Status: "Open"
        }).then((res) => {
            setOpen(false)
            swal("Success", "Voting Exercise added Successfully", "success");
            sp.web.lists.getByTitle(`Constituency`).items.get().then
                ((res) => {
                    setData(res)
                })

        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });

    }

    const editHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Constituency").items.getById(id).update({
            Title: Title,
            NomineeCount: NomineeCount,
            Date: Date,
            Region: region,
            Location: location,
            Country: country
        }).then((res) => {
            setOpen(false)
            swal("Success", "Voting Exercise Edited Successfully", "success");
            sp.web.lists.getByTitle(`Constituency`).items.get().then
                ((res) => {
                    setData(res)
                })
        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });
    }

    const stopHandler = (id) => {
        if (window.confirm("Are you sure you stop this exercise")) {
            sp.web.lists.getByTitle("Constituency").items.getById(id).update({
                Status: "Closed"
            }).then((res) => {
                setOpen(false)
                swal("Success", "Voting has Ended", "success");
                sp.web.lists.getByTitle(`Constituency`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            }).catch((e) => {
                swal("Warning!", "An Error Occured, Try Again!", "error");
                console.error(e);
            });
        }
    }


    return (
        <div className='appContainer'>
            <AdminNavigation report={`active`} />
            <div className='contentsRight'>
                <AdminHeader title='Reports' />
                {loading ? <Spinner /> :
                    <MaterialTable
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
                        actions={[

                            {
                                icon: "visibility",
                                iconProps: { style: { fontSize: "20px", color: "gold" } },
                                tooltip: "Stop",

                                onClick: (event, rowData) => {
                                    stopHandler(rowData.ID)
                                },
                            },
                            {
                                icon: "visibility",
                                iconProps: { style: { fontSize: "20px", color: "gold" } },
                                tooltip: "View Results",

                                onClick: (event, rowData) => {
                                    history.push(`/admin/reports/${rowData.Title}`)
                                },
                            },
                        ]}
                        components={{
                            Action: (props) => (
                                <button
                                    onClick={(event) => props.action.onClick(event, props.data)}
                                    className="mtn__btn__table mtn__black"
                                >
                                    {props.action.tooltip}
                                </button>
                            ),
                        }}
                    />
                }
            </div>
        </div>
    )
}

export default AdminReport