import * as React from "react";
import styles from "./styles.module.scss";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LandingPage = () => {
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
              <Link to="/employeeregistration">
                <HiUserGroup />
                <p>Employee</p>
              </Link>
            </div>
          </div>

          <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <Link to="/">
                <BsFillPersonFill />
                <p>Candidate</p>
              </Link>
            </div>
          </div>

          <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <Link to="/">
                <RiAdminFill />
                <p>Admin</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
