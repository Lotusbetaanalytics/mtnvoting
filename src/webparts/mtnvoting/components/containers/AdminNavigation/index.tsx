import * as React from 'react'
import styles from './styles.module.scss'
const AdminNavigation = () => {
    return (
        <div className={styles.mtn__navigation}>
            <div className={styles.mtn__logo}>
                <img src={require('../../assets/logo.png')} alt="MTN Logo" />
            </div>
        </div>
    )
}

export default AdminNavigation