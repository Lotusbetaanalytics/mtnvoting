import * as React from 'react'
import { Card, Card2, Header, CandidateNavigation } from '../../../containers'
import styles from './styles.module.scss'
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
// import moment from 'moment';
const CandidateDashboard = () => {

    //   const moment = require('moment');

    const [voteNumber, setVoteNumber] = React.useState(0);
    const [voteDate, setVoteDate] = React.useState("");
    const [location, setLocation] = React.useState("");

    React.useEffect(() => {
        sp.profiles.myProperties
            .get()
            .then((response) => {
                sp.web.lists.getByTitle(`Nominees`).items.filter(`EmployeeEmail eq '${response.Email}' and Status eq 'Approved'`).get()
                    .then((res) => {
<<<<<<< HEAD
                        if (res.length >= 0 ) {
                            setLocation((prev)=>{
                                prev = res[0].Constituency
                                return prev
                            })
                            
                        } else {
                            return "no data"
                        }
                       
                        console.log(location)
                        sp.web.lists
                        .getByTitle(`Votes`)
                        .items.filter(`EmployeeID eq '${response.ID}'`)
                        .get()
                        .then((res) => {
                            setVoteNumber(res.length)
                        })
                    });
                 
=======
                        if (res.length > 0) {
                            sp.web.lists.getByTitle(`Votes`).items.filter(`Nominee eq '${res[0].ID}'`).get().then
                                ((resp) => {
                                    setVoteNumber(resp.length)
                                })
                            sp.web.lists.getByTitle(`Constituency`).items.filter(`Title eq '${res[0].Constituency}'`).get().then
                                ((resp) => {
                                    setVoteDate(resp[0].Date)
                                })
                        }

                    })


>>>>>>> 7d56b80bdc1298112ef51e7119eb5e1119c1f4a3
            })
    }, [])

    // React.useEffect(()=>{
    //     sp.web.lists.getByTitle(`Constituency`).items.filter(`Title eq '${location}'`).get().then
    //     ((res) => {
    //         setVoteDate(res.length>0&&res[0].Date)
           
    //     })
   
    // },[location])





    return (
        <div className='appContainer'>
            <CandidateNavigation dashboard={`active`} />
            <div className='contentsRight'>
                <Header title='Dashboard' />
                <div className={styles.cardContainer}>
<<<<<<< HEAD
                    <Card title="Total number of accumulated vote" count={"40"} color="mtn__white" url={""} />
                    <Card2 title="Date of voting exercise" info={"22,december,1840"} color="mtn__white" />
=======
                    <Card title="Total number of accumulated vote" count={voteNumber} color="mtn__white" url={""} />
                    <Card2 title="Date of voting exercise" info={voteDate} color="mtn__white" />
>>>>>>> 7d56b80bdc1298112ef51e7119eb5e1119c1f4a3

                </div>
            </div>
        </div>
    )
}

export default CandidateDashboard