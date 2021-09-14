import {
  Card,
  ButtonGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ButtonContained from "../../components/ButtonContained";
import ButtonOutlined from "../../components/ButtonOutlined";
import { Link } from "react-router-dom";
import "./Modal.css";

// Pop up that appears when user selects "I have an account".
// Pop is used to redirect to either student or examiner login.
const Modal = ({ show, close }) => {

  // React portal to ad
  return (
    <>
      {show ? (
        <div className="modal-container">
          <div
            onClick={close}
            className="overlay"></div>
              <Card>
                <Card.Body>
                  <h4> Select user to login </h4>
                  <button
                  className="close-modal"
                  onClick={close}
                  ><FontAwesomeIcon
                  className="fas fa-camera fa-lg"
                  icon={faTimes} />
                  </button>

                  <div className="student-login-route">
                  <ButtonGroup className="student-login-btn">
                    {/*links to Student Login Page*/}
                    <Link to='/login'>
                      <ButtonOutlined
                        variant="contained"
                        color="primary"
                        >Student
                      </ButtonOutlined>
                    </Link>
                  </ButtonGroup>
                  </div>

                  <div className="examiner-login-route">
                  <ButtonGroup className="examiner-login-btn">
                    {/*links to Examiner Login Page*/}
                    <ButtonContained
                      variant="contained"
                      color="primary"
                      href="registration">
                      Examiner
                    </ButtonContained>
                  </ButtonGroup>
                  </div>
                </Card.Body>
              </Card>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
