import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/button.module.css";

<<<<<<< HEAD
const ButtonContained = ({ children, onClick, isDisabled }) => {
=======
const ButtonContained = ({ children, onClick, isDisabled, type }) => {
>>>>>>> frontend-develop
  /**
   * @param {String} children The button label
   * @param {Function void} onClick Method that gets called when the user clicks on the button
   * @param {bool} isDisabled Whether the button is disabled or not
<<<<<<< HEAD
=======
   * @param {String} type Button's type. Can be either "button" or submit
>>>>>>> frontend-develop
   */
  return (
    <React.Fragment>
      {/* 
      If {isDisabled} is true, the button is showed as disabled
      */}
      <Button
        variant="primary"
        size="sm"
        onClick={onClick}
        disabled={isDisabled ? "true" : null}
        className={styles.btn}
        style={{ color: "white" }}
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

<<<<<<< HEAD
export default ButtonContained;
=======
export default ButtonContained;
>>>>>>> frontend-develop
