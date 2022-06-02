import * as React from "react";
import styles from "./styles.module.scss";
const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <h1></h1>
        {title}
      </div>
      <div className={styles.headerImage}>
        <img src={require("../../assets/logo.png")} alt="" />
      </div>
    </div>
  );
};

export default Header;
