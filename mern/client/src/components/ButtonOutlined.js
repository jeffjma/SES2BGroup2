import React from "react";
import Button from "react-bootstrap/Button";
import styles from "../styles/button.module.css";

const ButtonOutlined = ({ children, onClick, isDisabled }) => {
  return (
    <React.Fragment>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={onClick}
        disabled={isDisabled ? "true" : null}
        className={styles.btn}
      >
        {children}
      </Button>
    </React.Fragment>
  );
};

export default ButtonOutlined;
