import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/button.module.css";

const ButtonContained = ({ children, onClick, isDisabled }) => {
  return (
    <React.Fragment>
      <Button
        variant="primary"
        size="sm"
        onClick={onClick}
        disabled={isDisabled ? "true" : null}
        className={styles.btn}
        style={{ color: "white" }}
      >
        {children}
      </Button>
    </React.Fragment>
  );
};

export default ButtonContained;
