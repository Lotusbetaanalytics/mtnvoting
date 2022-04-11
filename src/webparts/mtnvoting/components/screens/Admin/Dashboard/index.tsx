import * as React from 'react'
import { AdminNavigation, Card, Header } from '../../../containers'
import styles from './styles.module.scss'
const AdminDashboard = () => {
    return (
        <div className='appContainer'>
            <AdminNavigation dashboard={`active`} />
            <div className='contentsRight'>
                <Header title='Dashboard' />
                <div className={styles.cardContainer}>
                    <Card title="Total Request" count={10} color="mtn__yellow" />
                    <Card title="Pending Request" count={10} color="mtn__yellow" />
                    <Card title="Approved Request" count={10} color="mtn__yellow" />
                    <Card title="Declined Request" count={10} color="mtn__yellow" />
                    <Card title="Revoked Request" count={10} color="mtn__yellow" />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard