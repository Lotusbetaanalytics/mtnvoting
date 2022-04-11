import * as React from 'react'
import { AdminNavigation, Card, Header } from '../../../containers'
import MaterialTable from "material-table";
import { sp, } from "@pnp/sp"
const AdminPending = ({ history }) => {
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
        { title: "Employee Name", field: "EmployeeName", type: "string" as const },
        { title: "Email", field: "EmployeeEmail", type: "string" as const },
        { title: "Date Employed", field: "DateEmployed", type: "string" as const },
        { title: "Job Level", field: " JobLevel", type: "string" as const },
        { title: "Region", field: "Region", type: "string" as const },
        { title: "Location", field: "Location", type: "string" as const },

    ]);


    const [data, setData] = React.useState([])

    React.useEffect(() => {
        sp.web.lists.getByTitle(`Nominees`).items.filter(`Status eq 'Pending'`).get().then
            ((res) => {
                setData(res)
            })
    }, [])
    return (
        <div className='appContainer'>
            <AdminNavigation pending={`active`} />
            <div className='contentsRight'>
                <Header title='Pending Request' />
                <MaterialTable
                    title=""
                    columns={columns}
                    data={data}
                    options={{
                        exportButton: true,
                        actionsCellStyle: {
                            backgroundColor: "#C4C4C430",
                            color: "#FF00dd",
                        },
                        actionsColumnIndex: -1,

                        headerStyle: {
                            backgroundColor: "#FFCC00",
                            color: "black",
                        },

                    }}
                    style={{ boxShadow: "none", width: "100%" }}
                    // icons={{Add: () => 'Add Row'}}
                    actions={[
                        {
                            icon: "visibility",
                            iconProps: { style: { fontSize: "20px", color: "gold" } },
                            tooltip: "View",

                            onClick: (event, rowData) => {
                                history.push(`/admin/pending/${rowData.ID}`)
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
            </div>
        </div>
    )
}

export default AdminPending