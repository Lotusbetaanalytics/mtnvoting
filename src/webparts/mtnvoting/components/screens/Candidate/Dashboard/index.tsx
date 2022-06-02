import * as React from 'react'
import { Card, Card2, Header, CandidateNavigation } from '../../../containers'
import styles from './styles.module.scss'
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
const CandidateDashboard = () => {

    const [voteNumber, setVoteNumber] = React.useState("");
    const [voteDate, setVoteDate] = React.useState("");
    const [location, setLocation] = React.useState("");
    React.useEffect(() => {
        sp.profiles.myProperties
            .get()
            .then((response) => {
                sp.web.lists
                    .getByTitle(`Nominees`)
                    .items.filter(`EmployeeEmail eq '${response.Email}'`)
                    .get()
                    .then((res) => {
                        const location = (res[0].Location)
                        console.log(location)
                    });
                sp.web.lists
                    .getByTitle(`Constituency`)
                    .items.filter(`Region eq '${response.region}' and Location eq '${location}'`)
                    .get()
                    .then((res) => {
                        console.log(res)
                    })
            })
    }, [])



    return (
        <div className='appContainer'>
            <CandidateNavigation dashboard={`active`} />
            <div className='contentsRight'>
                <Header title='Dashboard' />
                <div className={styles.cardContainer}>
                    <Card title="Total number of accumulated vote" count={10} color="mtn__white" url={""} />
                    <Card2 title="Date of voting exercise" info={"22,December 2023"} color="mtn__white" />

                </div>
            </div>
        </div>
    )
}

export default CandidateDashboard