import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/button.module.css";

const ButtonOutlined = ({ children, onClick, isDisabled, type }) => {
  /**
   * @param {String} children The button label
   * @param {Function void} onClick Method that gets called when the user clicks on the button
   * @param {bool} isDisabled Whether the button is disabled or not
   * @param {String} type Button's type. Can be either "button" or "submit"
   */
  return (
    <React.Fragment>
      {/* 
      If {isDisabled} is true, the button is showed as disabled
      */}
      {/* 
      If nothing is given, {type} will be "button" by default. 
      For button in forms, use "submit" as {type}
      */}
      <Button
        variant="outline-primary"
        size="sm"
        onClick={onClick}
        disabled={isDisabled ? "true" : null}
        className={styles.btn}
        type={type != null ? type : "button"}
      >
        {children}
      </Button>
    </React.Fragment>
  );
};

export default ButtonOutlined;
