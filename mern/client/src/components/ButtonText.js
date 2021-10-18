import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/button.module.css";

<<<<<<< HEAD
const ButtonText = ({ children, onClick, isDisabled }) => {
=======
const ButtonText = ({ children, onClick, isDisabled, type }) => {
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
        variant="link"
        size="sm"
        onClick={onClick}
        className={styles.btn}
        disabled={isDisabled ? "true" : null}
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

export default ButtonText;
