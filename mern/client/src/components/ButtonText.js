import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/button.module.css";

const ButtonText = ({ children, onClick, isDisabled }) => {
  return (
    <React.Fragment>
      <Button
        variant="link"
        size="sm"
        onClick={onClick}
        className={styles.btn}
        disabled={isDisabled ? "true" : null}
      >
        {children}
      </Button>
    </React.Fragment>
  );
};

export default ButtonText;
