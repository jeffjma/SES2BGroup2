import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/button.module.css";

<<<<<<< HEAD
const ButtonOutlined = ({ children, onClick, isDisabled }) => {
=======
const ButtonOutlined = ({ children, onClick, isDisabled, type }) => {
>>>>>>> frontend-develop
  /**
   * @param {String} children The button label
   * @param {Function void} onClick Method that gets called when the user clicks on the button
   * @param {bool} isDisabled Whether the button is disabled or not
<<<<<<< HEAD
=======
   * @param {String} type Button's type. Can be either "button" or "submit"
>>>>>>> frontend-develop
   */
  return (
    <React.Fragment>
      {/* 
      If {isDisabled} is true, the button is showed as disabled
      */}
<<<<<<< HEAD
=======
      {/* 
      If nothing is given, {type} will be "button" by default. 
      For button in forms, use "submit" as {type}
      */}
>>>>>>> frontend-develop
      <Button
        variant="outline-primary"
        size="sm"
        onClick={onClick}
        disabled={isDisabled ? "true" : null}
        className={styles.btn}
<<<<<<< HEAD
=======
        type={type != null ? type : "button"}
>>>>>>> frontend-develop
      >
        {children}
      </Button>
    </React.Fragment>
  );
};

export default ButtonOutlined;
