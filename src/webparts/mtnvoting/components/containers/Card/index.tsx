import * as React from 'react'
import styles from './styles.module.scss'
const Card = ({ title, count, color }) => {
    return (
        <div className={`${styles.card} ${color}`}>
            <h5>{title}</h5>
            <h1>{count}</h1>
        </div>
    )
}

export default Card