// import * as React from "react";
// import { Header, Modal, NomineeCard } from "../../../containers";
// import { sp } from "@pnp/sp";
// import styles from "./voting.module.scss";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import Carousel from "react-elastic-carousel";
// import swal from "sweetalert";
// import { useHistory } from "react-router-dom";

// const VotingScreen = () => {
//   const [nominees, setNominees] = React.useState([]);
//   const [checked, setChecked] = React.useState(false);
//   const [indexFrom, setIndexFrom] = React.useState(0);
//   const [indexTo, setIndexTo] = React.useState(4);
//   // const { spHttpClient } = React.useContext(Context);
//   const [open, setOpen] = React.useState(false);
//   const [id, setId] = React.useState();
//   const [userEmail, setUserEmail] = React.useState();
//   const [userID, setUserID] = React.useState();

//   const history = useHistory();

//   //Get all Nominees
//   React.useEffect(() => {
//     sp.web.lists
//       .getByTitle(`Nominees`)
//       .items.filter(`Status eq 'Approved'`)
//       .get()
//       .then((res) => {
//         console.log(res);
//         setNominees(res);
//       });
//   }, []);

//   //find the logged in user and check if the user already voted
//   React.useEffect(() => {
//     sp.profiles.myProperties.get().then((res) => {
//       setUserEmail(res.Email);
//       sp.web.lists
//         .getByTitle("Registration")
//         .items.filter(`EmployeeEmail eq '${res.Email}'`)
//         .get()
//         .then((items) => {
//           setUserID(items[0].ID);
//           if (items[0].Voted) {
//             swal({
//               closeOnClickOutside: false,
//               closeOnEsc: false,
//               text: "You have voted already!",
//             }).then(() => {
//               history.push("/");
//             });
//           }
//         });
//     });
//   }, []);

//   const votedNominee = (id) => {
//     setId(id);
//     setOpen(true);
//   };

//   //Find a nominee with their id
//   const addNomineeVotes = (id) => {
//     return nominees.filter((nominee) => nominee.ID === id);
//   };

//   const yesHandler = () => {
//     sp.web.lists
//       .getByTitle(`Votes`)
//       .items.add({
//         EmployeeID: userID,
//         Nominee: id,
//       })
//       .then(() => {
//         sp.web.lists
//           .getByTitle(`Nominees`)
//           .items.get()
//           .then((res) => {
//             setNominees(res);
//           });

//         sp.web.lists
//           .getByTitle(`Registration`)
//           .items.getById(userID)
//           .update({
//             Voted: true,
//           })
//           .then(() => {
//             setTimeout(() => {
//               setOpen(false);
//             }, 1000);
//           });
//       });
//   };

//   const noHandler = () => {
//     setOpen(false);
//   };

//   const votePermissions = () => {
//     return (
//       <div className={styles.modalContent}>
//         <span>Are you sure you want to vote for this candidate?</span>
//         <div className={styles.modalContentButton}>
//           <button onClick={noHandler}>No</button>
//           <button onClick={yesHandler}>Yes</button>
//         </div>
//       </div>
//     );
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 550, itemsToShow: 2, itemsToScroll: 2 },
//     { width: 768, itemsToShow: 3 },
//     { width: 1200, itemsToShow: 4 },
//   ];

//   return (
//     <div className={styles.votingPageContainer}>
//       <Header title="Nominees" />

//       <div className={styles.nomineeContainerScreen}>
//         <Carousel
//           breakPoints={breakPoints}
//           isRTL={false}
//           initialActiveIndex={0}
//           pagination={false}
//           className={styles.carousel}
//         >
//           {nominees.map((nominee) => {
//             return (
//               <>
//                 <NomineeCard
//                   checked={checked}
//                   image={nominee.PassportPhotograph}
//                   name={nominee.EmployeeName}
//                   lastName={nominee.lastName}
//                   onClick={() => {
//                     votedNominee(nominee.ID);
//                   }}
//                 />
//               </>
//             );
//           })}
//         </Carousel>
//       </div>

//       <Modal
//         content={votePermissions()}
//         onClose={handleClose}
//         isVisible={open}
//         size="sm"
//         footer=""
//         title=""
//       />
//     </div>
//   );
// };

// export default VotingScreen;
