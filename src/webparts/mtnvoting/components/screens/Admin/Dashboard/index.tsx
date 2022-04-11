import * as React from 'react'
import { AdminNavigation } from '../../../containers'

const AdminDashboard = () => {
    return (
        <div className='appContainer'>
            <AdminNavigation />
            <div className='contentsRight'></div>
        </div>
    )
}

export default AdminDashboard