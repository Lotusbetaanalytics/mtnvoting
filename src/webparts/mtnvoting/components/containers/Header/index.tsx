import * as React from "react";
import styles from "./styles.module.scss";
const Header = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>{title}</div>
      <div className={styles.headerImg}>
        {/* <img src={require("../../assets/logo.png")} alt="" /> */}
      </div>
    </div>
  );
};

export default Header;
