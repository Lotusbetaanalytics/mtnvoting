import * as React from 'react'
import { AdminNavigation, Card, Header, MenuBar, Input, Modal, Spinner, DateInput } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';


const AdminConfig = ({ history }) => {

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
        { title: "Number of Applicable Nominees", field: "NomineeCount", type: "string" as const },
        { title: "Date of Voting Exercise", field: "Date", type: "string" as const },

    ]);

    const [data, setData] = React.useState([])
    const [Title, setTitle] = React.useState("")
    const [NomineeCount, setNomineeCount] = React.useState(null)
    const [Date, setDate] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)

    React.useEffect(() => {
        sp.web.lists.getByTitle(`Constituency`).items.get().then
            ((res) => {
                setData(res)
            })

    }, [])

    // Menubar Items
    const menu = [
        { name: "Approvals", url: "/admin/add", },
        { name: "Constituency", url: "/admin/config", active: true, },
        { name: "Region", url: "/admin/region" },
        { name: "Location", url: "/admin/location" },
    ];

    const submitHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Constituency").items.add({
            Title: Title,
            NomineeCount: NomineeCount,
            Date: Date,
        }).then((res) => {
            setOpen(false)
            swal("Success", "Constituency added Successfully", "success");
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
        }).then((res) => {
            setOpen(false)
            swal("Success", "Constituency Edited Successfully", "success");
            sp.web.lists.getByTitle(`Constituency`).items.get().then
                ((res) => {
                    setData(res)
                })
        }).catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
        });

    }
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            sp.web.lists.getByTitle("Constituency").items.getById(id).delete().then((res) => {
                swal("Success", "Constituency has been deleted", "success");
                sp.web.lists.getByTitle(`Constituency`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            });
        }
    }
    const openHandler = () => {
        setOpen(true)
        setEdit(false)
        setTitle("")
        setNomineeCount("")
        setDate("")
    }
    return (
        <div className='appContainer'>
            <AdminNavigation config={`active`} />
            <div className='contentsRight'>
                <Header title='Approved Request' />
                <MenuBar menu={menu} />
                <div className='btnContainer right'>
                    <button onClick={openHandler} className="mtn__btn mtn__yellow" type='button'>Add Constituency</button>
                </div>
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
                            tooltip: "Edit",

                            onClick: (event, rowData) => {
                                setEdit(true)
                                setOpen(true)
                                setID(rowData.ID)
                                setTitle(rowData.Title)
                                setNomineeCount(rowData.NomineeCount)
                                setDate(rowData.Date)
                            },
                        },
                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "20px", color: "gold" } },
                            tooltip: "Delete",

                            onClick: (event, rowData) => {
                                deleteHandler(rowData.ID)
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
                <Modal
                    isVisible={open}
                    title="Constituency"
                    size='lg'
                    content={

                        loading ? <Spinner /> : <div className="mtn__InputFlex">
                            <Input
                                title="Constituency Name"
                                value={Title}
                                onChange={(e) => setTitle(e.target.value)} type="text"
                                size='mtn__adult'
                            />
                            <Input
                                title="Number of Applicable Nominees"
                                value={NomineeCount}
                                onChange={(e) => setNomineeCount(e.target.value)} type="number"
                                size='mtn__adult'
                            />
                            <DateInput
                                title="Date of Voting Exercise"
                                value={Date}
                                onChange={(e) => setDate(e.target.value)} type="text"
                                size='mtn__adult'
                            />

                            <button
                                onClick={edit ? editHandler : submitHandler}
                                type="button"
                                className='mtn__btn mtn__yellow'
                            >{edit ? "Edit Constituency" : "Add Constituency"}</button>

                        </div>

                    }
                    onClose={() => setOpen(false)}

                    footer=""

                />
            </div>
        </div>
    )
}

export default AdminConfig