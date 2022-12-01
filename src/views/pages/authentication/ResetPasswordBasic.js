// ** React Imports
import { Link, useLocation, useHistory } from "react-router-dom";

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Custom Components
import InputPassword from '@components/input-password-toggle'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Button, Toast } from 'reactstrap'
import logo from "@src/assets/images/logo/logo.png";

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { useState } from 'react';
import { ToastError } from '../reuseable';
import CoreHttpHandler from '../../../http/services/CoreHttpHandler';
import Swal from "sweetalert2";

const ResetPasswordBasic = () => {
  const location = useLocation()
  const [password,setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("");

  const {state} = location 
  let history = useHistory();


  const resetPassword = () =>{
    if (password != newPassword) {
      return ToastError(
        "Error",
        "Confirm password and new password does not match. Please try again!"
      );
    }
      CoreHttpHandler.request(
        "sellers",
        "reset_password",
        {
          token: state,
          password: password
        },
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Password has been reset Successfully`,
            showCancelButton: false,
            customClass: {
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-outline-danger ms-1",
            },
            background: "#020202",
          });
          history.push("/login");

        },
        (err) => {}
      );
  }

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <Link
              className="brand-logo"
              to="/"
              onClick={(e) => e.preventDefault()}
            >
              <Link
                className="brand-logo"
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  className="img-fluid"
                  width={45}
                  src={logo}
                  alt="Login"
                  style={{ display: "flex", alignItem: "center" }}
                />
                <h2
                  style={{ marginTop: "10px" }}
                  className="brand-text text-primary ms-1"
                >
                  Pegasus
                </h2>
              </Link>
            </Link>
            <CardTitle tag="h4" className="mb-1">
              Reset Password 🔒
            </CardTitle>
            <CardText className="mb-2">
              Your new password must be different from previously used passwords
            </CardText>
            <Form
              className="auth-reset-password-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mb-1">
                <Label className="form-label" for="new-password">
                  New Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  id="new-password"
                  autoFocus
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="confirm-password">
                  Confirm Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  id="confirm-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button color="primary" block onClick={resetPassword}>
                Set New Password
              </Button>
            </Form>
            <p className="text-center mt-2">
              <Link to="/login">
                <ChevronLeft className="rotate-rtl me-25" size={14} />
                <span className="align-middle">Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ResetPasswordBasic
