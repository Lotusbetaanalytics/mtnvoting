import * as React from "react";
import styles from "./HomePage.module.scss";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";

const LandingPage2 = () => {
  return (
    <div className={styles.LandingPageContainer}>
      <div className={styles.bgContainer}>
        <div className={styles.pageContainer}>
          <div className={styles.pageContent1}>
            <img src={require("../../assets/logo.png")} alt="logo" />
            <h1>Welcome to Our </h1>
            <p>Voting</p>
            <span>Portal</span>
          </div>
        </div>
        <div className={styles.pageContainer2}>
          <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <HiUserGroup />
              <p>Employee</p>
            </div>
          </div>

          <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <BsFillPersonFill />
              <p>Candidate</p>
            </div>
          </div>

          <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <RiAdminFill />
              <p>Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage2;
