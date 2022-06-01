import * as React from 'react'
import { AdminNavigation, Card, Header, MenuBar, Input, Modal, Spinner, DateInput, PeoplePicker } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
import swal from 'sweetalert';
import { graph } from "@pnp/graph";
import '@pnp/graph/users';


const Administrator = ({ history }) => {

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
        { title: "Name", field: "Title", type: "string" as const },
        { title: "Email", field: "Email", type: "string" as const },

    ]);

    const [data, setData] = React.useState([])
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [id, setID] = React.useState(null)

    React.useEffect(() => {
        sp.web.lists.getByTitle(`Administrator`).items.get().then
            ((res) => {
                setData(res)
            })

    }, [])

    // Menubar Items
    const menu = [
        { name: "Approvals", url: "/admin/add", active: true, },
        { name: "Consituency", url: "/admin/config", },
        { name: "Region", url: "/admin/region" },
        { name: "Location", url: "/admin/location" },
    ];

    const submitHandler = (e) => {
        e.preventDefault()
        sp.web.lists.getByTitle("Administrator").items.add({
            Title: name,
            Email: email
        }).then((res) => {
            setOpen(false)
            swal("Success", "Administrator added Successfully", "success");
            sp.web.lists.getByTitle(`Administrator`).items.get().then
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
        sp.web.lists.getByTitle("Administrator").items.getById(id).update({
            Title: name,
            Email: email
        }).then((res) => {
            setOpen(false)
            swal("Success", "Administrator Edited Successfully", "success");
            sp.web.lists.getByTitle(`Administrator`).items.get().then
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
            sp.web.lists.getByTitle("Administrator").items.getById(id).delete().then((res) => {
                swal("Success", "Administrator has been deleted", "success");
                sp.web.lists.getByTitle(`Administrator`).items.get().then
                    ((res) => {
                        setData(res)
                    })
            });
        }
    }
    const openHandler = () => {
        setOpen(true)
        setEdit(false)
        setName("")
        setEmail("")
    }
    const Handler = (e) => {
        setName(e.target.value)
        const staff = e.target.value
        graph.users.top(999).get().then((res) => {
            const filteredData = res.filter((x) => x.displayName === staff)
            setEmail(filteredData[0].mail)
        })

    }
    return (
        <div className='appContainer'>
            <AdminNavigation config={`active`} />
            <div className='contentsRight'>
                <Header title='Administrator' />
                <MenuBar menu={menu} />
                <div className='btnContainer right'>
                    <button onClick={openHandler} className="mtn__btn mtn__yellow" type='button'>Add Administrator</button>
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
                                setOpen(true)
                                setID(rowData.ID)
                                setName(rowData.Title)
                                setEmail(rowData.Email)
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
                    title="Administrator"
                    size='lg'
                    content={

                        loading ? <Spinner /> : <div className="mtn__InputFlex">
                            <PeoplePicker
                                onChange={Handler} value={name} title="Name" filter="displayName" required={true} size="mtn__adult" />
                            <Input onChange={(e) => setEmail(e.target.value)} value={email} title="Email" type="text" readOnly={true} size="mtn__adult" />

                            <button
                                onClick={edit ? editHandler : submitHandler}
                                type="button"
                                className='mtn__btn mtn__yellow'
                            >{edit ? "Edit Administrator" : "Add Administrator"}</button>

                        </div>

                    }
                    onClose={() => setOpen(false)}

                    footer=""

                />
            </div>
        </div>
    )
}

export default Administrator