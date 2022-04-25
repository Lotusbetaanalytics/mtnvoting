import * as React from 'react'
import {  Card, Card2, Header } from '../../../containers'
import CandidateNavigation from '../../../containers/candidateNavigation'
import styles from './styles.module.scss'
import { sp } from "@pnp/sp";
const CandidateDashboard = () => {

    // const [voteNumber,setVoteNumber] = React.useState("");
    // const [voteDate,setVoteDate] =React.useState("");

    // React.useEffect(() => {
    //     sp.web.lists.getByTitle(`ClaimEntry`).items.get().then
    //         ((response) => {
    //             setVoteNumber(response.length)
    //         })
    //     sp.web.lists.getByTitle(`Policy Entry`).items.get().then
    //         ((response) => {
    //             setVoteDate(response)
    //         })
    // }, [])
    
    return (
        <div className='appContainer'>
            <CandidateNavigation dashboard={`active`} />
            <div className='contentsRight'>
                <Header title='Dashboard' />
                <div className={styles.cardContainer}>
                    <Card title="Total number of accumulated vote" count={10} color="mtn__white" />
                    <Card2 title="Date of voting exercise" info={"22,December 2023"} color="mtn__white" />
                   
                </div>
            </div>
        </div>
    )
}

export default CandidateDashboard